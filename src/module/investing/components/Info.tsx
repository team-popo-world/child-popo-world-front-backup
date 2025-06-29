import { TextWithStroke } from "@/components/text/TextWithStroke";
import clsx from "clsx";

interface InfoProps {
  price: string;
  className: string;
  style?: React.CSSProperties;
}

export const Info = ({ price, style, className }: InfoProps) => {
  return (
    <div
      className={clsx(
        "flex justify-center items-center absolute rounded-4xl max-w-fit  bg-[#ffffff80]",
        className
      )}
      style={style}
    >
      <img
        src="https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1748951657/common_coin_oii3sa"
        alt="코인"
        className="h-6"
      />
      <TextWithStroke
        className="ml-1 mr-2"
        text={price}
        textClassName="text-main-yellow-800 text-[0.9rem] "
        strokeClassName="text-main-brown-800 text-[0.9rem] text-stroke-width-[0.15rem] text-stroke-color-main-brown-800"
      />
    </div>
  );
};
