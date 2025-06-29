import { BackArrow } from "@/components/button/BackArrow";
import { Background } from "../../../components/layout/Background";
import { TextWithStroke } from "@/components/text/TextWithStroke";
import SoundButton  from "@/components/button/SoundButton";
import { IMAGE_URLS } from "@/lib/constants/constants";
interface QuestTemplateProps {
  onClickQuest?: (quest: string) => void;
  onBack?: () => void;
}
export const QuestTemplate = ({ onClickQuest, onBack }: QuestTemplateProps) => {
  return (
    // 배경 이미지
    <Background
      aria-label="퀘스트 맵 화면 배경 이미지"
      backgroundImage={IMAGE_URLS.quest.quest_map_page}
    >
      {/* 뒤로가기 */}
      <BackArrow onClick={onBack} />
      {/* 사운드 */}
      <SoundButton />
      {/* 부모 퀘스트 집 이미지, 일일 퀘스트 시계탑 이미지 및 텍스트 */}
      <img
        src={IMAGE_URLS.quest.quest_map_page_parent}
        alt="부모 퀘스트 이미지"
        className="absolute h-[10rem] left-[0.01rem] top-[5.3rem] "
      />
      <div className="absolute left-[6.8rem] top-[9.7rem]">
        <TextWithStroke
          text="부모"
          textClassName="text-main-yellow-300 text-[0.9rem] "
          strokeClassName="text-main-brown-600 text-[0.9rem] text-stroke-width-[0.3rem] text-stroke-color-main-brown-800"
        />
      </div>
      <img
        src={IMAGE_URLS.quest.quest_map_page_daily}
        alt="일일 퀘스트 이미지"
        className="absolute h-[15rem] right-[0.7rem] top-[0.1rem] cursor-pointer "
      />
      <div className="absolute xl:left-[33.5rem] top-[9.6rem] md:left-[33.2rem] sm:left-[33.1rem]">
        <TextWithStroke
          text="일일"
          textClassName="text-main-yellow-300 text-[0.9rem] "
          strokeClassName="text-main-brown-600 text-[0.9rem] text-stroke-width-[0.3rem] text-stroke-color-main-brown-800"
        />
      </div>

      {/* 포니 */}
      <img
        src={IMAGE_URLS.quest.quest_map_parents_popo}
        alt="부모퀘스트 포니"
        className="absolute h-29 left-[3rem] top-[10rem]"
      />
      <img
        src={IMAGE_URLS.quest.quest_map_daily_poni}
        alt="일일퀘스트 포니"
        className="absolute h-22 right-[3.8rem] top-[11rem]"
      />

      <img
        src={IMAGE_URLS.quest.quest_map_daily_poni_parent}
        alt="고민하는 포니"
        className="absolute h-[10rem] left-[14.5rem] xl:top-[16.97rem] md:top-[16.8rem] sm:top-[16.8rem]"
      />
      {/* 제목 - 퀘스트 */}
      <img
        src={IMAGE_URLS.quest.quest_map_title}
        alt="제목 표지판"
        className="h-55 absolute top-[-2.7rem] left-[12.5rem]"
      />
      <TextWithStroke
        text="퀘스트"
        className="absolute left-[15.9rem] top-[1.6rem]"
        textClassName="text-main-yellow-350 text-[2.5rem] "
        strokeClassName="text-main-brown-700 text-[2.5rem] text-stroke-width-[0.4rem] text-stroke-color-main-brown-800"
      />

      {/* 표지판 속 텍스트 */}
      {/* 부모 퀘스트 */}
      <TextWithStroke
        text="부모"
        className="absolute left-[8.27rem] top-[12.8rem] "
        textClassName="text-main-yellow-300 text-[1.5rem] "
        strokeClassName="text-main-brown-600 text-[1.5rem] text-stroke-width-[0.3rem] text-stroke-color-main-brown-800"
      />
      <TextWithStroke
        text="퀘스트"
        className="absolute left-[4.677rem] top-[14.35rem]"
        textClassName="text-main-yellow-300 text-[1.5rem] "
        strokeClassName="text-main-brown-600 text-[1.5rem] text-stroke-width-[0.3rem] text-stroke-color-main-brown-800"
      />
      {/* 일일 퀘스트 */}
      <TextWithStroke
        text="일일"
        className="absolute left-[8rem] top-[12.8rem] md:left-[7.8rem] sm:left-[7.7rem] "
        textClassName="text-main-yellow-300 text-[1.5rem] "
        strokeClassName="text-main-brown-600 text-[1.5rem] text-stroke-width-[0.3rem] text-stroke-color-main-brown-800"
      />
      <TextWithStroke
        text="퀘스트"
        className="absolute left-[4.5rem] top-[14.35rem] md:left-[4.3rem] sm:left-[4.2rem]"
        textClassName="text-main-yellow-300 text-[1.5rem] "
        strokeClassName="text-main-brown-600 text-[1.5rem] text-stroke-width-[0.3rem] text-stroke-color-main-brown-800"
      />

      {/* 말풍선 */}
      <img
        src={IMAGE_URLS.quest.quest_map_daily_poni_parent_2}
        alt="일일퀘스트 말풍선"
        className="h-15.5 absolute left-[23.35rem] top-[8.4rem]"
      />
      <div className="absolute left-[24.42rem] top-[9.5rem] text-[0.8rem] text-[#8C5311]">
        오늘의 퀘스트를
      </div>
      <div className="absolute left-[25.7rem] top-[10.45rem] text-[0.8rem] text-[#8C5311]">
        확인해봐!
      </div>
      <img
        src={IMAGE_URLS.quest.quest_map_daily_poni_parent_3}
        alt="부모퀘스트 말풍선"
        className="h-14 absolute left-[9.8rem] top-[8.8rem]"
      />
      <div className="absolute left-[11.5rem] top-[9.6rem] text-[0.8rem] text-[#8C5311]">
        부모님이 준비한
      </div>
      <div className="absolute left-[11rem] top-[10.5rem] text-[0.8rem] text-[#8C5311]">
        퀘스트를 확인해봐!
      </div>

      {/* 퀘스트 클릭 포지션 */}
      <div
        aria-label="부모 퀘스트 클릭"
        className="absolute w-[20rem] h-[15rem] left-[0rem] top-[6rem] cursor-pointer"
        onClick={() => onClickQuest?.("parent")}
      ></div>
      <div
        aria-label="일일 퀘스트 클릭"
        className="absolute  w-[18.5rem] h-[15rem] right-[0rem] top-[6rem] cursor-pointer"
        onClick={() => onClickQuest?.("daily")}
      ></div>
    </Background>
  );
};
