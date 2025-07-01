import { IMAGE_URLS } from "@/lib/constants/constants";
import { GameStart } from "./game-template/game-start";

interface GameStartTemplateProps {
  gameType: string;
  point: number;
  handleGameOut: () => void;
}

export const GameStartTemplate = ({ gameType, point, handleGameOut }: GameStartTemplateProps) => {
  switch (gameType) {
    case "little-pig":
      return (
        <GameStart
          backgroundImage={IMAGE_URLS.investing_game.little_pig.little_pig_bg}
          title="아기돼지 삼형제"
          subtitle="가장 부자 돼지는 누구?"
          characters={[
            {
              image: IMAGE_URLS.investing_game.little_pig.little_pig_1,
              alt: "첫째 돼지",
              label: "고위험 고수익",
            },
            {
              image: IMAGE_URLS.investing_game.little_pig.little_pig_2,
              alt: "둘째 돼지",
              label: "균형형",
            },
            {
              image: IMAGE_URLS.investing_game.little_pig.little_pig_3,
              alt: "셋째 돼지",
              label: "장기 안정형",
            },
          ]}
          gameTitle="게임 설명"
          gameDescription={`오늘은 아기돼지 삼형제가 각자 집을 짓기 시작했어요!
첫째 돼지는 지푸라기, 둘째 돼지는 나무, 셋째 돼지는 벽돌로 집을 지을거래요.
어떤 돼지가 더 많은 돈을 벌 수 있을까요?`}
          descriptions={[
            {
              image: IMAGE_URLS.investing_game.little_pig.little_pig_1,
              label: "첫째 돼지",
              descriptions: [
                "무엇이든 빠르게 해요.",
                "집을 뚝딱 짓고, 빠르게 돈을 벌고 싶어해요.",
                "조금은 위험해도 괜찮다고 생각해요. 조금 망가져도 다시 빠르게 고치면 되니깐요!",
              ],
            },
            {
              image: IMAGE_URLS.investing_game.little_pig.little_pig_2,
              label: "둘째 돼지",
              descriptions: [
                "이 정도면 괜찮아~ 하고 웃어요.",
                "조금 빠르게, 조금 튼튼하게! 둘 다 하고 싶어요.",
                "너무 오래 일하는건 싫어해요.",
              ],
            },
            {
              image: IMAGE_URLS.investing_game.little_pig.little_pig_3,
              label: "셋째 돼지",
              descriptions: [
                "천천히 하지만 끝까지 잘해요.",
                "안전이 가장 중요하다고 생각해서, 집을 가장 튼튼하게 만들어요.",
                "나중을 미리 생각하며 힘든 일도 참을 수 있어요.",
              ],
            },
          ]}
          gamePlayPath="/investing/game/little-pig?stage=game-play"
          textColor="#c55e5e" // 모달 텍스트 색
          stockNameColor="#c55e5e" // 모달 버튼 색
          borderColor="#ff9d9d" // 모달 테두리색
          borderStrokeColor="#7a5c34" // 모달 테두리 스트로크 색 
          titleTextColor="#fff9d0" // 게임 시작 제목 색
          titleStrokeColor="#6a3909" // 게임 시작 제목 스트로크 색
          subtitleTextColor="#ffac2a" // 게임 시작 서브타이틀 색
          subtitleStrokeColor="#6a3909" // 게임 시작 서브타이틀 스트로크 색
          stockButtonBgColor="#a86332" // 종목 카드 버튼 색
          stockButtonStrokeColor="#895835" // 종목 카드 버튼 스트로크 색
          startButtonBgColor="#fe6e38" // 게임 시작 버튼 색
          startButtonStrokeColor="#e45628" // 게임 시작 버튼 스트로크 색
          gameType={gameType}
          point={point}
          handleGameOut={handleGameOut}
        />
      );
    case "truck":
      return (
        <GameStart
          backgroundImage={IMAGE_URLS.investing_game.truck.truck_bg}
          title="푸드트럭 마을"
          subtitle="어떤 트럭이 사람들의 마음을 사로잡을까?"
          characters={[
            {
              image: IMAGE_URLS.investing_game.truck.taco_truck,
              alt: "퓨전 타코 트럭",
              label: "고위험 고수익",
            },
            {
              image: IMAGE_URLS.investing_game.truck.icecream_truck,
              alt: "아이스크림 트럭",
              label: "균형형",
            },
            {
              image: IMAGE_URLS.investing_game.truck.sandwich_truck,
              alt: "샌드위치 트럭",
              label: "장기 안정형",
            },
          ]}
          gameTitle="게임 설명"
          gameDescription={`여기는 푸드트럭 마을!
        매일매일 맛있는 냄새가 가득해요.
        당신은 이 마을에서 제일 궁금쟁이 요리사예요.
        오늘은 어떤 트럭이 사람들의 마음을 사로잡을까?
        햇빛이 쨍쨍한 날, 비 오는 날, 유명한 요리사가 오는 날…
        하루하루 다른 일이 생기면서, 트럭들의 인기도 조금씩 달라져요!`}
          descriptions={[
            {
              image: IMAGE_URLS.investing_game.truck.taco_truck,
              label: "퓨전 타코 트럭",
              descriptions: [
                "색다른 맛으로 친구들을 놀라게 해요.",
                `"우와!" 하고 반응할 수도 있고,
            "이건 무슨 맛이지?" 하고 고개를 갸웃할 수도 있어요.`,
              ],
            },
            {
              image: IMAGE_URLS.investing_game.truck.icecream_truck,
              label: "아이스크림 트럭",
              descriptions: ["햇빛이 쨍쨍한 날엔 인기 최고!", "하지만 추운 날에는 손님이 줄어들 수도 있어요."],
            },
            {
              image: IMAGE_URLS.investing_game.truck.sandwich_truck,
              label: "샌드위치 트럭",
              descriptions: ["언제 먹어도 맛있고, 누구나 좋아하는 메뉴예요.", "늘 비슷하게 잘 되는 편이에요."],
            },
          ]}
          gamePlayPath="/investing/game/truck?stage=game-play"
          textColor="#1D79BA"
          stockNameColor="#1D79BA"
          borderColor="#518EB9"
          borderStrokeColor="#374752"
          titleTextColor="#fff9d0"
          titleStrokeColor="#6a3909"
          subtitleTextColor="#ffac2a"
          subtitleStrokeColor="#6a3909"
          stockButtonBgColor="#a86332"
          stockButtonStrokeColor="#895835"
          startButtonBgColor="#fe6e38"
          startButtonStrokeColor="#e45628"
          gameType={gameType}
          point={point}
          handleGameOut={handleGameOut}
        />
      );
    case "ninja":
      return (
        <GameStart
          backgroundImage={IMAGE_URLS.investing_game.ninja.ninja_bg}
          title="달빛 도둑"
          subtitle="성공할 작전을 찾아라!"
          characters={[
            {
              image: IMAGE_URLS.investing_game.ninja.ninja1,
              alt: "달빛 가루",
              label: "고위험 고수익",
            },
            {
              image: IMAGE_URLS.investing_game.ninja.ninja2,
              alt: "달조각 목걸이",
              label: "균형형",
            },
            {
              image: IMAGE_URLS.investing_game.ninja.ninja3,
              alt: "달빛 방패",
              label: "장기 안정형",
            },
          ]}
          gameTitle="게임 설명"
          gameDescription={` 여기는 밤마다 달빛이 내려앉는 신비로운 세계, 달빛 왕국! 당신은 날쌘 달빛 도둑으로, 매일 밤 세 가지 은밀한 보물
        훔치기 작전에 참여하게 됩니다.
        과연 당신은 최고의 달빛 도둑이 될 수 있을까요?`}
          descriptions={[
            {
              image: IMAGE_URLS.investing_game.ninja.ninja1,
              label: "달빛 방패",
              descriptions: [
                "왕실의 보물창고 깊숙이 숨겨진 전설의 방패예요.",
                "훔치기 어렵고 위험하지만, 성공하면 엄청난 돈을 벌 수 있어요.",
                "대담한 도둑만이 이 작전에 도전할 수 있어요",
              ],
            },
            {
              image: IMAGE_URLS.investing_game.ninja.ninja2,
              label: "달조각 목걸이",
              descriptions: [
                "목표물은 작지만 반짝이는 보물이에요.",
                "들킬 수도 있지만, 잘만 하면 꽤 괜찮은 보상을 얻을 수 있어요.",
                "적당한 모험과 적당한 보상!",
              ],
            },
            {
              image: IMAGE_URLS.investing_game.ninja.ninja3,
              label: "달빛 가루",
              descriptions: [
                "가장 조용하고 안전한 작전이에요.",
                "큰 변화는 없지만 꾸준히 돈을 벌 수 있어요.",
                "들킬 위험은 거의 없어요!",
              ],
            },
          ]}
          gamePlayPath="/investing/game/ninja?stage=game-play"
          textColor="#7A5C34"
          stockNameColor="#7A5C34"
          borderColor="#A2A07C"
          borderStrokeColor="#555555"
          titleTextColor="#fff9d0"
          titleStrokeColor="#6a3909"
          subtitleTextColor="#ffac2a"
          subtitleStrokeColor="#6a3909"
          stockButtonBgColor="#a86332"
          stockButtonStrokeColor="#895835"
          startButtonBgColor="#fe6e38"
          startButtonStrokeColor="#e45628"
          gameType={gameType}
          point={point}
          handleGameOut={handleGameOut}
        />
      );
    case "masic":
      return (
        <GameStart
          backgroundImage={IMAGE_URLS.investing_game.masic.masic_bg}
          title="마법 왕국의 작은 마법사"
          subtitle="어느 가게가 잘될까?"
          characters={[
            {
              image: IMAGE_URLS.investing_game.masic.masic_1,
              alt: "마법연구소",
              label: "고위험 고수익",
            },
            {
              image: IMAGE_URLS.investing_game.masic.masic_2,
              alt: "서커스단",
              label: "균형형",
            },
            {
              image: IMAGE_URLS.investing_game.masic.masic_3,
              alt: "빵집",
              label: "장기 안정형",
            },
          ]}
          gameTitle="게임 설명"
          gameDescription={`옛날 옛날, 반짝이는 별빛이 가득한 마법 마을에는 마법을 배우는 작은 마법사가 살고 있었어요. 이 마법사는 지혜로운
        마법사가 되기 위한 훈련을 하고 있었답니다.
        작은 마법사를 도와 어느 가게를 도와줄지 선택해보세요!!`}
          descriptions={[
            {
              image: IMAGE_URLS.investing_game.masic.masic_1,
              label: "마법연구소",
              descriptions: [
                "신기한 마법을 연구하는 신비한 곳이에요.",
                "가끔은 엄청난 마법이 성공해서 놀라운 일이 생기기도 하지만,",
                "실패하면 힘들어질 수도 있어요.",
              ],
            },
            {
              image: IMAGE_URLS.investing_game.masic.masic_2,
              label: "서커스단",
              descriptions: [
                "사람들이 신나게 구경하는 멋진 공연장이에요.",
                "날씨가 좋거나 재미있는 일이 생기면 더 인기가 많아지고,",
                "비가 오거나 바람이 불면 공연이 어려울 수도 있어요.",
              ],
            },
            {
              image: IMAGE_URLS.investing_game.masic.masic_3,
              label: "빵집",
              descriptions: [
                "매일 아침 고소한 냄새가 나는 따뜻한 빵을 만드는 곳이에요.",
                "항상 손님이 많지만, 특별한 일이 생기면 영향을 받을 수도 있어요.",
              ],
            },
          ]}
          gamePlayPath="/investing/game/masic?stage=game-play"
          textColor="#1D79BA"
          stockNameColor="#1D79BA"
          borderColor="#518EB9"
          borderStrokeColor="#374752"
          titleTextColor="white"
          titleStrokeColor="#374752"
          subtitleTextColor="#EDF8FF"
          subtitleStrokeColor="#374752"
          stockButtonBgColor="#1D79BA"
          stockButtonStrokeColor="#1D79BA"
          startButtonBgColor="#374752"
          startButtonStrokeColor="#374752"
          gameType={gameType}
          point={point}
          handleGameOut={handleGameOut}
        />
      );
    default:
      return null;
  }
};
