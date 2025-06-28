import { IMAGE_URLS } from "@/lib/constants/constants";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { Background } from "../layout/Background";
import { playButtonSound } from "@/lib/utils/sound";

export const ToRasingLandLoading2 = ({ onAnimationComplete }: { onAnimationComplete: () => void }) => {
    const controls = useAnimation();

    useEffect(() => {
        controls.start({
            rotate: [0, 1, -1, 1, 0],
            y: [0, -1, 0, -1, 0],
            transition: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
            },
            });
    }, [controls]);

    const poniControls = useAnimation();
    useEffect(() => {
        poniControls.start({
        rotate: [0, 1, -1, 1, 0],
        y: [0, -1, 0, -1, 0],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "linear",
        },
        });
    }, [poniControls]);

  return (
    <Background backgroundImage={IMAGE_URLS.common.loading_bg}>
      <div 
      className="absolute top-4 right-4 text-white text-sm font-bold"
      onClick={() => {
        playButtonSound();
        onAnimationComplete()}
      }
      >
        바로가기
      </div>
      {/* 섬 - 좌우 반전된 섬 */}
      <motion.div 
      className="absolute w-40 h-40"
      style={{
        left: "4rem",
        top: "3rem",
        scale: 1.4,
      }}
      animate={controls}
    >
      <motion.img 
        src={IMAGE_URLS.main.raising} 
        alt="raising island" 
        className="w-full h-full object-contain -scale-x-100" // 좌우 반전
      />
    </motion.div>
      {/* 로딩 중인 포니 - 섬 생성 후 오른쪽으로 이동 */}
      <motion.div
        className="absolute w-40 h-40"
        initial={{ 
          left: "2rem", 
          top: "0rem",
          scale: 0.8,
          zIndex: 10
        }}
        animate={{
          x: ["30rem", "9rem"],
          y: ["13rem", "6rem"],
        }}
        transition={{
          duration: 6,
          ease: "linear",
        }}
        onAnimationComplete={() => onAnimationComplete()}
      >
        <motion.img
          src={IMAGE_URLS.main.popo}
          alt="loading poni"
          className="w-full h-full object-contain"
          animate={poniControls}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

     
        
      {/* 로딩 텍스트 */}
      <motion.div
        className="absolute bottom-4 right-6"
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <motion.div
          className="text-white text-xl font-bold"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          로딩 중...
        </motion.div>
      </motion.div>
    </Background>
  );
};
