import { GamePlay } from "./game-template/game-play";
import type { GameState } from "@/page/investing/game/index";
import { IMAGE_URLS } from "@/lib/constants/constants";

// http://localhost:5173/investing/game/little-pig?stage=game-play

interface GamePlayTemplateProps {
  gameType: string;
  gameState: GameState;
  updateGameState: (updates: any) => void;
  handleTurnFinish: () => void;
  handleGameOut: () => void;
}

export const GamePlayTemplate = ({
  gameType,
  gameState,
  updateGameState,
  handleTurnFinish,
  handleGameOut,
}: GamePlayTemplateProps) => {
  switch (gameType) {
    case "little-pig":
      return (
        <GamePlay
          gameType={gameType}
          gameState={gameState}
          updateGameState={updateGameState}
          handleTurnFinish={handleTurnFinish}
          handleGameOut={handleGameOut}
          backgroundImage={IMAGE_URLS.investing_game.little_pig.little_pig_bg}
          characterImages={[
            IMAGE_URLS.investing_game.little_pig.little_pig_1,
            IMAGE_URLS.investing_game.little_pig.little_pig_2,
            IMAGE_URLS.investing_game.little_pig.little_pig_3,
          ]}
          titleTextColor="#c55e5e" // 모달 제목
          buttonColor="#c55e5e" // 모달 버튼
          borderColor="#ff9d9d" // 모달 테두리
          borderStrokeColor="#7a5c34" // 모달 테두리 스트로크
          sirenImage={IMAGE_URLS.investing_game.little_pig.little_siren_pig}
          newsImage={IMAGE_URLS.investing_game.little_pig.little_news_pig}
          closeImage={IMAGE_URLS.investing_game.little_pig.little_pig_close}
        />
      );
    case "truck":
      return (
        <GamePlay
          gameType={gameType}
          gameState={gameState}
          updateGameState={updateGameState}
          handleTurnFinish={handleTurnFinish}
          handleGameOut={handleGameOut}
          backgroundImage={IMAGE_URLS.investing_game.truck.truck_bg}
          characterImages={[
            IMAGE_URLS.investing_game.truck.taco_truck,
            IMAGE_URLS.investing_game.truck.icecream_truck,
            IMAGE_URLS.investing_game.truck.sandwich_truck,
          ]}
          titleTextColor="#1D79BA"
          buttonColor="#1D79BA"
          borderColor="#518EB9"
          borderStrokeColor="#374752"
          sirenImage={IMAGE_URLS.investing_game.base.siren_popo}
          newsImage={IMAGE_URLS.investing_game.base.news_popo}
        />
      );
    case "ninja":
      return (
        <GamePlay
          gameType={gameType}
          gameState={gameState}
          updateGameState={updateGameState}
          handleTurnFinish={handleTurnFinish}
          handleGameOut={handleGameOut}
          backgroundImage={IMAGE_URLS.investing_game.ninja.ninja_bg}
          characterImages={[
            IMAGE_URLS.investing_game.ninja.ninja1,
            IMAGE_URLS.investing_game.ninja.ninja2,
            IMAGE_URLS.investing_game.ninja.ninja3,
          ]}
          titleTextColor="#7A5C34"
          buttonColor="#7A5C34"
          borderColor="#A2A07C"
          borderStrokeColor="#555555"
          sirenImage={IMAGE_URLS.investing_game.base.siren_popo}
          newsImage={IMAGE_URLS.investing_game.base.news_popo}
        />
      );
    case "masic":
      return (
        <GamePlay
          gameType={gameType}
          gameState={gameState}
          updateGameState={updateGameState}
          handleTurnFinish={handleTurnFinish}
          handleGameOut={handleGameOut}
          backgroundImage={IMAGE_URLS.investing_game.masic.masic_bg}
          characterImages={[
            IMAGE_URLS.investing_game.masic.masic_1,
            IMAGE_URLS.investing_game.masic.masic_2,
            IMAGE_URLS.investing_game.masic.masic_3,
          ]}
          titleTextColor="#1D79BA"
          buttonColor="#1D79BA"
          borderColor="#518EB9"
          borderStrokeColor="#374752"
          sirenImage={IMAGE_URLS.investing_game.base.siren_popo}
          newsImage={IMAGE_URLS.investing_game.base.news_popo}
        />
      );
  }
};
