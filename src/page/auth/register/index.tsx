import { Background } from "../../../components/layout/Background";
import {  useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../styles/toast.css";
import { toast } from "react-toastify";
import { BackArrow } from "../../../components/button/BackArrow";
import { IMAGE_URLS } from "@/lib/constants/constants";
import { register, validateAge } from "@/lib/api/auth/register";
import type { RegisterForm } from "@/lib/api/auth/register";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<RegisterForm>({
    email: "",
    password: "",
    passwordCheck: "",
    name: "",
    gender: "",
    age: "",
    parentCode: "",
  });
  const [ isValidAge, setIsValidAge] = useState(true);
  console.log(isValidAge)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "radio" ? value : value,
    }));

    // 나이 입력 시 유효성 상태 초기화
    if (name === "age") {
      setIsValidAge(true);
    }
  };

  const handleAgeBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const validation = validateAge(value);
    if (!validation.isValid) {
      toast.error(validation.message);
      setIsValidAge(false);
    } else {
      setIsValidAge(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await register(form);

    if (result.success) {
      toast.success("회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.");
      navigate("/auth/login");
    } else {
      toast.error(result.error);
    }
  };

  return (
    <Background backgroundImage={IMAGE_URLS.login.bg}>
      <BackArrow />
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <h1
          className="text-[3rem] font-extrabold text-[#BBEB4B] text-center mt-3"
          style={{ WebkitTextStroke: "3px #457E9E" }}
        >
          회원가입
        </h1>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="이메일"
          className="mt-1 rounded-full bg-white px-3 py-1 placeholder-[#48BBD3] font-bold w-70 focus:outline-none focus:ring-0"
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="비밀번호"
          className="mt-1 rounded-full bg-white px-3 py-1 placeholder-[#48BBD3] font-bold w-70 focus:outline-none focus:ring-0"
        />
        <input
          type="password"
          name="passwordCheck"
          value={form.passwordCheck}
          onChange={handleChange}
          placeholder="비밀번호 재입력"
          className="mt-1 rounded-full bg-white px-3 py-1 placeholder-[#48BBD3] font-bold w-70 focus:outline-none focus:ring-0"
        />
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="이름"
          className="mt-1 rounded-full bg-white px-3 py-1 placeholder-[#48BBD3] font-bold w-70 focus:outline-none focus:ring-0"
        />
        <div className="mt-1 rounded-full bg-white px-3 py-1 w-70 flex">
          <span className="text-[#48BBD3] font-bold mr-4">성별</span>
          <label className="flex items-center mr-4 ml-1 font-bold text-[0.8rem]">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={form.gender === "male"}
              onChange={handleChange}
              className="appearance-none w-3 h-3 border-2 border-[#48BBD3] rounded-full checked:bg-[#48BBD3] checked:border-[#48BBD3] mr-2 relative"
            />
            남자
          </label>
          <label className="flex items-center font-bold text-[0.8rem]">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={form.gender === "female"}
              onChange={handleChange}
              className="appearance-none w-3 h-3 border-2 border-[#48BBD3] rounded-full checked:bg-[#48BBD3] checked:border-[#48BBD3] mr-2 relative"
            />
            여자
          </label>
        </div>
        <input
          type="number"
          name="age"
          value={form.age}
          onChange={handleChange}
          onBlur={handleAgeBlur}
          placeholder="나이"
          className="mt-1 rounded-full bg-white px-3 py-1 placeholder-[#48BBD3] font-bold w-70 focus:outline-none focus:ring-0"
        />
        <input
          type="text"
          name="parentCode"
          value={form.parentCode}
          onChange={handleChange}
          placeholder="부모님 코드"
          className="mt-1 rounded-full bg-white px-3 py-1 placeholder-[#48BBD3] font-bold w-70 focus:outline-none focus:ring-0"
        />
        <button
          type="submit"
          className="mt-5 rounded-full bg-[#EB864B] text-white font-bold w-70 py-2 shadow-lg focus:outline-none focus:ring-0 cursor-pointer"
        >
          회원가입 완료
        </button>
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
