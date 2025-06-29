import { BackArrow } from "@/components/button/BackArrow";
import { Background } from "@/components/layout/Background";
import { emotionList } from "../constants/emotionList";
import SoundButton from "@/components/button/SoundButton";
import { playButtonSound } from "@/lib/utils/sound";
import { AlertModal } from "../components/AlretModal";
import { IMAGE_URLS } from "@/lib/constants/constants";

interface DiaryWriteTemplateProps {
  onBack: () => void;
  onSelectEmotion: (emotion: string) => void;
  onChangeDescription: (desc: string) => void;
  onSubmit: () => void;
  selectedEmotion: string | null;
  isAlertModalOpen: boolean;
  onCloseAlertModal: () => void;
}
export const DiaryWriteTemplate = ({
  onBack,
  onSelectEmotion,
  onChangeDescription,
  onSubmit,
  selectedEmotion,
  isAlertModalOpen,
  onCloseAlertModal,
}: DiaryWriteTemplateProps) => {
  return (
    <Background backgroundImage={IMAGE_URLS.emotionDiary.write_bg}>
      <AlertModal isOpen={isAlertModalOpen} onClose={onCloseAlertModal} />

      {/* 뒤로가기 */}
      <BackArrow onClick={onBack} />
      {/* 음소거 버튼 */}
      <SoundButton />
      {/* 제목 */}
      <div
        aria-label="제목: 오늘의 일기"
        className="flex justify-start items-center mt-[4rem] text-4xl font-bold pl-[5rem] text-[#df782d]"
      >
        오늘의 일기
      </div>

      {/* 감정 목록 */}
      <div
        aria-label="감정 목록"
        className="grid grid-cols-3 mr-[15rem] ml-[4rem] px-[1rem] mt-[1rem] gap-y-[0.3rem]"
      >
        {emotionList.map((emotion) => (
          <div
            key={emotion.server}
            className="flex flex-col justify-center items-center cursor-pointer transition-all duration-200"
            onClick={() => {
              playButtonSound();
              onSelectEmotion(emotion.server)
            }}    
          >
            <img
              src={emotion.url}
              alt="감정 이미지"
              className={`w-[5rem] ${
                selectedEmotion === emotion.server
                  ? "border-[0.2rem] border-[#ffbecff7] rounded-full"
                  : ""
              }`}
            />
            <span className="text-[0.7rem]">{emotion.label}</span>
          </div>
        ))}
      </div>

      {/* 일기 한줄 쓰기 */}
      {/* 안내 텍스트 */}
      <div
        aria-label="일기 쓰기 안내"
        className="text-[0.65rem] mr-[15rem] ml-[4rem] flex justify-center mt-[0.45rem]"
      >
        오늘 기분이 어때? 한 줄로 나타내봐!
      </div>
      {/* 일기 쓰기 */}
      <div
        aria-label="일기 쓰기"
        className="h-[1.8rem] mt-[0.3rem] mr-[15rem] ml-[4rem] flex justify-center items-center"
      >
        <div className="px-[0.6rem] w-[18rem] flex justify-center items-center h-full rounded-2xl border-[0.15rem] border-[#aadf8f] bg-[#ffffffa9]">
          <input
            type="text"
            placeholder="여기에 한 줄 일기를 적어줘!"
            onChange={(e) => onChangeDescription(e.target.value)}
            className="w-full h-full bg-transparent border-none outline-none text-[0.75rem] text-[#5e4632] font-medium placeholder-[#b2b2b2]"
          />
        </div>
      </div>

      <div
        aria-label="완료 버튼"
        className="absolute right-[4.7rem] bottom-[3rem] 
    border-[0.18rem] border-[#719062] 
    bg-[#fff2b0] text-[#698d71] text-[1rem] 
    rounded-3xl px-[1.1rem] py-[0.3rem] cursor-pointer 
    shadow-md "
        onClick={() => {
          playButtonSound();
          onSubmit()
        }}
      >
        기록하기
      </div>

      {/* 포포 ~ */}
      <div aria-label="포포" className="absolute bottom-[5rem] right-[1rem]">
        <img
          src={IMAGE_URLS.emotionDiary.write_popo}
          alt="포포"
          className="w-[13rem]"
        />
      </div>
      {/* 포포 말풍선 */}
      <div
        aria-label="포포 말풍선"
        className="absolute right-[1.5rem] top-[3rem] w-[10rem] "
      >
        <img
          src={IMAGE_URLS.emotionDiary.write_bubble}
          alt="포포 말풍선"
          className="w-full"
        />
        <p className="absolute top-[2rem] left-[2.4rem] text-[0.9rem] text-[#5e4632] font-semibold leading-snug whitespace-pre-line">
          오늘의 기분을{"\n"}기록해보자!
        </p>
      </div>
    </Background>
  );
};
