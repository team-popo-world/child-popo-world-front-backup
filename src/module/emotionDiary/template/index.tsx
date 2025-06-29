import { Background } from "@/components/layout/Background";
import { DiaryCard } from "../components/DiaryCard";
import { BackArrow } from "@/components/button/BackArrow";
import type { Diary } from "../types/diary";
import { WriteLimitModal } from "../components/writeLimitModal";
import SoundButton from "@/components/button/SoundButton";
import { IMAGE_URLS } from "@/lib/constants/constants";

interface EmotionDiaryTemplateProps {
  onClickWrite: () => void;
  onBack: () => void;
  diaryData: Diary[];
  isModalOpen: boolean;
  onCloseModal: () => void;
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export const EmotionDiaryTemplate = ({
  onClickWrite,
  onBack,
  diaryData,
  isModalOpen,
  onCloseModal,
  currentDate,
  onNextMonth,
  onPrevMonth,
}: EmotionDiaryTemplateProps) => {
  const formatMonth = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return `${year}년 ${month}월`;
  };

  const isCurrentMonth = (date: Date) => {
    const now = new Date();
    return (
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth()
    );
  };

  console.log(diaryData);
  return (
    <Background backgroundImage={IMAGE_URLS.emotionDiary.bg}>
      {/* 뒤로가기 */}
      <BackArrow onClick={onBack} />
      {/* 음소거 버튼 */}
      <SoundButton />

      {/* 제목 */}
      <div
        aria-label="제목: 감정일기"
        className="flex justify-center items-center mt-[3.2rem] text-4xl font-bold text-[#df782d]"
      >
        감정일기
      </div>

      {/* 달력 버튼 */}
      <div className="flex justify-center items-center gap-[0.25rem] mt-[0.5rem]">
        {/* 왼쪽 화살표 버튼 */}
        <img
          src={IMAGE_URLS.emotionDiary.left_arrow}
          alt="왼쪽 화살표"
          className="h-[0.8rem] scale-x-[-1] cursor-pointer "
          onClick={onPrevMonth}
        />
        {/* 월 표시 */}
        <div
          aria-label="달력 버튼"
          className="flex items-center justify-center px-[1rem] py-[0.15rem] 
             bg-[#93d088] text-[#fffde7] text-[0.7rem]  rounded-full min-w-[6rem]
             shadow-md cursor-pointer"
        >
          {formatMonth(currentDate)}
        </div>
        {/* 오른쪽 화살표 버튼 */}
        <img
  src={IMAGE_URLS.emotionDiary.right_arrow}
  alt="오른쪽 화살표"
  className={`h-[0.8rem] cursor-pointer ${
    isCurrentMonth(currentDate) ? "invisible pointer-events-none" : ""
    }`}
          onClick={onNextMonth}
/>

      </div>

      {/* 일기 리스트 */}
      <div className="flex justify-center items-center ml-[1rem] mt-[0.8rem] h-[12rem] px-[1rem] scrollbar-hidden">
        <div className=" flex flex-col gap-[0.4rem] w-[27rem]  items-center overflow-scroll h-full px-[0.8rem] scrollbar-hidden">
          {diaryData.length === 0 ? (
            <div className="flex justify-center items-center  bg-[#fffaf3ca] border border-[#f8e1b8] rounded-2xl py-[0.8rem] shadow-xs w-full h-[11.6rem] text-[#6a4d45b1] text-sm">작성된 일기가 없어요!</div>
          ): (diaryData.map((diary, index) => (
            <DiaryCard
              key={diary.emotionDiaryId}
              diary={diary}
              order={index + 1}
            />
          )))}
        </div>
      </div>

      {/* 일기 작성 버튼 */}
      <div className="flex justify-center items-center mt-[0.6rem] ">
        <div
          aria-label="오늘의 일기 쓰기"
          className="w-[8rem] px-[1rem] py-[0.4rem] 
             bg-[#93d088] text-[#fffde7] text-[0.85rem] font-semibold rounded-full 
             shadow-md cursor-pointer active:scale-95 transition-all duration-100"
          onClick={onClickWrite}
        >
          오늘의 일기 쓰기
        </div>
      </div>

      {/* 작성 제한 모달 */}
      {isModalOpen && (
        <WriteLimitModal isOpen={isModalOpen} onClose={onCloseModal} />
      )}
    </Background>
  );
};
