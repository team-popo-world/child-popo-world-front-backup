// src/module/investing-game/template/little-pig-template/game-play-turn-finish.tsx
import { IMAGE_URLS } from "@/lib/constants/constants";
import { BorderModal } from "@/module/investing-game/component/border-modal";
import { TurnFinishStockCard } from "@/module/investing-game/component/turn-finish-stock-card";
import { playButtonSound } from "@/lib/utils/sound";
import ClickSound from "@/assets/sound/button_click.mp3";

// 돼지 데이터 타입 정의
interface StockData {
  image: string;
  name: string;
  priceChange: number;
  countChange: number;
}

interface GamePlayTurnFinishProps {
  onNextTurn: () => void;
  turn: number;
  stockData: StockData[];
  result: string;
  totalPoint: number;
  titleTextColor: string;
  buttonColor: string;
  borderColor: string;
  borderStrokeColor: string;
  sirenImage?: string;
}

export const GamePlayTurnFinish = ({
  onNextTurn,
  turn,
  stockData,
  result,
  totalPoint,
  titleTextColor,
  buttonColor,
  borderColor,
  borderStrokeColor,
  sirenImage,
}: GamePlayTurnFinishProps) => {
  return (
    <BorderModal
      className="flex flex-col items-start px-10"
      borderColor={borderColor}
      borderStrokeColor={borderStrokeColor}
      sirenImage={sirenImage}
    >
      <h1
        className={`self-center mt-2.5 mb-1.5 text-[1.65rem] font-extrabold`}
        style={{ color: titleTextColor }}
      >
        {turn + 1 <= 6 ? turn + 1 : turn}
        {turn + 1 <= 6 ? "턴 시작!" : "턴 종료!"}
      </h1>
      <p className={`mb-4 text-[0.75rem] font-bold `}>{result}</p>

      <section className="mb-4 grid grid-cols-3 gap-x-1.5 w-full">
        {stockData.map((stock, index) => (
          <TurnFinishStockCard key={index} {...stock} />
        ))}
      </section>

      <div className="flex items-center gap-x-1 self-center">
        <img
          src={IMAGE_URLS.common.coin}
          alt="코인"
          className="w-8 h-8 object-contain"
        />
        <p className={`text-lg font-bold`}>총 자산: {totalPoint}냥</p>
      </div>
      <button
        className={`absolute bottom-2 right-13 px-3 py-1.5 text-white text-[0.7rem] font-bold rounded-lg active:scale-95 transition-all duration-100`}
        style={{ backgroundColor: buttonColor }}
        onClick={() => {
          playButtonSound(ClickSound);
          onNextTurn();
        }}
      >
        {turn + 1 <= 6 ? "Let's 투자!" : "투자 완료!"}
      </button>
    </BorderModal>
  );
};
