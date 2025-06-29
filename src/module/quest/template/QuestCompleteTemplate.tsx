import { Background } from "@/components/layout/Background";
import { TextWithStroke } from "@/components/text/TextWithStroke";
import { IMAGE_URLS } from "@/lib/constants/constants";

interface QuestCompleteTemplate {
  onComplete: () => void;
}
export const QuestCompleteTemplate = ({
  onComplete,
}: QuestCompleteTemplate) => {
  return (
    <Background backgroundImage={IMAGE_URLS.quest.quest_complete_bg}>
      <TextWithStroke
        className="absolute left-[11rem] top-[5.5rem]"
        text="퀘스트 완료!"
        textClassName="text-main-yellow-200
                text-[3rem]"
        strokeClassName=" text-main-brown-800 text-[3rem] text-stroke-width-[0.5rem]  text-stroke-color-main-brown-800"
      />
      <div
        onClick={onComplete}
        className="absolute bottom-[1rem] left-[15.5rem] text-main-brown-850 bg-[#ffdc3efe] text-brown-800 font-semibold text-[1rem] px-[1rem] py-[0.3rem] rounded-full shadow-lg border-2 border-main-brown-500 cursor-pointer"
      >
        돌아가기
      </div>
    </Background>
  );
};
