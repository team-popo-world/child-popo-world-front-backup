import { Background } from "@/components/layout/Background";
import { TextWithStroke } from "@/components/text/TextWithStroke";
import { useState } from "react";
import { GameStartExplain } from "./game-start-explain";
import { BackArrow } from "@/components/button/BackArrow";
import SoundButton from "@/components/button/SoundButton";
import { playButtonSound } from "@/lib/utils/sound";
import { GameOutModal } from "../../component/game-out-modal";
import { Modal } from "@/components/modal/Modal";
import { useNavigate } from "react-router-dom";
import { INITIAL_CHAPTER_DATA } from "@/page/investing/game";


interface GameCharacter {
  image: string;
  alt: string;
  label: string;
}

interface GameStartProps {
  backgroundImage: string;
  title: string;
  subtitle: string;
  characters: GameCharacter[];
  gameTitle: string;
  gameDescription: string;
  descriptions: {
    image: string;
    label: string;
    descriptions: string[];
  }[];
  gamePlayPath: string;
  textColor: string;
  stockNameColor: string;
  borderColor: string;
  borderStrokeColor: string;
  titleTextColor: string;
  titleStrokeColor: string;
  subtitleTextColor: string;
  subtitleStrokeColor: string;
  stockButtonBgColor: string;
  stockButtonStrokeColor: string;
  startButtonBgColor: string;
  startButtonStrokeColor: string;
  gameType: string;
  point: number;
  handleGameOut: () => void;
}

export const GameStart = ({
  backgroundImage,
  title,
  subtitle,
  characters,
  gameTitle,
  gameDescription,
  descriptions,
  gamePlayPath,
  textColor,
  stockNameColor,
  borderColor,
  borderStrokeColor,
  titleTextColor,
  titleStrokeColor,
  subtitleTextColor,
  subtitleStrokeColor,
  stockButtonBgColor,
  stockButtonStrokeColor,
  startButtonBgColor,
  startButtonStrokeColor,
  gameType,
  point,
  handleGameOut,
}: GameStartProps) => {
  // 게임 설명 모달 상태
  const [isGameStartModalOpen, setIsGameStartModalOpen] = useState(false);
  const [isGameOutModalOpen, setIsGameOutModalOpen] = useState(false);
  const navigate = useNavigate();
  // 맨 첫화면에서 게임 시작하기를 눌러 모달을 띄운다면 모달 화면을 보여준다.
  if (isGameStartModalOpen) {
    return (
      <Background backgroundImage={backgroundImage} backgroundClassName="flex flex-col items-center justify-center">
        {/* 게임 종료 모달 */}
        <Modal isOpen={isGameOutModalOpen}>
          <GameOutModal
            onConfirm={() => {
              setIsGameOutModalOpen(false);
              navigate("/investing");
              handleGameOut();
            }}
            onCancel={() => {
              setIsGameOutModalOpen(false);
            }}
            sirenImage={INITIAL_CHAPTER_DATA[gameType].sirenImage}
            closeImage={INITIAL_CHAPTER_DATA[gameType].closeImage}
          />
        </Modal>
        <BackArrow color={gameType === "ninja" ? "white" : "gray"} onClick={() => setIsGameOutModalOpen(true)} />
        <SoundButton />
        <GameStartExplain
          point={point}
          onClose={() => setIsGameStartModalOpen(false)}
          gameTitle={gameTitle}
          gameDescription={gameDescription}
          descriptions={descriptions}
          gamePlayPath={gamePlayPath}
          textColor={textColor}
          stockNameColor={stockNameColor}
          borderColor={borderColor}
          borderStrokeColor={borderStrokeColor}
          sirenImage={INITIAL_CHAPTER_DATA[gameType].sirenImage}
        />
      </Background>
    );
  }

  // 모달 뜬것이 없다면 게임 시작화면을 보여준다.
  return (
    <Background backgroundImage={backgroundImage} backgroundClassName="flex flex-col items-center">
      <Modal isOpen={isGameOutModalOpen}>
        <GameOutModal
          onConfirm={() => {
            setIsGameOutModalOpen(false);
            navigate("/investing");
            handleGameOut();
          }}
          onCancel={() => {
            setIsGameOutModalOpen(false);
          }}
          sirenImage={INITIAL_CHAPTER_DATA[gameType].sirenImage}
          closeImage={INITIAL_CHAPTER_DATA[gameType].closeImage}
        />
      </Modal>

      {/* 뒤로가기 버튼 */}
      <BackArrow color={gameType === "ninja" ? "white" : "gray"} onClick={() => setIsGameOutModalOpen(true)}  />
      {/* 음소거 버튼 */}
      <SoundButton />
      {/* 제목 */}
      {/* leading-[1.2] 줄간격 조정 */}
      <TextWithStroke
        text={title}
        className="mt-12"
        textClassName="text-[3rem] font-bold leading-[1.2]"
        strokeClassName="text-[3rem] font-bold text-stroke-width-[0.5rem] leading-[1.2]"
        textColor={titleTextColor}
        strokeColor={titleStrokeColor}
      />
      <TextWithStroke
        text={subtitle}
        className="mb-10"
        textClassName="text-[1.5rem] font-bold"
        strokeClassName="text-[1.5rem] font-bold text-stroke-width-[0.3rem]"
        textColor={subtitleTextColor}
        strokeColor={subtitleStrokeColor}
      />
      {/* 주식들 */}
      <section className="flex justify-center items-center  ml-1 mb-2 pr-5 gap-x-7">
        {characters.map((char, index) => (
          <div key={index} className="relative flex flex-col justify-center items-center gap-y-0">
            <img src={char.image} alt={char.alt} className="min-w-0 h-37 object-contain" />
            <div
              className="px-[1rem] ml-[0.2rem] rounded-lg border-[0.13rem] flex justify-center items-center py-[0.25rem]"
              style={{ backgroundColor: stockButtonBgColor, borderColor: stockButtonStrokeColor }}
            >
              <span className="text-white text-[0.85rem] font-bold">{char.label}</span>
            </div>
          </div>
        ))}
      </section>
      {/* 버튼 */}
      <button
        className="px-6 py-2 border-[0.2rem] rounded-lg active:scale-95 transition-all duration-100"
        style={{ backgroundColor: startButtonBgColor, borderColor: startButtonStrokeColor }}
        onClick={() => {
          setIsGameStartModalOpen(true);
          playButtonSound();
        } }
      >
        <span className="text-white text-xl font-bold">투자 게임 시작</span>
      </button>
    </Background>
  );
};
