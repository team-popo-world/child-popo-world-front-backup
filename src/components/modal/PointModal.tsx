import { IMAGE_URLS } from "@/lib/constants/constants";
import { Modal } from "@/components/modal/Modal";
import { motion } from "framer-motion";
import Lottie from "react-lottie";
import animationData from '@/components/lottie/Confetti.json';
import { useState } from "react";
  
interface PointModalProps {
  title: string;
  text: string;
  price: number;
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export const PointModal = ({ title, text, price, isOpen, onConfirm, onClose }: PointModalProps) => {
  const [shouldPlayAnimation, setShouldPlayAnimation] = useState(false);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
          onAnimationComplete={() => setShouldPlayAnimation(true)}
          src={IMAGE_URLS.common.point_popo}
          alt="modal_popo"
          className="w-24 h-24 object-contain absolute -bottom-3 -left-8.5 drop-shadow-md z-20"
        />

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center gap-y-1 w-full bg-white/40 p-4 rounded-xl backdrop-blur-sm"
        >
          <h3 className="text-xl text-[#6E532C] font-bold text-center">{title}</h3>
          <div className="text-lg text-[#6E532C] font-bold text-center whitespace-pre-line mb-2">{text}</div>
          <div className="flex items-center gap-x-2 bg-[#FFF6D5] px-4 py-2 rounded-lg">
            <img src={IMAGE_URLS.common.coin} alt="coin" className="w-6 h-6 object-contain animate-bounce" />
            <div className="text-lg text-[#6E532C] font-bold">{price}냥</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full mt-4"
        >
          <button
            onClick={onConfirm}
            className="w-full py-2.5 text-center rounded-lg bg-[#EE9223] text-white text-base font-bold shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 "
          >
            확인
          </button>
        </motion.div>
      </motion.div>
      
      {shouldPlayAnimation && (
        <Lottie
          options={{
            loop: false,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
          }}
          height={"30rem"}
          width={"32rem"}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            zIndex: 10
          }}
          eventListeners={[
            {
              eventName: 'complete',
              callback: () => setShouldPlayAnimation(false)
            }
          ]}
        />
      )}
    </Modal>
  );
};
