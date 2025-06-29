import { IMAGE_URLS } from "@/lib/constants/constants";

interface SpeechBubbleProps {
  children: React.ReactNode;
  className?: string;
  flip?: boolean;
}

export const SpeechBubble = ({ className = "", children}: SpeechBubbleProps) => {
  return (
    <div className={` ${className}`}>
      <div className="relative">
        {/* 말풍선 본체 */}
        <div className="flex flex-col-reverse text-sm bg-white rounded-xl px-4 py-2 w-[13.5rem] ">
          {children}
        </div>
        {/* 화살표 */}
        <div
          className={`absolute -bottom-2 left-1/2 -translate-x-1/2 border-t-white border-t-30 border-x-transparent border-x-30 border-b-0`}
        />
      </div>
    </div>
  );
};

export const SpeechBubble2 = ({ className = "", children, flip = false }: SpeechBubbleProps) => {
  return (
    <div className={` ${className} `}>
      <div className="relative">
        {/* 말풍선 본체 */}
        <div className="flex text-sm rounded-xl px-4 py-2 w-[13.5rem] relative">
          <img src={IMAGE_URLS.common.speech_bubble_2} alt="speech_bubble" className={`w-full  ${flip ? 'scale-x-[-1] rotate-[-11deg]' : 'rotate-3'}`} />
          <div className="absolute top-0 left-0 w-full h-full text-sm">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};