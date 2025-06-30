import apiClient from "../axios";
import Cookies from "js-cookie";

// 로그인 요청 타입 
export interface LoginRequest {
  email: string;
  password: string;
}

// 로그인 응답 타입
export interface LoginResponse {
  name: string;
  point: number;
  tutorialCompleted: boolean;
}

// 로그인 결과 타입
export interface LoginResult {
  success: boolean;
  data?: LoginResponse;
  error?: string;
  accessToken?: string;
  refreshToken?: string;
}

export const loginUser = async (loginData: LoginRequest): Promise<LoginResult> => {
  try {
    const response = await apiClient.post("/auth/login", loginData);
    console.log("response login", response.data);
    // 액세스 토큰 추출
    const accessToken = response.headers["authorization"]?.replace("Bearer ", "");
    
    // 리프레시 토큰 추출
    const refreshToken = response.headers["refresh-token"];

    // 리프레시 토큰 저장
    if (refreshToken) {
      Cookies.set("refreshToken", refreshToken, {
        expires: 14, // 14일 후 만료
        secure: true,
        sameSite: "strict", // CSRF 공격 방지
      });
    }

    return {
      success: true,
      data: response.data,
      accessToken,
      refreshToken,
    };
  } catch (error: any) {
    console.error("로그인 에러:", error);
    return {
      success: false,
      error: error.response?.data?.message || "로그인에 실패했습니다."
    };
  }
};
