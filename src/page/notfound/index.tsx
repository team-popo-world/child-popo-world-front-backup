import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IMAGE_URLS } from "@/lib/constants/constants";
import { Background } from "@/components/layout/Background";

export const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, []);


  // 그냥 대충 그려보긴함
  return (
    <Background backgroundImage={IMAGE_URLS.common.loading_bg}>
      <div className="w-40 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <motion.img
          src={IMAGE_URLS.main.popo}
          alt="loading poni"
          animate={{
            rotate: [0, 3, -3, 3, 0],
            y: [0, -3, 0, -3, 0],
          }}
          transition={{
            duration: 4,
            repeat: 0,
            ease: "easeInOut",
          }}
        />
        <div className="mt-4 text-white text-xl font-bold drop-shadow whitespace-nowrap">
          존재하지 않는 페이지입니다
        </div>
      </div>
      <Link to="/" className="absolute top-4 right-4 text-white text-sm font-bold drop-shadow whitespace-nowrap">
          메인으로 이동
      </Link>
    </Background>
  );
};