import { IMAGE_URLS } from "@/lib/constants/constants";
import { Modal } from "@/components/modal/Modal";
import { motion } from "framer-motion";

interface NoPointModalProps {
  requiredPoint: number;
  currentPoint: number | null;
  isOpen: boolean;
  onClose: () => void;
}

export const NoPointModal = ({ requiredPoint, currentPoint, isOpen, onClose }: NoPointModalProps) => {
  return (
    <Modal isOpen={isOpen}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative flex flex-col items-center w-[22rem] min-h-[16rem] py-6 px-5 bg-gradient-to-b from-[#FFF6D5] to-[#FFE8B5] border-[0.25rem] border-[#FEA95E] rounded-2xl shadow-lg"
      >
        <motion.img
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          src={IMAGE_URLS.common.cry_popo}
          alt="modal_popo"
          className="w-24 h-24 object-contain absolute -bottom-3 -left-8 drop-shadow-md z-10"
        />

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center gap-y-3 w-full bg-white/40 p-4 rounded-xl backdrop-blur-sm"
        >
          <div className="text-lg text-[#6E532C] font-bold text-center">
            포인트가 부족합니다!
          </div>
          <div className="text-sm text-[#6E532C] text-center">
            게임을 시작하려면 더 많은 포인트가 필요해요
          </div>
          
          <div className="flex flex-col gap-y-2 w-full">
            <div className="flex items-center justify-between bg-[#FFF6D5] px-4 py-2 rounded-lg">
              <span className="text-sm text-[#6E532C] font-bold">필요한 포인트:</span>
              <div className="flex items-center gap-x-1">
                <img src={IMAGE_URLS.common.coin} alt="coin" className="w-4 h-4 object-contain" />
                <span className="text-sm text-[#6E532C] font-bold">{requiredPoint}냥</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between bg-[#FFE8B5] px-4 py-2 rounded-lg">
              <span className="text-sm text-[#6E532C] font-bold">보유 포인트:</span>
              <div className="flex items-center gap-x-1">
                <img src={IMAGE_URLS.common.coin} alt="coin" className="w-4 h-4 object-contain" />
                <span className="text-sm text-[#6E532C] font-bold">{currentPoint}냥</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between bg-main-red-600 px-4 py-2 rounded-lg border border-main-red-600">
              <span className="text-sm text-white/90 font-bold">부족한 포인트:</span>
              <div className="flex items-center gap-x-1">
                <img src={IMAGE_URLS.common.coin} alt="coin" className="w-4 h-4 object-contain" />
                <span className="text-sm text-white/90 font-bold">{requiredPoint - (currentPoint || 0)}냥</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full mt-4"
        >
          <button
            onClick={onClose}
            className="w-full py-2.5 text-center rounded-lg bg-[#EE9223] text-white text-base font-bold shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
          >
            닫기
          </button>
        </motion.div>
      </motion.div>
    </Modal>
  );
};
