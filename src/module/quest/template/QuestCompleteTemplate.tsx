import { Background } from "@/components/layout/Background";
import { TextWithStroke } from "@/components/text/TextWithStroke";
import { IMAGE_URLS } from "@/lib/constants/constants";
import { useState } from "react";
import Lottie from "react-lottie";
import animationData from '@/components/lottie/Confetti.json';

interface QuestCompleteTemplate {
  onComplete: () => void;
}

export const QuestCompleteTemplate = ({
  onComplete,
}: QuestCompleteTemplate) => {
  const [shouldPlayAnimation, setShouldPlayAnimation] = useState(true);

  return (
    <Background backgroundImage={IMAGE_URLS.quest.quest_complete_bg}>
      <TextWithStroke
        className="absolute left-[11rem] top-[5.5rem]"
        text="퀘스트 완료!"
        textClassName="text-main-yellow-200
                text-[3rem]"
        strokeClassName=" text-main-brown-800 text-[3rem] text-stroke-width-[0.5rem]  text-stroke-color-main-brown-800"
      />
      
      {shouldPlayAnimation && (
        <Lottie
          options={{
            loop: false,
            autoplay: true,
            animationData,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice",
            },
          }}
          height={"30rem"}
          width={"32rem"}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            zIndex: 10,
          }}
          eventListeners={[
            {
              eventName: "complete",
              callback: () => setShouldPlayAnimation(false),
            },
          ]}
        />
      )}
      
      <div
        onClick={onComplete}
        className="absolute bottom-[1rem] left-[15.5rem] text-main-brown-850 bg-[#ffdc3efe] text-brown-800 font-semibold text-[1rem] px-[1rem] py-[0.3rem] rounded-full shadow-lg border-2 border-main-brown-500 cursor-pointer"
      >
        돌아가기
      </div>
    </Background>
  );
};
