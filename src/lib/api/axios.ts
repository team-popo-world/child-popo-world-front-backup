import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useAuthStore } from "@/lib/zustand/authStore";

/**
 * API 에러를 처리하기 위한 커스텀 에러 클래스
 */
export class ApiError extends Error {
  constructor(public status: number, public message: string, public data?: any) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Axios 인스턴스 생성
 * 기본 설정:
 * - baseURL: API 서버 URL
 * - timeout: 5초
 * - withCredentials: true (CORS 요청에서 쿠키 전송 허용)
 * - 기본 헤더: Content-Type: application/json
 */

const API_URL = "https://www.toslte.store";

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 재시도 횟수를 추적하는 Map
const retryCountMap = new Map<string, number>();
const MAX_RETRY_COUNT = 3;

/**
 * 요청 인터셉터
 * 모든 요청이 서버로 전송되기 전에 실행됨
 * 주요 기능:
 * 1. 인증 토큰 처리
 * 2. Content-Type 헤더 동적 설정
 */

apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    console.log("token", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    // 요청 헤더 로깅

    return config;
  },
  ( ) => {
    // 요청 설정 중 에러 발생 시 처리
    return Promise.reject(new ApiError(0, "요청 설정 중 오류가 발생했습니다."));
  }
);

/**
 * 응답 인터셉터
 * 서버로부터 응답을 받은 후 실행됨
 * 주요 기능:
 * 1. 네트워크 에러 처리
 * 2. HTTP 상태 코드별 에러 처리
 * 3. 인증 에러 시 토큰 갱신 (최대 3번)
 */
apiClient.interceptors.response.use(
  (response) => {
    // 응답 성공 시 재시도 카운터 초기화
    const requestKey = `${response.config.method}-${response.config.url}`;
    retryCountMap.delete(requestKey);
    return response;
  },
  async (error: AxiosError) => {
    // 1. 네트워크 에러 처리
    if (!error.response) {
      return Promise.reject(new ApiError(0, "네트워크 연결을 확인해주세요."));
    }
    
    // 토큰 갱신 요청 자체가 실패한 경우 무한 반복 방지
    if (error.config?.url?.includes('/auth/token/refresh')) {
      Cookies.remove("refreshToken");
      useAuthStore.getState().logout();
      return Promise.reject(new ApiError(401, "세션이 만료되었습니다. 다시 로그인해주세요."));
    }

    const { status } = error.response;

    if (status === 401) {
      // 재시도 횟수 확인
      const requestKey = `${error.config?.method}-${error.config?.url}`;
      const currentRetryCount = retryCountMap.get(requestKey) || 0;
      
      if (currentRetryCount >= MAX_RETRY_COUNT) {
        // 최대 재시도 횟수 초과 시 로그아웃
        retryCountMap.delete(requestKey);
        Cookies.remove("refreshToken");
        useAuthStore.getState().logout();
        return Promise.reject(new ApiError(401, "인증에 실패했습니다. 다시 로그인해주세요."));
      }

      try {
        // 재시도 횟수 증가
        retryCountMap.set(requestKey, currentRetryCount + 1);

        // refresh 토큰으로 새로운 access 토큰 발급 요청
        const refreshToken = Cookies.get("refreshToken");
        if (!refreshToken) {
          throw new Error("Refresh token not found");
        }

        const response = await apiClient.post(
          `/auth/token/refresh`,
          {}, // 빈 body
          {
            withCredentials: true,
            headers: {
              "Refresh-Token": refreshToken,
              "Content-Type": "application/json",
            },
          }
        );

        // 204 응답의 경우 헤더에서 토큰을 가져오거나 다른 방식으로 처리
        const accessToken = response.headers["authorization"]?.replace("Bearer ", "");
        const newRefreshToken = response.headers["refresh-token"];

        // accessToken이 여전히 없으면 에러 처리
        if (!accessToken) {
          throw new Error("Access token not received from refresh");
        }

        if (accessToken) {
          useAuthStore.getState().setAccessToken(accessToken);
        }
        if (newRefreshToken) {
          Cookies.set("refreshToken", newRefreshToken, {
            expires: 14, // 14일 후 만료
            secure: true,
            sameSite: "strict", // CSRF 공격 방지
          });
        }

        // 새로운 access 토큰으로 원래 요청 재시도
        if (error.config) { 
          error.config.headers.Authorization = `Bearer ${accessToken}`;
          return apiClient(error.config);
        }
      } catch (error: unknown) {
        // refresh 토큰도 만료된 경우
        retryCountMap.delete(requestKey);
        Cookies.remove("refreshToken");
        useAuthStore.getState().logout();

        return Promise.reject(new ApiError(401, "세션이 만료되었습니다. 다시 로그인해주세요."));
      }
    }

    // 2. HTTP 상태 코드별 에러 처리
    switch (status) {
      case 400:
        // 잘못된 요청
        return Promise.reject(new ApiError(status, "잘못된 요청입니다."));
      case 403:
        // 권한 에러
        return Promise.reject(new ApiError(status, "접근 권한이 없습니다."));
      case 404:
        // 리소스를 찾을 수 없음
        return Promise.reject(new ApiError(status, "요청한 리소스를 찾을 수 없습니다."));
      case 500:
        // 서버 에러
        return Promise.reject(new ApiError(status, "서버 에러가 발생했습니다."));
      default:
        // 기타 에러
        return Promise.reject(new ApiError(status, "알 수 없는 에러가 발생했습니다."));
    }
  }
);

export default apiClient;
