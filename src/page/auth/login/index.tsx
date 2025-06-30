import { Background } from "../../../components/layout/Background";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../styles/toast.css";
import { useAuthStore } from "@/lib/zustand/authStore";
import { IMAGE_URLS } from "@/lib/constants/constants";
import { loginUser } from "@/lib/api/auth/login";
import type { LoginRequest } from "@/lib/api/auth/login";
import { useQueryClient } from "@tanstack/react-query";
import { subscribe } from "@/lib/utils/pushNotification";
import { tutorialComplete } from "@/lib/api/auth/tutorialComplete";

export default function LoginPage() {
  const [form, setForm] = useState<LoginRequest>({ email: "", password: "" });
  const navigate = useNavigate();
  const { login: setLoginState, setAccessToken, accessToken, isAuthenticated } = useAuthStore();
  const queryClient = useQueryClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };


  useEffect(() => {
    // 1. 브라우저에 알림 권한 요청
      const handlePermission = async () => {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        console.log("알림 권한이 거부되었습니다.");
        return;
      } 
    };
    handlePermission();
  }, []);

  useEffect(() => {
    const handleSubscribeAndTutorialCheck= async () => {
      if (accessToken) {
        try{
          await tutorialComplete();
          await subscribe();
          if (isAuthenticated) {
            navigate("/");
          }
        } catch (error) {
          console.error("푸시 알림 구독 실패:", error);
        }
      }
    };
    handleSubscribeAndTutorialCheck();
  }, [accessToken, isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    const result = await loginUser(form);
    if (result.success && result.data && result.accessToken) {
      // 액세스 토큰 저장
      setAccessToken(result.accessToken);
      // 사용자 정보 저장
      setLoginState(result.data.name, result.data.point, form.email, result.data.tutorialCompleted);
      // 쿼리 캐시 초기화
      queryClient.clear();
      // 메인 페이지로 이동
      navigate("/");
    } else {
      toast.error(result.error || "로그인에 실패했습니다.");
    }
  };

  return (
    <Background backgroundImage={IMAGE_URLS.login.bg}>
      <form onSubmit={handleSubmit} className="flex flex-col items-center" autoComplete="off">
        <h1
          className="text-[4rem] font-extrabold text-[#BBEB4B] text-center mt-6"
          style={{ WebkitTextStroke: "3px #457E9E" }}
        >
          로그인
        </h1>
        <input
          type="email"
          name="email"
          autoComplete="off"
          value={form.email}
          onChange={handleChange}
          placeholder="이메일"
          className="mt-3 rounded-full bg-white px-4 py-3 placeholder-[#48BBD3] font-bold w-80 text-[1.2rem] focus:outline-none focus:ring-0"
        />
        <input
          type="password"
          name="password"
          autoComplete="off"
          value={form.password}
          onChange={handleChange}
          placeholder="비밀번호"
          className="mt-3 rounded-full bg-white px-4 py-3 placeholder-[#48BBD3] font-bold w-80 text-[1.2rem] focus:outline-none focus:ring-0"
        />

        <button
          type="submit"
          className="mt-3 rounded-full bg-[#EB864B] px-4 py-3 text-white font-bold w-80 text-[1.2rem] cursor-pointer"
        >
          로그인
        </button>
        <Link to="/auth/register" className="mt-2 text-white text-center text-[0.8rem] ">
          회원가입
        </Link>
        <div className="w-13 h-[1px] bg-white rounded-full" />
      </form>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        style={{ position: "absolute", top: "1rem", right: "1rem" }}
        className="w-60"
      />
    </Background>
  );
}
