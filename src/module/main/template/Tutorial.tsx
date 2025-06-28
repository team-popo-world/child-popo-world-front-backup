// src/page/main/index.tsx
import { IMAGE_URLS } from "@/lib/constants/constants";
import { TextWithStroke } from "../../../components/text/TextWithStroke";
import { Background } from "../../../components/layout/Background";
import NameAndPoint from "@/components/user/NameAndPoint";
import { SpeechBubble2 } from "../../../components/text/SpeechBubble";
import { Indicator } from "../components/Indicator";
import { useEffect } from "react";
import clsx from "clsx";
import SoundButton from "@/components/button/SoundButton";
import { playButtonSound, playSound } from "@/lib/utils/sound";
import { Link } from "react-router-dom";
import { useTutorialStore } from "@/lib/zustand/tutorialStore";
import { TopArrow } from "@/components/icon/TopArrow";
import { tutorialOrder } from "@/lib/constants/tutorial";


export default function Tutorial() {
  const { currentStep, nextStep, setTutorialCompleted } = useTutorialStore();
  
  const totalSteps = Object.keys(tutorialOrder).length;

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      nextStep();
    } else {
      setTutorialCompleted(true);
    }
  };

  useEffect(() => {
    if (tutorialOrder[Object.keys(tutorialOrder)[currentStep - 1]].sound) {
      playSound(tutorialOrder[Object.keys(tutorialOrder)[currentStep - 1]].sound, 1, true);
    } 
  }, [currentStep]);

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/25" onClick={handleNextStep}></div>
      <Background backgroundImage={IMAGE_URLS.main.bg}>
        {/* 여백 */}
        <div className="h-[1.9rem]"></div>
        {/* 제목 */}
        <div className="flex justify-center">
          <TextWithStroke
            text="포포월드"
            textClassName="text-main-yellow-800 text-[3.5rem]"
            strokeClassName="text-main-brown-800 text-[3.5rem] text-stroke-width-[0.4rem] text-stroke-color-main-brown-800"
          />
        </div>

        {/* 로그아웃 */}
        <div className="absolute left-[1rem] top-[0.5rem] flex items-center cursor-pointer">
          <img src={IMAGE_URLS.common.logout} alt="로그아웃" className="w-[1.6rem]" />
          <TextWithStroke
            text="로그아웃"
            className="mt-[0.1rem]"
            textClassName="text-main-pink-400 text-[0.9rem]"
            strokeClassName="text-main-brown-800 text-[0.9rem] text-stroke-width-[0.15rem] text-stroke-color-main-brown-800"
          />
        </div>
        {/* 소리버튼 */}
        <SoundButton className={clsx("absolute  left-[6.5rem] top-[0.7rem] flex flex-col items-center cursor-pointer active:scale-95 transition-all duration-300",
        currentStep === 2 && "z-100"
        )} />
        {currentStep === 2 && (
          <>
            <div className="w-[2.2rem] h-[2.2rem] rounded-full bg-white/50 absolute  left-[6.25rem] top-[0.4rem] z-90 shadow-[0_0_20px_rgba(255,255,255,0.5)]"></div>
            <TopArrow
              className="absolute left-[6.45rem] top-[2.9rem] z-90 animate-bounce"
              color="#F7F7F7"
              size={52}
            />
          </>
        )}
        {/* 퀴즈 */}
        <Link to="/quiz" onClick={() => {playButtonSound(); handleNextStep()}}>
        <div className="absolute top-[0.5rem] right-[9.8rem]  flex flex-col justify-center items-center ">
            <img src={IMAGE_URLS.main.quiz} alt="quiz" className={clsx("w-[1.8rem]", currentStep === 4 && "z-100")} />
            <TextWithStroke
              text="퀴즈"
              textClassName="text-main-yellow-800 text-[0.9rem]"
              strokeClassName="text-main-brown-800 text-[0.9rem] text-stroke-width-[0.15rem] text-stroke-color-main-brown-800"
            />
          </div>
        </Link>
        {currentStep === 4 && (
            <div className="w-[2.3rem] h-[2.3rem] rounded-full bg-white/50 absolute  right-[9.55rem] top-[0.29rem] z-90 shadow-[0_0_20px_rgba(255,255,255,0.5)]"></div>
        )}


        {/* 출석 */}
        <Link to="/attandance" onClick={() => {playButtonSound(); handleNextStep()}} className="absolute top-[0.6rem]  right-[7.6rem]  flex flex-col items-center justify-center ">
          <img src={IMAGE_URLS.main.attendance} alt="attandance" className={clsx("w-[1.8rem]", currentStep === 3 && "z-100")} />
          <TextWithStroke
            text="출석"
            textClassName="text-main-blue-700 text-[0.88rem]"
            strokeClassName="text-main-blue-800 text-[0.88rem] text-stroke-width-[0.15rem] text-stroke-color-main-brown-800"
          />
        </Link>
        {currentStep === 3 && (
          <>
            <div className="w-[2.3rem] h-[2.3rem] rounded-full bg-white/50 absolute  right-[7.3rem] top-[0.35rem] z-90 shadow-[0_0_20px_rgba(255,255,255,0.5)]"></div>
            <TopArrow
              className="absolute right-[7.65rem] top-[2.9rem] z-90 animate-bounce"
              color="#F7F7F7"
              size={52}
            />
          </>
        )}

        {/* 이름과 포인트 */}
        <NameAndPoint />

        {/* 섬 */}

        {/* 시장 */}
        <div className="cursor-pointer">
          <img src={IMAGE_URLS.main.market} alt="market" className="absolute top-[3.5rem] left-[2.5rem] w-[8.1rem]" />
          <div className="absolute top-[10.25rem] left-[5.2rem] px-[0.7rem] text-[0.8rem] pt-[0.08rem] font-bold text-main-brown-800 bg-main-yellow-700 border md:border-2 border-main-brown-700 rounded-lg">
            시장
          </div>
        </div>

        {/* 감정일기 */}
        <div className="cursor-pointer">
          <img
            src={IMAGE_URLS.main.diary}
            alt="emotionsDiary"
            className="w-[7.6rem] absolute left-[2rem] bottom-[4.7rem]"
          />
          <div className="absolute  bottom-[4.5rem] left-[3.4rem] pl-[0.7rem] pr-[0.6rem] text-[0.8rem] pt-[0.08rem] font-bold text-main-brown-800 bg-main-yellow-700 border md:border-2 border-main-brown-700 rounded-lg">
            감정일기
          </div>
        </div>

        {/* 포포 키우기 */}
        <div className="cursor-pointer">
          <img
            src={IMAGE_URLS.main.raising}
            alt="raising"
            className="w-[8rem] absolute left-[8.75rem] bottom-[1.64rem]"
          />
          <div className="absolute bottom-[1.5rem] left-[10rem]  px-[0.7rem] text-[0.8rem] pt-[0.08rem] font-bold text-main-brown-800 bg-main-yellow-700 border md:border-2 border-main-brown-700 rounded-lg">
            포포 키우기
          </div>
        </div>

        {/* 적금 */}
        <div className="cursor-pointer">
          <img
            src={IMAGE_URLS.main.saving}
            alt="savings"
            className="w-[8rem] right-[9.75rem] bottom-[0.9rem] absolute"
          />
          <div
            className="absolute bottom-[1rem] right-[12.27rem]  px-[0.85rem] text-[0.8rem] pt-[0.08rem]  font-bold text-main-brown-800 bg-main-yellow-700 border md:border-2 border-main-brown-700 rounded-lg"
          >
            적금
          </div>
        </div>

        {/* 퀘스트 */}
        <div className="cursor-pointer">
          <img
            src={IMAGE_URLS.main.quest}
            alt="quest"
            className={clsx("w-[7.2rem] absolute right-[2.4rem] bottom-[6.25rem]", )}
          />
          <div
            className= "absolute bottom-[6rem] right-[3.8rem]  px-[0.85rem] text-[0.8rem] pt-[0.08rem] font-bold text-main-brown-800 bg-main-yellow-700 border md:border-2 border-main-brown-700 rounded-lg"
          >
            퀘스트
          </div>
        </div>


        {/* 모의투자 */}
        <div className="cursor-pointer">
          <img
            src={IMAGE_URLS.main.investing}
            alt="quiz"
            className="w-[7.5rem] absolute  right-[2.75rem] top-[5.5rem]"
          />
          <div
            className="absolute top-[11.4rem] right-[4rem]  px-[0.85rem] text-[0.8rem] pt-[0.08rem] font-bold text-main-brown-800 bg-main-yellow-700 border md:border-2 border-main-brown-700 rounded-lg"
          >
            모의투자
          </div>
        </div>

        {/* 포니 */}
        <img src={IMAGE_URLS.main.popo} alt="poni" className="absolute w-40 h-40 top-[8rem] left-[14rem] z-100" />
        {/* 말풍선 */}
        <SpeechBubble2
          children={tutorialOrder[Object.keys(tutorialOrder)[currentStep - 1]].text}
          className="absolute bottom-[16.8rem] left-[14rem] z-100"
        />
        {/* 인디케이터 */}
        <Indicator
          currentStep={currentStep}
          totalSteps={totalSteps}
          className="absolute bottom-[1rem] left-1/2 -translate-x-1/2 z-100"
        />
      </Background>
    </>
  );
}
