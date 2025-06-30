import { Background } from "@/components/layout/Background";
import { TextWithStroke } from "@/components/text/TextWithStroke";
import { GamePlayStockCard } from "@/module/investing-game/component/game-play-stock-card";
import { NewsBox } from "../../component/news-box";
import { GamePlayTurnFinish } from "./game-play-turn-finish";
import { Modal } from "@/components/modal/Modal";
import type { GameState } from "@/page/investing/game/index";
import { useState, memo } from "react";
import { BackArrow } from "@/components/button/BackArrow";
import { GameOutModal } from "@/module/investing-game/component/game-out-modal";
import { useNavigate } from "react-router-dom";
import { playButtonSound } from "@/lib/utils/sound";
import ClickSound from "@/assets/sound/button_click.mp3";
import SoundButton from "@/components/button/SoundButton";
import { IMAGE_URLS } from "@/lib/constants/constants";

interface GamePlayProps {
  gameType: string;
  gameState: GameState;
  updateGameState: (updates: any) => void;
  handleTurnFinish: () => void;
  handleGameOut: () => void;
  backgroundImage: string;
  characterImages: string[];
  titleTextColor: string;
  buttonColor: string;
  borderColor: string;
  borderStrokeColor: string;
  sirenImage?: string;
  newsImage?: string;
  closeImage?: string;
}

interface StockData {
  image: string;
  name: string;
  priceChange: number;
  countChange: number;
}

const MemoizedTextWithStroke = memo(TextWithStroke);

export const GamePlay = ({
  gameType,
  gameState,
  updateGameState,
  handleTurnFinish,
  handleGameOut,
  backgroundImage,
  characterImages,
  titleTextColor,
  buttonColor,
  borderColor,
  borderStrokeColor,
  sirenImage,
  newsImage,
  closeImage,
}: GamePlayProps) => {
  // 턴 종료시 결과창 모달
  const [isTurnFinishModalOpen, setIsTurnFinishModalOpen] = useState(false);
  // 뒤로가기 클릭시 게임 나가기 모달
  const [isGameOutModalOpen, setIsGameOutModalOpen] = useState(false);

  const navigate = useNavigate();

  const calculatedPoint = () => {
    // 실제 판매하지는 않았지만 현재 가지고 있는 물건 개수가
    // 다음 턴 가격으로 판매되었다고 가정하고 총 자산에 반영함
    const calculatedPoint = gameState.nextPrice.reduce(
      (acc, nextTurnPrice, index) => {
        const soldCount = gameState.count[index]; // 총 자산은 현재 가지고 있는 모든 물건 판것을 추가함
        const soldPrice = nextTurnPrice * soldCount; // 다음턴에 반영된 가격이 총 자산에 반영됨
        return acc + soldPrice;
      },
      0
    );

    return gameState.point + calculatedPoint;
  };

  const getStockData = (
    index: number,
    image: string
  ): StockData | undefined => {
    if (gameState.currentScenario) {
      const stock = gameState.currentScenario.stocks[index];
      const prev = gameState.beforeCount[index];
      const curr = gameState.count[index];

      return {
        image, // 첫째, 둘째, 셋째 돼지 이미지
        name: stock?.name, // 종목명 (첫째돼지, 둘째돼지, 셋째돼지)
        priceChange: gameState.nextPrice[index] - stock?.current_value, // 다음 턴 가격 - 현재 가격
        countChange: curr - prev, // 현재 가지고 있는 물건 개수 - 이전 턴 가지고 있는 물건 개수
      };
    }
  };

  if (!gameState.currentScenario) return null;

  return (
    <Background
      backgroundImage={backgroundImage}
      backgroundClassName="flex flex-col items-center"
    >
      <Modal isOpen={isTurnFinishModalOpen}>
        <GamePlayTurnFinish
          onNextTurn={() => {
            setIsTurnFinishModalOpen(false);
            handleTurnFinish();
          }}
          turn={gameState.turn}
          stockData={[
            getStockData(0, characterImages[0]),
            getStockData(1, characterImages[1]),
            getStockData(2, characterImages[2]),
          ].filter((data): data is NonNullable<typeof data> => data !== null)}
          result={gameState.result}
          totalPoint={calculatedPoint()}
          titleTextColor={titleTextColor}
          buttonColor={buttonColor}
          borderColor={borderColor}
          borderStrokeColor={borderStrokeColor}
          sirenImage={sirenImage}
        />
      </Modal>
      <Modal isOpen={isGameOutModalOpen}>
        <GameOutModal
          onConfirm={() => {
            setIsGameOutModalOpen(false);
            handleGameOut();
            navigate("/investing");
          }}
          onCancel={() => {
            setIsGameOutModalOpen(false);
          }}
          sirenImage={sirenImage}
          closeImage={closeImage}
        />
      </Modal>

      <BackArrow
        onClick={() => {
          // 턴 종료 모달이 열려있으면 아무 효과 없음
          if (isTurnFinishModalOpen) return;
          setIsGameOutModalOpen(true);
        }}
        color={gameType === "ninja" ? "white" : "gray"}
      />
      {/* 음소거 버튼 */}
      <SoundButton />

      <div className="self-end mt-3 mr-6 mb-1">
        <MemoizedTextWithStroke
          text={`${gameState.turn}턴 / ${gameState.turnMax}턴`}
          textClassName="text-main-yellow-200 text-[1rem] font-bold"
          strokeClassName="text-main-brown-700 text-[1rem] font-bold text-stroke-width-[0.2rem] text-stroke-color-main-brown-700"
        />
        <div className="flex items-center justify-end gap-x-0.5">
          <img
            src={IMAGE_URLS.common.coin}
            alt="코인"
            className="w-4 h-4 object-contain"
          />
          <TextWithStroke
            text={`${gameState.point}냥`}
            textClassName="text-main-yellow-200 text-[0.65rem] font-bold tracking-[0.075rem]"
            strokeClassName="text-main-brown-700 text-[0.65rem] font-bold text-stroke-width-[0.15rem] text-stroke-color-main-brown-700 tracking-[0.075rem]"
          />
        </div>
      </div>

      <NewsBox
        title={gameState.currentScenario.news}
        hint={gameState.currentScenario.news_hint}
        sirenImage={sirenImage}
        newsImage={newsImage}
      />

      <section className="relative flex items-center justify-center gap-x-2.5">
        {gameState.currentScenario.stocks.map((stock, index) => (
          <GamePlayStockCard
            key={stock.name}
            stockImage={characterImages[index]}
            name={stock.name}
            expectation={stock.expectation}
            currentPrice={gameState.price[index]}
            priceChange={gameState.price[index] - stock.before_value}
            quantity={gameState.beforeCount[index]}
            riskType={stock.risk_level}
            count={gameState.count[index]}
            onQuantityChange={(newQuantity) => {
              updateGameState({
                count: gameState.count.map((c, i) =>
                  i === index ? newQuantity : c
                ),
              });
            }}
            point={gameState.point}
            setPoint={(newPoint) => updateGameState({ point: newPoint })}
            volumeChange={gameState.count[index] - gameState.beforeCount[index]}
            setMinusClickEvent={() => {
              playButtonSound(ClickSound);
              updateGameState({
                minusClickCount: gameState.minusClickCount.map((c, i) =>
                  i === index ? c + 1 : c
                ),
              });
            }}
            setPlusClickEvent={() => {
              playButtonSound(ClickSound);
              updateGameState({
                plusClickCount: gameState.plusClickCount.map((c, i) =>
                  i === index ? c + 1 : c
                ),
              });
            }}
          />
        ))}
      </section>

      <button
        onClick={() => {
          playButtonSound(ClickSound);
          setIsTurnFinishModalOpen(true);
        }}
        className="self-end mx-2 my-1 px-4 py-0.5 font-bold bg-main-yellow-350 border-[0.19rem] border-main-brown-400 rounded-lg active:scale-95 transition-all duration-100"
      >
        턴 종료!
      </button>
    </Background>
  );
};
