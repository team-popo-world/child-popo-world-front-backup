// src/module/investing-game/component/little-pig-component/game-out-modal.tsx
import { IMAGE_URLS } from "@/lib/constants/constants";
import { playButtonSound } from "@/lib/utils/sound";
import ClickSound from "@/assets/sound/button_click.mp3";
import backSound from "@/assets/sound/back_click.mp3";

interface GameOutModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  closeImage?: string;
  sirenImage?: string;
}

export const GameOutModal = ({ onConfirm, onCancel, sirenImage = IMAGE_URLS.investing_game.base.siren_popo, closeImage = IMAGE_URLS.investing_game.base.x_popo }: GameOutModalProps) => {
  return (
    <div className="relative flex flex-col items-start px-11 mb-5 pt-7 pb-5 justify-between w-[24rem] h-[12rem]  bg-main-yellow-200 rounded-2xl border-[0.25rem] border-main-yellow-500">
      <h2 className="text-main-brown-850 text-xl font-bold">게임 종료</h2>
      <span className="text-main-brown-850 text-[0.8rem] font-bold">
        정말 종료하시겠습니까? 게임 할때 투자한 시드머니를 모두 잃습니다. 한번 더 확인해주세요.
      </span>

      {/* 버튼 컨테이너 */}
      <div className="flex gap-x-4 mt-2 self-end">
        <button
          onClick={() => {
            playButtonSound(backSound);
            onConfirm();
          }}
          className="px-4 py-1 bg-main-red-500 text-white rounded-lg text-sm font-bold  "
        >
          나가기
        </button>
        <button
          onClick={() => {
            playButtonSound(ClickSound);
            onCancel();
          }}
          className="px-4 py-1 bg-main-yellow-300 text-main-brown-850 rounded-lg text-sm font-bold  "
        >
          취소
        </button>
      </div>

      <img
        src={closeImage}
        alt="닫기 돼지"
        className="absolute -top-8 -left-5 w-15 "
      />
      <img
        src={sirenImage}
        alt="사이렌 돼지"
        className="absolute -bottom-6 -right-7 w-18"
      />
    </div>
  );
};
