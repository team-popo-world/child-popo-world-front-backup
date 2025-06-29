import { BackArrow } from "@/components/button/BackArrow";
import { IMAGE_URLS } from "@/lib/constants/constants";
import { PointModal } from "@/components/modal/PointModal";
import { playButtonSound } from "@/lib/utils/sound";
import { Modal } from "@/components/modal/Modal";
import SoundButton from "@/components/button/SoundButton";
import { WEEK, cheeringText, rewardText, type Attendance } from "@/page/attandance";
import clsx from "clsx";
import { SpeechBubble2 } from "@/components/text/SpeechBubble";
import { tutorialAttandance } from "@/lib/constants/tutorial";
import { BottomArrow } from "@/components/icon/BottomArrow";

interface AttandanceTemplateProps {
  consecutive: number;
  isPointModalOpen: boolean;
  handlePointModalClose: () => void;
  rewardPoints: number;
  isWeekCompleted: boolean;
  isAlreadyAttended: boolean;
  setIsAlreadyAttended: (isAttended: boolean) => void;
  handleAttendance: () => void;
  attendance: Attendance[];
  isTutorialCompleted: boolean;
}

export function AttandanceTemplate({
  consecutive,
  isPointModalOpen,
  handlePointModalClose,
  rewardPoints,
  isWeekCompleted,
  isAlreadyAttended,
  setIsAlreadyAttended,
  handleAttendance,
  attendance,
  isTutorialCompleted,
}: AttandanceTemplateProps) {


  return (
    <>
    {/* 튜토리얼중, 포인트모달이 열리지 않았다면 배경 어둡게 */}
    {(!isTutorialCompleted && !isPointModalOpen) && <div className="fixed inset-0 z-50 bg-black/25" />}
    <div className="w-screen h-screen bg-black font-TJ overflow-hidden flex justify-center items-center">
      <div
        className={
          "bg-[#FFF4BF] px-28 relative w-[360px] h-[258px] sm:w-[430px] sm:h-[300px] md:w-[615px] md:h-[430px] xl:w-[1180px] xl:h-[820px] bg-contain bg-center bg-no-repeat"
        }
      >
        {/* 포인트 모달 */}
        <PointModal
          isOpen={isPointModalOpen}
          onClose={handlePointModalClose}
          title={"축하해요!"}
          text={rewardText[isWeekCompleted ? "week" : "day"]}
          price={rewardPoints}
          onConfirm={handlePointModalClose}
        />

        {isAlreadyAttended && (
          <Modal
            isOpen={isAlreadyAttended}
          >
            <div className="relative flex flex-col gap-y-1 justify-center items-center w-[14rem] h-[6rem] bg-[#FFF6D5] border-4 border-[#FEA95E] rounded-2xl shadow-lg">
              <div className="text-lg text-[#6E532C] font-bold text-center">이미 출석했어요!</div>  
              <button className="px-6 py-0.5 text-center rounded-lg bg-[#EE9223] text-white text-base font-bold shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
                onClick={() => {
                  playButtonSound();
                  setIsAlreadyAttended(false);
                }}
              >
                확인
              </button>
            </div>
          </Modal>
        )}

        <BackArrow />
        <SoundButton />
        {/* 왼쪽 제목 */}
        <div className="ml-6 flex flex-col w-fit mb-6">
          <h3 className="mt-20 mb-2 text-[#F48A00] text-2xl font-bold text-center">
            축하해요! 연속성공 <br />
            {consecutive}일을 달성했어요.
          </h3>
          <span className="text-lg text-center font-bold">{cheeringText[consecutive <= 2 ? "start" : consecutive === 7 ? "end" : "middle"]}</span>
        </div>
        {/* 마법사 포포 */}
        <img
          src={IMAGE_URLS.attandance.masic_popo}
          alt="마법사 포포"
          className={clsx("absolute top-10 right-24 w-44 h-44 object-contain", (!isTutorialCompleted && !isPointModalOpen) && "z-200")}
        />
        {/* 튜토리얼 메시지 */}
        {!isTutorialCompleted && !isPointModalOpen && ( 
        <SpeechBubble2
          children={tutorialAttandance["attendance2"].text}
          className="absolute bottom-[16.8rem] right-[13.5rem] z-100"
          flip={true}
        />        
        )}
        {/* 월 화 수 목 금 토 일 */}
        <div className="flex px-8 py-4 gap-x-3 bg-white rounded-2xl">
          {WEEK.map((day) => {
            const isAttended = attendance.find((item) => item.dayOfWeek === day)?.attended;
            return (
              <div className="flex flex-col h-full justify-center items-center" key={day}>
                <div className="text-lg font-bold">{day}</div>
                {isAttended ? (
                  <img
                    src={IMAGE_URLS.attandance.circle_popo}
                    alt="출석 포포"
                    className="w-11 min-h-0 object-contain"
                  />
                ) : (
                  <div className="mt-1 w-7.5 h-7.5 rounded-full border border-gray-200"></div>
                )}
              </div>
            );
          })}
        </div>
        {/* 출석하기 버튼 */}
        <div
          className={clsx("mt-8 mx-auto w-fit py-2 px-10 bg-[#F48A00] text-white text-lg rounded-xl active:scale-95 transition-all duration-100 relative",
             (!isTutorialCompleted && !isPointModalOpen) && "z-[200] shadow-[0_0_20px_rgba(255,255,255,0.5)]")}
          onClick={handleAttendance}
        >
          출석하기
        </div>
        {/* 튜토리얼 버튼 */}
        {(!isTutorialCompleted && !isPointModalOpen) && (
            <BottomArrow size="3rem" color="#F48A00" className="absolute right-1/2 translate-x-1/2 bottom-[5.8rem] z-190 animate-bounce " />
        )}
      </div>
    </div>
    </>

  );
}
