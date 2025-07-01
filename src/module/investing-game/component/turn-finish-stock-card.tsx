// src/module/investing-game/component/little-pig-component/pig-card.tsx
import { IMAGE_URLS } from "@/lib/constants/constants";
import clsx from "clsx";

interface StockCardProps {
  image: string;
  name: string;
  priceChange: number;
  countChange: number;
}

export const TurnFinishStockCard = ({ image, name, priceChange, countChange }: StockCardProps) => {

  return (
    <div className="flex flex-col items-center">
      <img
        src={image}
        alt={name}
        className="mb-3 min-w-0 h-16 object-contain"
      />
      <h4 className={`text-[0.75rem] font-bold mb-1 self-center`}>{name}</h4>
      <div className="flex flex-col gap-y-0.5 mt-1 ">
        <div className="flex items-center gap-x-0.5">
          <img
            src={IMAGE_URLS.common.coin}
            alt="코인"
            className="w-4 h-4 object-contain"
          />
          <span className={`text-[0.75rem] font-bold`}>가격 변동: </span>
          <span
            className={clsx("pl-1.5 text-[0.75rem] font-bold", {
              "text-main-red-600": priceChange > 0,
              "text-main-blue-600": priceChange < 0,
              "text-black": priceChange === 0,
            })}
          >
            {priceChange > 0
              ? `+${priceChange}냥`
              : priceChange < 0
              ? `-${Math.abs(priceChange)}냥`
              : "0냥"}
          </span>
        </div>
        <div className="flex items-center gap-x-0.5">
          <img
            src={IMAGE_URLS.investing_game.little_pig.little_pig_box}
            alt="물건"
            className="w-4 h-4 object-contain"
          />
          <span className={`text-[0.75rem] font-bold`}>수량 변동: </span>
          <span
            className={clsx("pl-1.5 text-[0.75rem] font-bold", {
              "text-main-red-600": countChange > 0,
              "text-main-blue-600": countChange < 0,
              "text-black": countChange === 0,
            })}
          >
            {countChange > 0
              ? `+${countChange}개`
              : countChange < 0
              ? `-${Math.abs(countChange)}개`
              : "0개"}
          </span>
        </div>
      </div>
    </div>
  );
};
