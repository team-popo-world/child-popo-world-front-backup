import { useNavigate } from "react-router-dom";
import { IMAGE_URLS } from "@/lib/constants/constants";
import { clsx } from "clsx";
import backSound from "@/assets/sound/back_click.mp3";
import { playButtonSound } from "@/lib/utils/sound";

interface BackArrowProps {
  onClick?: () => void;
  className?: string;
  color?: "black" | "white" | "gray";
}

export const BackArrow = ({ onClick, className, color = "gray" }: BackArrowProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };
  const navigate = useNavigate();
  const getBackArrowImage = () => {
    if (color === "black") return IMAGE_URLS.common.back_arrow_black;
    if (color === "white") return IMAGE_URLS.common.back_arrow_white;
    if (color === "gray") return IMAGE_URLS.common.back_arrow_gray;

    return IMAGE_URLS.common.back_arrow_gray;
  };
  return (
    <img
      src={getBackArrowImage()}
      alt="backArrow"
      className={clsx(
        className
          ? className
          : "z-10 absolute top-3 left-3 w-8 h-8 object-contain active:scale-95 transition-all duration-100"
      )}
      onClick={() => {
        playButtonSound(backSound, 0.3);
        handleClick();
      }}
    />
  );
};
