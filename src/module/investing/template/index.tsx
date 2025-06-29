import { TextWithStroke } from "../../../components/text/TextWithStroke";
import { Info } from "../components/Info";
import { Background } from "../../../components/layout/Background";
import { IMAGE_URLS } from "@/lib/constants/constants";
import { BackArrow } from "@/components/button/BackArrow";
import { motion } from "framer-motion";
import SoundButton from "@/components/button/SoundButton";
import { Modal } from "@/components/modal/Modal";
import { GameStartModal } from "@/module/investing/components/game-start-modal";
import type { TargetAndTransition } from "framer-motion"
import { chaptersInfo } from "@/page/investing";
import { NoPointModal } from "@/components/modal/NoPointModal";
import { playButtonSound } from "@/lib/utils/sound";

interface InvestingTemplateProps {
  onBack: () => void;
  point: number | null;
  animation: TargetAndTransition;
  isGameStartModalOpen: boolean;
  setIsGameStartModalOpen: (isOpen: boolean) => void;
  isNoPointModalOpen: boolean;
  setIsNoPointModalOpen: (isOpen: boolean) => void;
  chapter: string;
  onChapterClick: (chapter: string) => void;
  handleGameStart: (chapter: string) => void;
}

export const InvestingTemplate = ({
  onBack,
  point,  
  animation,
  isGameStartModalOpen,
  setIsGameStartModalOpen,
  isNoPointModalOpen,
  setIsNoPointModalOpen,
  chapter,
  onChapterClick,
  handleGameStart,
}: InvestingTemplateProps) => {

  return (
    // 백그라운드 이미지
    <Background backgroundImage={IMAGE_URLS.investing.bg}>
       {/* 모의투자 시작 모달 */}
       {isGameStartModalOpen && 
        <Modal isOpen={isGameStartModalOpen} >
          <GameStartModal 
          point={chaptersInfo[chapter as keyof typeof chaptersInfo].price} 
          title={chaptersInfo[chapter as keyof typeof chaptersInfo].name}
          onConfirm={() => handleGameStart(chapter)} 
          onCancel={() => setIsGameStartModalOpen(false)} 
          sirenImage={chaptersInfo[chapter as keyof typeof chaptersInfo].sirenImage}
          newsImage={chaptersInfo[chapter as keyof typeof chaptersInfo].newsImage}
          />
        </Modal>
        }
        {/* 포인트 부족 모달 */}
        <Modal isOpen={isNoPointModalOpen} >
          <NoPointModal 
            requiredPoint={chaptersInfo[chapter as keyof typeof chaptersInfo]?.price || 0}
            currentPoint={point || 0} isOpen={isNoPointModalOpen} onClose={() => {
            playButtonSound();
            setIsNoPointModalOpen(false); 
          }} />
        </Modal>

      {/* 뒤로가기 버튼 */}
      <BackArrow onClick={onBack} />
      {/* 음소거 버튼 */}
      <SoundButton />
      {/* 모의투자 제목 + 보유 코인 div */}
      <div
        aria-label="페이지 제목과 보유 코인 정보 섹션"
        className="flex flex-col justify-center items-center mt-[1.3rem]"
      >
        {/* 모의투자 제목 */}
        <div aria-label="페이지 제목: 모의투자">
          <TextWithStroke
            text="모의투자"
            textClassName="text-main-yellow-800 text-[2.1rem]"
            strokeClassName="text-main-brown-800 text-[2.1rem] text-stroke-width-[0.4rem] text-stroke-color-main-brown-800"
          />
        </div>
        {/* 보유 코인 */}
        <div
          aria-label="보유 코인 금액"
          className="mt-[0.4rem] bg-amber-100 rounded-2xl w-fit px-[0.2rem] py-[0.05rem] border-[0.1rem] border-[#795c2d]"
        >
          <div className="flex justify-center items-center mr-[0.5rem]">
            <img
              src={IMAGE_URLS.common.coin}
              alt="코인"
              className="h-[1.5rem]"
            />
            <TextWithStroke
              text={`${point?.toString()}냥`}
              className="ml-[0.3rem] mt-[0.08rem]"
              textClassName="text-main-yellow-800 text-[1rem]"
              strokeClassName="text-main-brown-800 text-[1rem] text-stroke-width-[0.2rem] text-stroke-color-main-brown-800"
            />
          </div>
        </div>
      </div>

     
      {/* 포니 */}
      <motion.img
        src={IMAGE_URLS.investing.poni}
        alt="포니 캐릭터"
        className="absolute h-[11.25rem] left-[14.5rem] top-[9rem]"
        animate={animation}
        transition={{ duration: 1 }}
      />
      {/* 챕터 제목, 가격 */}
      <TextWithStroke
        text="아기돼지 삼형제"
        className="absolute left-[2.7rem] bottom-[3.5rem]"
        textClassName="text-main-yellow-150 text-[1.3rem]"
        strokeClassName="text-investing-orange-100 text-[1.3rem] text-stroke-width-[0.6rem] text-stroke-color-main-brown-800"
      />
      <Info price="1000냥" className="absolute left-[4.3rem] top-[1.7rem]" />
      {/* 푸드트럭 */}
      <TextWithStroke
        text="푸드트럭 왕국"
        className="absolute left-[18.7rem] bottom-[3.5rem]"
        textClassName="text-main-yellow-150 text-[1.3rem]"
        strokeClassName="text-investing-yellow-100 text-[1.3rem] text-stroke-width-[0.6rem] text-stroke-color-main-brown-800"
      />
      <Info price="2000냥" className="absolute right-[4.6rem] top-[1.7rem]" />
      {/* 마법 */}
      <TextWithStroke
        text="마법 왕국"
        className="absolute right-[12rem] top-[16rem]"
        textClassName="text-main-yellow-150 text-[1.3rem]"
        strokeClassName="text-investing-purple-100 text-[1.3rem] text-stroke-width-[0.6rem] text-stroke-color-main-brown-800"
      />
      <Info price="3000냥" className="absolute left-[4.3rem] bottom-[1rem]" />
      {/* 달빛 */}
      <TextWithStroke
        text="달빛 도둑"
        className="absolute left-[7.4rem] top-[16rem]"
        textClassName="text-main-yellow-150 text-[1.3rem]"
        strokeClassName="text-investing-blue-100 text-[1.3rem] text-stroke-width-[0.6rem] text-stroke-color-main-brown-800"
      />
      <Info price="4000냥" className="absolute right-[4rem] bottom-[1rem]" />

      {/* 챕터 클릭 포지션 */}
      <div
        aria-label="아기돼지 삼형제"
        className="w-[12.1rem] h-[12rem] absolute left-[1.5rem] top-[1.9rem] cursor-pointer"
        onClick={() => onChapterClick("little-pig")}
      ></div>
      <div
        aria-label="푸드트럭 왕국"
        className="w-[12.1rem] h-[12rem] absolute right-[1.5rem] top-[1.9rem] cursor-pointer"
        onClick={() => onChapterClick?.("truck")}
      ></div>
      <div
        aria-label="마법 왕국"
        className="w-[12.1rem] h-[12rem] absolute left-[1.5rem] top-[14.1rem] cursor-pointer"
        onClick={() => onChapterClick?.("masic")}
      ></div>
      <div
        aria-label="달빛 도둑"
        className="w-[12.1rem] h-[12rem] absolute right-[1.5rem] top-[14.1rem] cursor-pointer"
        onClick={() => onChapterClick?.("ninja")}
      ></div>
    </Background>
  );
};
