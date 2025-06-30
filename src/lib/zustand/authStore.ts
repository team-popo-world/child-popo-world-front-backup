/**
 * 인증 관련 상태 관리를 위한 Zustand 스토어
 *
 * 이 스토어는 사용자의 인증 상태와 사용자 정보를 관리합니다.
 * 페이지 새로고침 시 토큰을 기반으로 사용자 정보를 다시 불러옵니다.
 */
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Cookies from "js-cookie";
import { useTutorialStore } from "./tutorialStore";
import { logoutUser } from "@/lib/api/user/logoutUser";
/**
 * 인증 상태의 타입 정의
 * @property {boolean} isAuthenticated - 사용자의 인증 여부
 * @property {Object|null} user - 사용자 정보 (인증되지 않은 경우 null)
 * @property {string} user.name - 사용자 이름
 */
interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean; // 인증 여부
  name: string | null; // 이름
  email: string | null;
  point: number | null; // 포인트
}

/**
 * 인증 스토어의 전체 타입 정의
 * AuthState를 확장하여 액션 메서드들을 포함
 * @property {Function} setUser - 사용자 정보를 설정하는 함수
 * @property {Function} logout - 로그아웃 처리를 하는 함수
 * @property {Function} checkAuth - 페이지 로드 시 인증 상태 확인을 하는 함수
 */
interface AuthStore extends AuthState {
  setAccessToken: (accessToken: string | null) => void;
  setUserName: (name: string | null) => void; // 유저 정보 설정
  setPoint: (point: number | null) => void; // 포인트 설정
  login: (name: string, point: number, email: string) => void; // 로그인
  logout: () => void; // 로그아웃
}

/**
 * 초기 인증 상태
 * 앱 시작 시 또는 로그아웃 시 사용되는 기본값
 */
const INITIAL_AUTH_STATE: AuthState = {
  accessToken: null,
  isAuthenticated: false,
  name: null,
  email: null,
  point: null,
};

/**
 * 인증 스토어 생성
 *
 * @returns {AuthStore} 인증 상태와 관련 액션들을 포함한 스토어
 */
export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      ...INITIAL_AUTH_STATE,
      // 사용자 정보 설정 액션
      setUserName: (name) =>
        set({
          name,
        }),

      setPoint: (point) =>
        set({
          point,
        }),

      login: (name: string, point: number, email: string) => {
        set({ isAuthenticated: true, name, point, email });
        useTutorialStore.getState().setCurrentStep(1);
        useTutorialStore.getState().setTutorialCompleted(false);
      },

      // 로그아웃 액션
      logout: async () => {
        const { email } = get();
        console.log("email", email);
        if (email) await logoutUser(email);
        console.log("logoutUser");
        Cookies.remove("refreshToken");
        set(INITIAL_AUTH_STATE);
        console.log(email);
        // 튜토리얼 스토어 초기화
        localStorage.removeItem('tutorial-storage');
      },
      // 액세스 토큰 설정
      setAccessToken: (accessToken) => set({ accessToken }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
        name: state.name,
        email: state.email,
        point: state.point,
      }),
    }
  )
);
