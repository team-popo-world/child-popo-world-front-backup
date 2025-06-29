import { Modal } from "@/components/modal/Modal";
import { IMAGE_URLS } from "@/lib/constants/constants";

interface WriteLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WriteLimitModal = ({ isOpen, onClose }: WriteLimitModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        className="relative bg-white px-[3rem] pt-[3rem] pb-[1.5rem] rounded-2xl text-center shadow-lg border-[0.6rem] border-[#fdbfca]"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-[#5e4632] font-bold text-[1.2rem] ">
          오늘의 일기는 이미 작성했어요!
        </p>
        <button
          className="bg-yellow-300 px-[1rem] py-[0.5rem] rounded-lg shadow mt-[2rem] cursor-pointer"
          onClick={onClose}
        >
          확인
        </button>

        {/* 포포 */}
        <img
          src={IMAGE_URLS.emotionDiary.modal_popo2}
          alt="포포"
          className="absolute w-[8rem] right-[-4rem] bottom-[-1rem]"
        />
      </div>
    </Modal>
  );
};
