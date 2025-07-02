import { memo } from "react";
import { IMAGE_URLS } from "@/lib/constants/constants";

interface NewsBoxProps {
  title: string;
  hint: string;
  sirenImage?: string;
  newsImage?: string;
} 

export const NewsBox = memo(({ title, 
  sirenImage = IMAGE_URLS.investing_game.base.siren_popo, 
  newsImage = IMAGE_URLS.investing_game.base.news_popo }: NewsBoxProps) => {
  return (
    <div className="relative flex flex-col items-start justify-center gap-y-0.5 w-[29rem] h-[5.5rem] px-7.5 py-1 mb-2 bg-main-yellow-200 rounded-2xl">
      <h2 className="text-main-brown-850 text-lg font-bold overflow-y-auto scrollbar-hidden">{title}</h2>
      {/* <span className="text-main-brown-850 text-[0.8rem] font-bold">{hint}</span> */}
      <img
        src={newsImage}
        alt="돼지 집"
        className="absolute -top-5 -left-4 min-w-0 h-13 object-contain"
      />
      <img
        src={sirenImage}
        alt="돼지 집"
        className="absolute -bottom-3 -right-4 min-w-0 h-14 object-contain"
      />
    </div>
  );
});
