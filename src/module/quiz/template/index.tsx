import { Background } from "@/components/layout/Background";
import { IMAGE_URLS } from "@/lib/constants/constants";
import { BackArrow } from "@/components/button/BackArrow";

import clsx from "clsx";
import { SpeechBubble2 } from "@/components/text/SpeechBubble";
import { BottomArrow } from "@/components/icon/BottomArrow";
import { tutorialQuiz } from "@/lib/constants/tutorial";

import SoundButton from "@/components/button/SoundButton";
import NameAndPoint from "@/components/user/NameAndPoint";
import { PlayLimitModal } from "./PlayLimitModal";


interface QuizTemplateProps {
  onBack: () => void;
  onClickQuiz: () => void;
  isTutorialCompleted: boolean;
  isModalOpen: boolean;
  onCloseModal: () => void; 
}


export const QuizTemplate = ({ onBack,onClickQuiz,isModalOpen,onCloseModal,isTutorialCompleted }:QuizTemplateProps) => {
  return (
    <>
    {/* 튜토리얼 중 퀴즈 클릭 시 배경 어둡게 */}
    {!isTutorialCompleted && (
      <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 font-TJ">
      </div>
    )}

    <Background backgroundImage={IMAGE_URLS.quiz.bg}>
      {/* 뒤로가기 */}
      <BackArrow onClick={onBack} />
      {/* 사운드 */}
      <SoundButton />
      {/* 이름 포인트 */}
      <NameAndPoint/>
      {/* 제목 - 퀴즈 */}
      <div className=" items-center justify-center mt-[3.7rem] flex flex-col">
        <span className="text-[3.5rem] font-bold text-[#F98224] ">매일매일 새로워지는</span>
        <div className="flex justify-center items-center gap-[1rem]">
          <span className="text-[5rem] font-extrabold text-[#7F8EC2]">경제</span>
          <span className="text-[5rem] font-extrabold text-[#F77B6E]">퀴즈</span>
        </div>
      </div> 
  

      {/* 포포 이미지 */}
      <img
        src={IMAGE_URLS.quiz.popo}
        alt="퀴즈 포포 이미지"
        className={clsx("absolute h-[12.5rem] right-[0.2rem] bottom-[0.3rem] ", !isTutorialCompleted && "z-100")}
      />
      {/* 말풍선 */}
      {!isTutorialCompleted && (
        <SpeechBubble2
          children={tutorialQuiz["quiz2"].text}
          className="absolute bottom-[10rem] right-[5rem] z-100"
          flip={true}
        />
      )}
      {/* 시작하기 버튼 */}
      <div className="flex items-center justify-center mt-[2rem]">
        <button
          className={clsx("bg-[#FD7152] border-[0.25rem] border-[#F65636] text-[#FFF4D2] px-[1.2rem] py-[0.4rem] rounded-3xl text-[2rem] font-bold", 
            !isTutorialCompleted && "z-100 shadow-[0_0_20px_rgba(255,255,255,0.5)]")}
          onClick={onClickQuiz}
        >
        퀴즈 풀기
        </button>
      </div>
      
      {/* 튜토리얼 버튼 */}
      {(!isTutorialCompleted) && (
        <BottomArrow size={"3rem"} color="#F65636" className="absolute right-1/2 translate-x-1/2 bottom-[8.2rem] z-190 animate-bounce " />
      )}

      {/* 작성제한모달 */}
      {isModalOpen && (
        <PlayLimitModal isOpen={isModalOpen} onClose={onCloseModal} />)}

      </Background>
    </>
  );
};
