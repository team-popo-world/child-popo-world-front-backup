// src/page/main/index.tsx
import { IMAGE_URLS } from "@/lib/constants/constants";
import { TextWithStroke } from "../../../components/text/TextWithStroke";
import { Link } from "react-router-dom";
import { Background } from "../../../components/layout/Background";
import { Poni } from "../components/Poni";
import NameAndPoint from "@/components/user/NameAndPoint";
import { playButtonSound } from "@/lib/utils/sound";
import ClickSound from "@/assets/sound/button_click.mp3";
import backSound from "@/assets/sound/back_click.mp3";
import SoundButton from "@/components/button/SoundButton";

const ISLAND_POSITIONS = {
  market: { top: "4.25rem", left: "3.25rem" },
  emotionDiary: { top: "11rem", left: "3rem" },
  raising: { top: "13.75rem", left: "8.75rem" },
  savings: { top: "14.75rem", left: "19rem" },
  quest: { top: "12rem", left: "26rem" },
  investing: { top: "5rem", left: "26rem" },
} as const;
interface MainTemplateProps {
  isAnimating: boolean;
  targetPosition: { top: string; left: string };
  direction: "left" | "right";
  handleIslandClick: (island: keyof typeof ISLAND_POSITIONS, path: string, direction?: "left" | "right") => void;
  handleAnimationComplete: () => void;
  logout: () => void;
}
export default function MainTemplate({
  isAnimating,
  targetPosition,
  direction,
  handleIslandClick,
  handleAnimationComplete,
  logout,
}: MainTemplateProps) {
  return (
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
      <div
        className="absolute left-[1rem] top-[0.5rem] flex items-center cursor-pointer"
        onClick={() => {
          playButtonSound(backSound);
          logout();
        }}
      >
        <img src={IMAGE_URLS.common.logout} alt="로그아웃" className="w-[1.6rem]" />

        <TextWithStroke
          text="로그아웃"
          className="mt-[0.1rem]"
          textClassName="text-main-pink-400 text-[0.9rem]"
          strokeClassName="text-main-brown-800 text-[0.9rem] text-stroke-width-[0.15rem] text-stroke-color-main-brown-800"
        />
      </div>
      {/* 소리버튼 */}
      <SoundButton className="absolute  left-[6.5rem] top-[0.7rem] flex flex-col items-center cursor-pointer active:scale-95 transition-all duration-300" />

      {/* 퀴즈 */}
      <Link to="/quiz" onClick={() => playButtonSound(ClickSound)}>
      <div className="absolute top-[0.5rem] right-[9.8rem]  flex flex-col justify-center items-center ">
          <img src={IMAGE_URLS.main.quiz} alt="quiz" className="w-[1.8rem]" />
          <TextWithStroke
            text="퀴즈"
            textClassName="text-main-yellow-800 text-[0.9rem]"
            strokeClassName="text-main-brown-800 text-[0.9rem] text-stroke-width-[0.15rem] text-stroke-color-main-brown-800"
          />
        </div>
      </Link>

      {/* 출석 */}
      <Link to="/attandance" onClick={() => playButtonSound(ClickSound)}>
      <div className="absolute top-[0.6rem]  right-[7.6rem]  flex flex-col items-center justify-center ">
          <img
            src={IMAGE_URLS.main.attendance}
            alt="attendance"
            className="w-[1.8rem]"
          />
          <TextWithStroke
            text="출석"
            textClassName="text-main-blue-700 text-[0.88rem]"
            strokeClassName="text-main-blue-800 text-[0.88rem] text-stroke-width-[0.15rem] text-stroke-color-main-brown-800"
          />
        </div>
      </Link>

      {/* 이름과 포인트 */}
      <NameAndPoint />

      {/* 섬 */}

      {/* 시장 */}
      <div
        onClick={() => {
          playButtonSound(ClickSound);
          handleIslandClick("market", "/market");
        }}
        className="cursor-pointer"
      >
        <img
          src={IMAGE_URLS.main.market}
          alt="market"
          className="absolute top-[3.5rem] left-[2.5rem] w-[8.1rem]"
        />
        <div className="absolute top-[10.25rem] left-[5.25rem] px-[0.7rem] text-[0.8rem] pt-[0.08rem] font-bold text-main-brown-800 bg-main-yellow-700 border md:border-2 border-main-brown-700 rounded-lg">
          시장
        </div>
      </div>

      {/* 감정일기 */}
      <div
        onClick={() => {
          playButtonSound(ClickSound);
          handleIslandClick("emotionDiary", "/emotionDiary");
        }}
        className="cursor-pointer"
      >
        <img
          src={IMAGE_URLS.main.diary}
          alt="emotionsDiary"
          className="w-[7.8rem] absolute left-[2rem] bottom-[4.7rem]"
        />
        <div className="absolute  bottom-[4.5rem] left-[3.7rem] pl-[0.7rem] pr-[0.6rem] text-[0.8rem] pt-[0.08rem] font-bold text-main-brown-800 bg-main-yellow-700 border md:border-2 border-main-brown-700 rounded-lg">
          감정일기
        </div>
      </div>

      {/* 포포 키우기 */}
      <div
        onClick={() => {
          playButtonSound(ClickSound);
          handleIslandClick("raising", "/raising");
        }}
        className="cursor-pointer"
      >
        <img
          src={IMAGE_URLS.main.raising}
          alt="raising"
          className="w-[8.2rem] absolute left-[8.77rem] bottom-[1.58rem]"
        />
        <div className="absolute bottom-[1.5rem] left-[10rem]  px-[0.7rem] text-[0.8rem] pt-[0.08rem] font-bold text-main-brown-800 bg-main-yellow-700 border md:border-2 border-main-brown-700 rounded-lg">
          포포 키우기
        </div>
      </div>

      {/* 적금 */}
      <div
        onClick={() => {
          playButtonSound(ClickSound);
          handleIslandClick("savings", "/savings", "right");
        }}
        className="cursor-pointer"
      >
          <img
          src={IMAGE_URLS.main.saving}
          alt="savings"
          className="w-[8.2rem] right-[9.75rem] bottom-[0.9rem] absolute"
        />
        <div className="absolute bottom-[1rem] right-[12.3rem]  px-[1rem] text-[0.8rem] pt-[0.08rem]  font-bold text-main-brown-800 bg-main-yellow-700 border md:border-2 border-main-brown-700 rounded-lg">
          적금
        </div>
      </div>

      {/* 퀘스트 */}
      <div
        onClick={() => {
          playButtonSound(ClickSound);
          handleIslandClick("quest", "/quest", "right");
        }}
        className="cursor-pointer"
      >
        <img
          src={IMAGE_URLS.main.quest}
          alt="quest"
          className="w-[7.2rem] absolute right-[2.4rem] bottom-[6.25rem]"
        />
        <div className="absolute bottom-[6rem] right-[3.8rem]  px-[0.85rem] text-[0.8rem] pt-[0.08rem]   font-bold text-main-brown-800 bg-main-yellow-700 border md:border-2 border-main-brown-700 rounded-lg">
          퀘스트
        </div>
      </div>

      {/* 모의투자 */}
      <div
        onClick={() => {
          playButtonSound(ClickSound);
          handleIslandClick("investing", "/investing", "right");
        }}
        className="cursor-pointer"
      >
        <img
          src={IMAGE_URLS.main.investing}
          alt="quiz"
          className="w-[7.5rem] absolute  right-[2.75rem] top-[5.5rem]"
        />
        <div className="absolute top-[11.4rem] right-[4.2rem]  px-[0.85rem] text-[0.8rem] pt-[0.08rem] font-bold text-main-brown-800 bg-main-yellow-700 border md:border-2 border-main-brown-700 rounded-lg">
          모의투자
        </div>
      </div>
      {/* 포니 */}
      <Poni
        isAnimating={isAnimating}
        targetPosition={targetPosition}
        direction={direction}
        onAnimationComplete={handleAnimationComplete}
      />
    </Background>
  );
}
