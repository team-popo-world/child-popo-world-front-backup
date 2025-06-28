// src/module/investing-game/component/little-pig-component/game-out-modal.tsx
import { IMAGE_URLS } from "@/lib/constants/constants";
import { playButtonSound } from "@/lib/utils/sound";
import backSound from "@/assets/sound/back_click.mp3";
import { TextWithStroke } from "@/components/text/TextWithStroke";
interface GameStartModalProps {
  point: number | null;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  sirenImage?: string;
  newsImage?: string;
}

  export const GameStartModal = ({ point, title, onConfirm, onCancel, newsImage=IMAGE_URLS.investing_game.base.news_popo, sirenImage = IMAGE_URLS.investing_game.base.siren_popo }: GameStartModalProps) => {
    const getGameName = (title: string) => {
      switch (title) {
        case "아기돼지 삼형제": {
          return <TextWithStroke
          className="mx-1"
          text="아기돼지 삼형제"
          textClassName="text-main-yellow-150 text-[1rem]"
          strokeClassName="text-investing-orange-100 text-[1rem] text-stroke-width-[0.3rem] text-stroke-color-main-brown-800"
        />
        }
        case "푸드트럭 왕국": {
          return <TextWithStroke
          className="mx-1"
          text="푸드트럭 왕국"
          textClassName="text-main-yellow-150 text-[1rem]"
          strokeClassName="text-investing-yellow-100 text-[1rem] text-stroke-width-[0.3rem] text-stroke-color-main-brown-800"
        />
        }      
        case "마법 왕국": {
          return <TextWithStroke
          className="mx-1"
          text="마법 왕국"
          textClassName="text-main-yellow-150 text-[1rem]"
          strokeClassName="text-investing-purple-100 text-[1rem] text-stroke-width-[0.3rem] text-stroke-color-main-brown-800"
        />
        }        
        case "달빛 도둑": {
          return <TextWithStroke
          className="mx-1"
          text="달빛 도둑"
          textClassName="text-main-yellow-150 text-[1rem]"
          strokeClassName="text-investing-blue-100 text-[1rem] text-stroke-width-[0.3rem] text-stroke-color-main-brown-800"
        />
        }    
      }
    }
  return (
    <div className="relative flex flex-col items-start px-11 mb-5 pt-7 pb-5 justify-between w-[23rem] h-[11rem]  bg-main-yellow-200 rounded-2xl border-2 lg:border-5 border-main-yellow-500">
      <h2 className="text-main-brown-850 text-xl font-bold">게임시작</h2>
      <span className="text-main-brown-850 text-sm font-bold">
        <span className="text-base text-main-red-500">{point}냥</span> 
        을 내고 
        {getGameName(title)}
        {/* <span className="text-base text-main-red-500">{title}</span>  */}
        을 시작합니다. 
      </span>

      {/* 버튼 컨테이너 */}
      <div className="flex gap-x-2 mt-2 self-end">
        <button
          onClick={() => {
            playButtonSound();
            onConfirm();
          }}
          className="px-4 py-1 bg-main-red-500 text-white rounded-lg text-sm font-bold  "
        >
          확인
        </button>
        <button
          onClick={() => {
            playButtonSound(backSound);
            onCancel();
          }}
          className="px-4 py-1 bg-main-yellow-300 text-main-brown-850 rounded-lg text-sm font-bold  "
        >
          취소
        </button>
      </div>


      <img
        src={newsImage}
        alt="뉴스 돼지"
        className="absolute -top-4 -left-5 min-w-0 h-17 object-contain"
      />
      <img
        src={sirenImage}
        alt="게임 시작"
        className="absolute -bottom-6 -right-6 min-w-0 h-18 object-contain"
      />
    </div>
  );
};
