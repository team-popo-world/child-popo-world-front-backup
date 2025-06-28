import { Link } from "react-router-dom";
import { StockDescription } from "../../component/stock-description";
import { BorderModal } from "../../component/border-modal";
import { playButtonSound } from "@/lib/utils/sound";
import closeSound from "@/assets/sound/back_click.mp3";
import CloseIcon from "@/components/icon/CloseIcon";

interface GameDescription {
  image: string;
  label: string;
  descriptions: string[];
}

interface GameStartExplainProps {
  onClose: () => void;
  gameTitle: string;
  gameDescription: string;
  descriptions: GameDescription[];
  gamePlayPath: string;
  point: number;
  textColor: string;
  stockNameColor: string;
  borderColor: string;
  borderStrokeColor: string;
  sirenImage?: string;
}

export const GameStartExplain = ({
  onClose,
  gameTitle: _gameTitle,
  gameDescription,
  descriptions,
  textColor,
  stockNameColor,
  borderColor,
  borderStrokeColor,
  sirenImage,
  gamePlayPath,
  }: GameStartExplainProps) => {
  return (
    <BorderModal
      borderColor={borderColor}
      borderStrokeColor={borderStrokeColor}
      className={`flex flex-col items-start px-6`}
      sirenImage={sirenImage}
    >

      {/* 닫기 버튼 */}
      <CloseIcon className="absolute top-3 right-3 w-5 h-5 object-contain active:scale-95 transition-all duration-100" onClick={() => {
        playButtonSound(closeSound);
        onClose();
      }} />

      {/* 게임 설명 제목 */}
      <h1 className={`my-2 text-2xl font-extrabold self-center`} style={{ color: textColor }}>
        게임 설명
      </h1>
      {/* 게임 설명 내용 */}
      {/* tracking-[0.02rem] 글자 간격 조정 */}
      <p className={`px-4 text-xs font-bold mb-3 letter-spacing: tracking-[0.02rem]`} style={{ color: textColor }}>
        {gameDescription}
      </p>
      {/* 모의투자에서 돼지들 설명 영역 */}
      <section className="flex flex-col gap-y-3">
        {descriptions.map((desc, index) => (
          <StockDescription key={index} image={desc.image} label={desc.label} bgColor={stockNameColor}>
            {desc.descriptions.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </StockDescription>
        ))}
      </section>
      {/* 게임 시작 버튼 */}
        <Link to={gamePlayPath}
          className={`absolute bottom-3 right-13 px-3 py-1.5 text-white text-[0.7rem] rounded-lg active:scale-95 transition-all duration-100`}
          style={{ backgroundColor: stockNameColor }}
          onClick={() => {
            playButtonSound();
          }}
        >
          게임 시작
        </Link>
    </BorderModal>
  );
};
