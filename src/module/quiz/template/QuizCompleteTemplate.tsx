import { Background } from "@/components/layout/Background";
import { IMAGE_URLS } from "@/lib/constants/constants";
import {  useState } from "react";
import Lottie from "react-lottie";
import animationData from '@/components/lottie/Confetti.json';

interface QuizCompleteTemplateProps {
  correctCount: number;
  totalCount: number;
  onBackToHome: () => void;
  reward: number;
}

export const QuizCompleteTemplate = ({
  correctCount,
  totalCount,
  onBackToHome,
  reward
}: QuizCompleteTemplateProps) => {
  const [shouldPlayAnimation, setShouldPlayAnimation] = useState(true);

  const message =
    correctCount === 3
      ? "완벽해요! 최고예요!"
      : correctCount === 2
      ? "아주 잘했어요! "
      : correctCount === 1
      ? "조금만 더 힘내요!"
      : "괜찮아요, 다음엔 더 잘할 수 있어요!";

  return (
    <Background backgroundImage={IMAGE_URLS.quiz.bg}>
      {/* 무조건 축하 애니메이션 */}
      {shouldPlayAnimation && (
        <Lottie
          options={{
            loop: false,
            autoplay: true,
            animationData,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice",
            },
          }}
          height={"30rem"}
          width={"32rem"}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            zIndex: 10,
          }}
          eventListeners={[
            {
              eventName: "complete",
              callback: () => setShouldPlayAnimation(false),
            },
          ]}
        />
      )}

          <div className="flex justify-center items-center">
          <div className="flex flex-col items-center justify-center h-[23rem] mt-[2rem] p-[3rem] z-20 bg-white/60 rounded-3xl shadow-lg w-[90%] max-w-[32rem]">
        <h1 className="text-[3rem] font-extrabold text-[#FF8A00] drop-shadow-md mb-[1.2rem] tracking-wide">
          퀴즈 완료 
        </h1>
        <p className="text-[1.6rem] font-bold text-[#4B3D2A] mb-2 tracking-tight text-center">
          총 {totalCount}문제 중{" "}
          <span className="text-[#FF8A00]">{correctCount}문제</span>를 맞혔어요!
        </p>
        <p className="text-[1.2rem] font-medium text-[#4B3D2A] mb-3 text-center">
          {message}
        </p>
        <p className="text-[1.2rem] text-[#4B3D2A] mb-[2rem] font-semibold">
          획득한 보상: <span className="text-[#FF8A00] font-bold">{reward}냥</span>
        </p>
        <button
          onClick={onBackToHome}
          className="px-[2rem] py-[0.7rem] rounded-full text-[1.1rem] bg-[#FFDD8A] text-[#4B3D2A] font-bold shadow-md hover:brightness-105 active:scale-95 transition"
        >
          확인했어요!
        </button>
      </div>
      </div>
    </Background>
  );
};
