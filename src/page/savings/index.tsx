import { Background } from "../../components/layout/Background";

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BackArrow } from "../../components/button/BackArrow";
import { ko, pl } from "date-fns/locale";
import { addDays, isAfter as _isAfter, isSameDay as _isSameDay } from "date-fns";
import { useAuthStore } from "@/lib/zustand/authStore";
import { IMAGE_URLS } from "@/lib/constants/constants";
import { playButtonSound, playSound, setNewAudio, stopBackgroundMusic } from "@/lib/utils/sound";
import { useSoundStore } from "@/lib/zustand/soundStore";
import SavingsBackgroundMusic from "@/assets/sound/saving.mp3";
import SoundButton from "@/components/button/SoundButton";
import backClickSound from "@/assets/sound/back_click.mp3";
import NameAndPoint from "@/components/user/NameAndPoint";
import SavingsTTS from "@/assets/sound/tutorial/savings_tts_“차곡차곡~ 저축 섬 도착! 오늘도 모아볼까_”_2025-06-27.wav"

const IS_TEST_MODE = false;

// 상수 선언
const MAX_DEPOSIT_RATE = 0.2; // 20%
const BONUS_RATE = 0.1; // 10%

import { createSavingsAccount, getSavingsAccount, depositToSavings } from "@/lib/api/savings/savings";

export default function SavingsPage() {
  const navigate = useNavigate();
  const { isMuted, audio } = useSoundStore();
  const { point, setPoint, email } = useAuthStore();

  // 저장소 키 생성 함수
  const getSavingsKey = (date: string) => {
    if (!email) return null;
    return `savings_deposit_${email}_${date}`;
  };

  // 오늘의 저장소 키 가져오기
  const getTodayKey = () => {
    const now = new Date();
    const korDate = new Date(now.getTime() + (9 * 60 * 60 * 1000));
    const today = korDate.toISOString().slice(0, 10);
    return getSavingsKey(today);
  };

  // 첫페이지 로드시 배경음악 설정
  useEffect(() => {
    setNewAudio(SavingsBackgroundMusic, 1);
    playSound(SavingsTTS, 1);
  }, []);

  // 음소거 상태 변경시 배경음악 정지 또는 재생
  useEffect(() => {
    if (isMuted && audio) stopBackgroundMusic();
    if (isMuted && !audio) return;

    if (audio && !isMuted) {
      audio.play();
    }
  }, [isMuted, audio]);
  
  // ========== 상태 관리 변수들 ==========

  // 날짜 관련 상태
  const [startDate, setStartDate] = useState<Date | null>(null); // 저축 시작 날짜
  const [endDate, setEndDate] = useState<Date | null>(null); // 저축 종료 날짜
  const [openPicker, setOpenPicker] = useState<"start" | "end" | null>(null); // 현재 열린 날짜 선택기

  // 금액 관련 상태
  const [currentAmount, setCurrentAmount] = useState<string>(""); // 현재 저축된 금액
  const [goalAmount, setGoalAmount] = useState<string>(""); // 목표 저축 금액
  const [bonusAmount, setBonusAmount] = useState<string>(""); // 보너스 금액 상태 추가
  const [_createMessage, setCreateMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 입력 모달 관련 상태
  const [openInput, setOpenInput] = useState<"goal" | null>(null); // 현재 열린 입력 모달 타입
  const [inputValue, setInputValue] = useState<string>(""); // 입력 모달의 임시 입력값

  // 날짜 선택기 참조
  const startPickerRef = useRef<any>(null);
  const endPickerRef = useRef<any>(null);

  // 저축 통장 상태 관리
  const [isCreated, setIsCreated] = useState(false); // 저축 통장 개설 여부

  // 입금 모달 관련 상태
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false); // 입금 모달 열림 상태
  const [depositInput, setDepositInput] = useState(""); // 입금 모달의 입력값
  const [depositError, setDepositError] = useState(""); // 입금 에러 메시지
  const [hasDepositedToday, setHasDepositedToday] = useState(false); // 오늘 입금 여부

  // 보상 및 결과 모달 관련 상태
  const [isBonusModalOpen, setIsBonusModalOpen] = useState(false); // 목표 달성 보너스 모달
  const [isDepositResultModalOpen, setIsDepositResultModalOpen] = useState(false); // 입금 결과 모달
  const [lastDepositAmount, setLastDepositAmount] = useState(""); // 마지막 입금 금액 (결과 모달에서 표시용)

  // 오늘 날짜 구하기
  const today = new Date();

  // ===== 유틸 함수 =====
  const resetSavingsAccount = () => {
    setIsCreated(false);
    setCurrentAmount("");
    setGoalAmount("");
    setStartDate(null);
    setEndDate(null);
    setBonusAmount("");
    setDepositInput("");
    setDepositError("");
    setOpenInput(null);
    setInputValue("");
    // 오늘 날짜의 입금 기록 삭제
    const todayKey = getTodayKey();
    if (todayKey) {
      localStorage.removeItem(todayKey);
      setHasDepositedToday(false);
    }
  };

  // ========== 이벤트 핸들러 함수들 ==========

  /**
   * 오버레이 클릭 시 열린 모달들을 닫는 함수
   */
  const handleOverlayClick = () => {
    setOpenPicker(null); // 날짜 선택기 닫기
    setOpenInput(null); // 입력 모달 닫기
  };

  /**
   * 금액 입력 모달을 여는 함수
   * @param type - 입력할 금액의 타입 (현재금액/목표금액/입금금액)
   */
  const handleOpenInput = (type: "goal") => {
    setOpenInput(type);
    setInputValue(goalAmount);
  };

  /**
   * 입력 모달에서 입력한 값을 저장하는 함수
   */
  const handleSaveInput = () => {
    if (openInput === "goal") {
      setGoalAmount(inputValue);
      const bonus = Math.floor(Number(inputValue) * BONUS_RATE);
      setBonusAmount(bonus ? String(bonus) : "");
    }
    setOpenInput(null);
  };

  // 컴포넌트 마운트 시 오늘 입금 여부 확인
  useEffect(() => {
    if (isCreated) {
      const todayKey = getTodayKey();
      if (todayKey) {
        setHasDepositedToday(!!localStorage.getItem(todayKey));
      }
    }
  }, [isCreated, email]);

  /**
   * 입금하기 버튼 클릭 시 입금 모달을 여는 함수
   */
  const handleDepositClick = () => {
    setDepositInput("");
    setDepositError("");
    const todayKey = getTodayKey();
    if (todayKey) {
      setHasDepositedToday(!!localStorage.getItem(todayKey));
    }
    setIsDepositModalOpen(true);
  };

    // 입금 금액 입력 시 20% 초과 및 목표금액 초과, 보유포인트 초과 체크
  const handleDepositInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDepositInput(value);
    setDepositError("");

    // 음수나 0 체크
    if (Number(value) <= 0) {
      setDepositError("0보다 큰 금액을 입력해주세요.");
      return;
    }

    // 보유 포인트 체크
    if (point !== null && Number(value) > point) {
      setDepositError("보유 포인트가 부족합니다.");
      return;
    }

    if (goalAmount) {
      const maxDeposit = Math.floor(Number(goalAmount) * MAX_DEPOSIT_RATE);
      const remainToGoal = Number(goalAmount) - Number(currentAmount);
      const maxDepositDisplay = Math.min(maxDeposit, remainToGoal);
      if (Number(value) > maxDepositDisplay) {
        setDepositError(`최대 입금 가능 금액은 ${maxDepositDisplay}냥입니다.`);
        return;
      }
      if (Number(currentAmount) + Number(value) > Number(goalAmount)) {
        setDepositError("입금 후 현재 금액이 목표 저축 금액을 초과할 수 없습니다.");
        return;
      }
    }
  };

  /**
   * 입금 모달에서 입금을 확정하는 함수
   */
  const handleDepositConfirm = async () => {
    if (!email) {
      setDepositError("로그인이 필요합니다.");
      return;
    }

    if (!IS_TEST_MODE && hasDepositedToday) {
      setDepositError("오늘은 이미 입금하셨습니다.");
      return;
    }

    // 보유 포인트 체크
    if (point !== null && Number(depositInput) > point) {
      setDepositError("보유 포인트가 부족합니다.");
      return;
    }

    if (goalAmount) {
      const maxDeposit = Math.floor(Number(goalAmount) * MAX_DEPOSIT_RATE);
      const remainToGoal = Number(goalAmount) - Number(currentAmount);
      const maxDepositDisplay = Math.min(maxDeposit, remainToGoal);
      if (Number(depositInput) > maxDepositDisplay) {
        setDepositError(`최대 입금 가능 금액은 ${maxDepositDisplay}냥입니다.`);
        return;
      }
      if (Number(currentAmount) + Number(depositInput) > Number(goalAmount)) {
        setDepositError("입금 후 현재 금액이 목표 저축 금액을 초과할 수 없습니다.");
        return;
      }
    }

    try {
      // 서버에 입금 요청
      const data = await depositToSavings({
        depositPoint: Number(depositInput),
        success: Number(currentAmount) + Number(depositInput) >= Number(goalAmount),
      });
      // 서버 응답값으로 상태 갱신
      setCurrentAmount(String(data.accountPoint));
      // 총 포인트에서 입금액 차감
      if (point !== null) {
        setPoint(point - Number(depositInput));
      }
      setIsDepositModalOpen(false);
      setLastDepositAmount(depositInput);
      setIsDepositResultModalOpen(true);

      // 오늘 날짜의 입금 기록 저장
      const todayKey = getTodayKey();
      if (todayKey) {
        localStorage.setItem(todayKey, "1");
        setHasDepositedToday(true);
      }

      // 목표 달성 시 보너스 모달 및 포인트 추가
      if (Number(currentAmount) + Number(depositInput) >= Number(goalAmount)) {
        setIsBonusModalOpen(true);
        // 저축 금액과 보너스를 총 포인트에 추가
        if (point !== null) {
          const totalSavings = Number(goalAmount);
          const bonusPoints = Number(bonusAmount);
          setPoint(point + totalSavings + bonusPoints);
        }
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.currentPoint) {
        setDepositError(error.response.data.currentPoint);
      } else {
        setDepositError("입금 중 오류가 발생했습니다.");
      }
    }
  };

  // 페이지 진입 시 만기 체크 및 상태 초기화(목표달성은 관여X)
  useEffect(() => {
    if (isCreated && endDate) {
      const now = new Date();
      const end = new Date(endDate);
    
      if (now >= end) {
        // 목표 달성 시 보너스 지급 등은 서버에서 처리
        resetSavingsAccount();
      }
    }
  }, [isCreated, endDate, goalAmount, currentAmount, bonusAmount]);

  const handleCreateAccount = async () => {
    if (!goalAmount || !startDate || !endDate || !bonusAmount) {
      setCreateMessage("모든 값을 입력해 주세요.");
      return;
    }
    setIsLoading(true);
    setCreateMessage("");
    // 날짜를 "YYYY-MM-DD" 문자열로 변환
    const start = startDate instanceof Date ? startDate.toISOString().slice(0, 10) : String(startDate);
    const end = endDate instanceof Date ? endDate.toISOString().slice(0, 10) : String(endDate);

    const result = await createSavingsAccount({
      goalAmount: Number(goalAmount),
      createdAt: start,
      endDate: end,
      rewardPoint: Number(bonusAmount)
    });
    setIsLoading(false);
    setCreateMessage(result.message);
    if (result.success) {
      setCurrentAmount("0");
      setIsCreated(true);
    }
  };

  // 계좌 정보 불러오는 함수 추가
  async function fetchAccountInfo() {
    const data = await getSavingsAccount();
    // status가 ACTIVE이고, createdDate 등 주요 필드가 null이 아니면 활성화된 계좌로 간주
    if (data && data.status === "ACTIVE" && data.createdDate && data.endDate) {
      setIsCreated(true);
      setGoalAmount(String(data.goalAmount));
      setCurrentAmount(String(data.accountPoint)); // accountPoint가 현재 저축통장 금액
      setStartDate(data.createdDate ? new Date(data.createdDate) : null);
      setEndDate(data.endDate ? new Date(data.endDate) : null);
      setBonusAmount(""); // 필요시 보너스 금액 세팅
    } else {
      setIsCreated(false);
      setGoalAmount("");
      setCurrentAmount("");
      setStartDate(null);
      setEndDate(null);
      setBonusAmount("");
    }
  }

  // 페이지 진입 시 계좌 정보 조회
  useEffect(() => {
    fetchAccountInfo();
  }, []);

  return (
    <>
      {/* 숫자 입력 필드의 스핀 버튼 제거를 위한 CSS */}
      <style>
        {`
        /* 달력 전체 배경색 */
        .react-datepicker {
        
          background: #FFF6D1 !important;
          font-family: 'TJJoyofsinging';
          border: 8px solid #BBA14F;
          border-radius: 1.2rem !important;
          overflow: hidden;
        }
        /* 달력 헤더(월/연도) 폰트, 색상 */
        .react-datepicker__current-month {
          font-size: 1.2rem;
          font-weight: bold;
          color: #6F4223;
          font-family: inherit;
        }
        .react-datepicker__header {
          // padding: 1rem 2rem 0.5rem 2rem;
          min-height: 0.1rem;
          height: auto;
          box-sizing: border-box;
          padding-top: 1rem;
        }
        /* 요일(일~토) 폰트, 색상 */
        .react-datepicker__day-name {
          color: #BBA14F;
          font-weight: bold;
          font-size: 1rem;
          font-family: inherit;
          margin: 0.6rem;          
        }
        /* 날짜(숫자) 폰트, 색상 */
        .react-datepicker__day {
          color: #573924;
          font-size: 1.1rem;
          font-family: inherit;
          margin: 0.6rem;
        }
        /* 오늘 날짜 배경 */
        .react-datepicker__day--today {
          background: #FDF0B7;
          color: #573924;
        }
        /* 선택된 날짜 배경 */
        .react-datepicker__day--selected, .react-datepicker__day--keyboard-selected {
          background: #78CA7F !important;
          color: #fff !important;
        }
        /* 날짜 hover 효과 (선택 가능한 날짜만) */
        .react-datepicker__day:not([aria-disabled=true]):hover {
          border-radius: 0.3rem;
          background-color: #BBA14F;
        }
        /* 네비게이션(화살표) 색상 */
        .react-datepicker__navigation-icon::before {
          border-color: #6F4223 !important;
          border-width: 0.28rem 0.28rem 0 0 !important;
          width: 0.7rem;
          height: 0.7rem;
        }
        .react-datepicker__navigation-icon {
          width: 0.7rem;   /* 원하는 크기로 조절 */
          height: 0.9rem;
        }
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
        .react-datepicker__navigation {
          top: 1rem !important;  /* 기본값보다 더 아래로 */
          padding: 0rem 1.5rem
        }
        
        .react-datepicker__day,
        .react-datepicker__day--selected,
        .react-datepicker__day--keyboard-selected,
        .react-datepicker__day--today {
          border-radius: 50% !important;
        }

        .react-datepicker__day--outside-month {
          opacity: 0.4 !important; /* 투명도 조정, 필요시 값 변경 */
        }

        .react-datepicker__day--disabled {
          color: #ccc;
          opacity: 0.5;
          cursor: not-allowed;
        }

        @media (max-width: 430px) {
          .react-datepicker__navigation {
            top: -0.3rem !important;
          }
          .react-datepicker {
            border: 4px solid #BBA14F;
            border-radius: 1.2rem !important;
          }
        }
        
        @media (min-width: 431px) and (max-width: 615px) {
          .react-datepicker__navigation {
            top: -0.1rem !important;
          }
          .react-datepicker {
            border: 4px solid #BBA14F;
            border-radius: 1.2rem !important;
          }
        }
                  
        @media (min-width: 616px) and (max-width: 1179px) {
          .react-datepicker__navigation {
            top: 0.5rem !important;
          }
          .react-datepicker {
            border: 6px solid #BBA14F;
            border-radius: 1.2rem !important;
          }
        }
      
}
        
      `}
      </style>

      {/* 메인 컨테이너 */}
      <Background backgroundImage={IMAGE_URLS.savings.bg}>
        {/* 뒤로가기 - 무조건 홈으로 이동 */}
        <BackArrow onClick={() => {
          playButtonSound(backClickSound, 0.3);
          navigate("/");
        }} />
        {/* 음소거 버튼 */}
        <SoundButton /> 
        {/* 오른쪽 상단 총 금액 표시 (실제 포인트) */}
        <NameAndPoint />
        {/* 페이지 제목 */}
        <div className="w-full flex flex-col items-center mt-8">
          <h1 className="text-[2.3rem] font-extrabold text-white mb-2 text-center">
            반짝반짝 <br />
            포포의 저축 통장
          </h1>
        </div>

        {/* 메인 콘텐츠 영역 */}
        <div className="flex flex-row justify-between items-end w-full mx-auto mt-3">
          {/* 저축 정보 카드 */}
          <div className="bg-[#FFF6D1] rounded-[3rem] ml-10 pl-9 pr-4 py-6 w-90">
            {/* 저축 통장이 개설되지 않은 경우 - 초기 설정 화면 */}
            {!isCreated ? (
              <>
                <div className="grid grid-cols-2 gap-x-1 gap-y-6">
                  {/* 시작 날짜 입력 */}
                  <div>
                    <div className="font-bold text-lg text-[#BBA14F]">시작 날짜</div>
                    <div
                      onClick={() => {
                        playButtonSound();
                        setOpenPicker("start");
                      }}
                      className="font-bold text-lg text-[#6F4223] bg-transparent outline-none cursor-pointer flex items-center h-8"
                    >
                      {startDate
                        ? new Date(startDate).toLocaleDateString("ko-KR", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          }) + ""
                        : "날짜 선택"}
                    </div>
                  </div>

                  {/* 종료 날짜 입력 */}
                  <div>
                    <div className="font-bold text-lg text-[#BBA14F]">종료 날짜</div>
                    <div
                      onClick={() => {
                        playButtonSound();
                        setOpenPicker("end");
                      }}
                      className="font-bold text-lg text-[#6F4223] bg-transparent outline-none cursor-pointer flex items-center h-8"
                    >
                      {endDate
                        ? new Date(endDate).toLocaleDateString("ko-KR", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          }) + ""
                        : "날짜 선택"}
                    </div>
                  </div>

                  {/* 목표 저축 금액 입력 */}
                  <div>
                    <div className="font-bold text-lg text-[#BBA14F]">목표 저축 금액</div>
                    <div
                      onClick={() => {
                        playButtonSound();
                        handleOpenInput("goal");
                      }}
                      className="font-bold text-lg text-[#6F4223] bg-transparent outline-none cursor-pointer flex items-center h-8"
                    >
                      {goalAmount ? goalAmount + "냥" : "입력"}
                    </div>
                  </div>

                  {/* 목표 달성 보상 안내 */}
                  <div>
                    <div className="font-bold text-lg text-[#BBA14F]">목표 달성시 보상</div>
                    <div className="font-bold text-lg text-[#6F4223]">
                      {bonusAmount ? `보너스 ${bonusAmount}냥` : "-"}
                    </div>
                  </div>
                </div>
                {/* 인포박스 하단 중앙 문구 */}
                <div className="w-full flex justify-center mt-4 ml-[-0.5rem]">
                  <span
                    className="text-[0.8rem] font-bold text-center px-2 py-1 rounded-2xl"
                    style={{
                      background: "#FFF6D1",
                      color: "#FFD600",
                      display: "inline-block",
                      lineHeight: "1.4",
                    }}
                  >
                    <span className="text-[#FFD600]">포포와 함께 저축 챌린지! 보너스 냥을 노려보세요!</span>
                  </span>
                </div>
              </>
            ) : (
              /* 저축 통장이 개설된 경우 - 정보 표시 화면 */
              <div className="flex flex-col items-center justify-center w-full py-[0.4rem]">
                <div className="w-full flex flex-col text-lg">
                  {/* 시작 날짜 표시 */}
                  <div>
                    <span className="font-bold text-[#BBA14F]">시작 날짜: </span>
                    <span className="font-bold text-[#573924]">
                      {startDate
                        ? new Date(startDate).toLocaleDateString("ko-KR", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          })
                        : "-"}
                    </span>
                  </div>

                  {/* 종료 날짜 표시 */}
                  <div>
                    <span className="font-bold text-[#BBA14F]">종료 날짜: </span>
                    <span className="font-bold text-[#573924]">
                      {endDate
                        ? new Date(endDate).toLocaleDateString("ko-KR", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          })
                        : "-"}
                    </span>
                  </div>

                  {/* 현재 금액 표시 */}
                  <div>
                    <span className="font-bold text-[#BBA14F]">현재 금액: </span>
                    <span className="font-bold text-[#573924]">{currentAmount ? currentAmount + "냥" : "-"}</span>
                  </div>

                  {/* 목표 저축 금액 표시 */}
                  <div>
                    <span className="font-bold text-[#BBA14F]">목표 저축 금액: </span>
                    <span className="font-bold text-[#573924]">{goalAmount ? goalAmount + "냥" : "-"}</span>
                  </div>
                </div>
              </div>
            )}

            {/* 저축 진행 상황 바 (통장 개설 후에만 표시) */}
            {isCreated && (
              <div className="w-full flex flex-col items-center mt-4 ml-[-0.5rem]">
                <div className="w-4/5 h-6 relative flex items-center">
                  {/* 전체 진행 바 배경 */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-3 bg-[#E6E6E6] rounded-full"></div>

                  {/* 채워진 진행 바 */}
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-3 bg-[#78CA7F] rounded-full transition-all duration-500"
                    style={{
                      width:
                        goalAmount && currentAmount
                          ? `${Math.min((Number(currentAmount) / Number(goalAmount)) * 100, 100)}%`
                          : "0%",
                    }}
                  ></div>

                  {/* 진행 상황을 나타내는 별 아이콘 */}
                  <img
                    src={IMAGE_URLS.savings.star}
                    alt="star"
                    className="absolute top-1/2 -translate-y-1/2"
                    style={{
                      left:
                        goalAmount && currentAmount
                          ? `calc(${Math.min((Number(currentAmount) / Number(goalAmount)) * 100, 100)}% - 1rem)`
                          : "-1rem",
                      width: "2rem",
                      height: "2rem",
                      transition: "left 0.5s",
                    }}
                  />
                </div>

                {/* 현재 금액 / 목표 금액 텍스트 */}
                <div className="mt-0 text-m font-bold text-[#573924]">
                  {currentAmount ? currentAmount : 0} / {goalAmount ? goalAmount : 0}냥
                </div>
              </div>
            )}
          </div>

          {/* 캐릭터 이미지와 버튼 영역 */}
          <div className="flex flex-col items-center justify-start mt-[-15rem]">
            <img src={IMAGE_URLS.savings.popo} alt="character" className="w-65" />

            {/* 메인 액션 버튼 (통장 개설 또는 입금하기) */}
            {isCreated ? (
              <button
                className={`font-bold text-[1.2rem] rounded-4xl py-3 w-45 ${
                  hasDepositedToday
                    ? "bg-[#E6E6E6] text-[#999999] cursor-not-allowed"
                    : "bg-[#FDF0B7] text-[#573924] cursor-pointer hover:bg-[#F8E599]"
                }`}
                onClick={() => {
                  if (!hasDepositedToday) {
                    playButtonSound();
                    handleDepositClick();
                  }
                }}
                disabled={hasDepositedToday}
              >
                {hasDepositedToday ? "오늘은 입금 완료" : "입금하기"}
              </button>
            ) : (
              <button
                className="bg-[#FDF0B7] text-[#573924] font-bold text-[1.2rem] rounded-4xl py-3 w-45 cursor-pointer disabled:opacity-60"
                onClick={() => {
                  playButtonSound();
                  handleCreateAccount();
                }}
                disabled={isLoading || !goalAmount || !startDate || !endDate || !bonusAmount}
              >
                {isLoading ? "개설 중..." : "저축 통장 개설"}
              </button>
            )}
          </div>
        </div>
      </Background>

      {/* ========== 모달들 ========== */}

      {/* 날짜 선택 모달 */}
      {openPicker && (
        <>
          {/* 모달 배경 오버레이 */}
          <div className="fixed inset-0 bg-black/40 z-50" onClick={handleOverlayClick}></div>

          {/* 날짜 선택기 */}
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <DatePicker
              ref={openPicker === "start" ? startPickerRef : endPickerRef}
              selected={openPicker === "start" ? startDate : endDate}
              onMonthChange={() => playButtonSound()}
              onChange={(date) => {
                playButtonSound();  
                if (openPicker === "start") setStartDate(date);
                else setEndDate(date);
                setOpenPicker(null);
              }}
              open
              onClickOutside={() => {
                playButtonSound(backClickSound);
                handleOverlayClick();
              }}
              dateFormat="yyyy년 MM월 dd일"
              inline
              locale={ko}
              {...(openPicker === "start"
                ? {
                    minDate: today,
                    openToDate: today,
                  }
                : {})}
              {...(openPicker === "end" && startDate
                ? {
                    minDate: addDays(startDate, 5),
                    openToDate: addDays(startDate, 5),
                  }
                : openPicker === "end" && !startDate
                ? {
                    minDate: addDays(today, 5),
                    openToDate: addDays(today, 5),
                  }
                : {})}
            />
          </div>
        </>
      )}

      {/* 금액 입력 모달 */}
      {openInput && (
        <>
          {/* 모달 배경 오버레이 */}
          <div className="fixed inset-0 bg-black/40 z-50" onClick={handleOverlayClick}></div>

          {/* 입력 폼 */}
          <div className="fixed inset-0 flex items-center justify-center z-50 font-TJ">
            <div className="bg-[#FFF6D5] rounded-2xl p-8 shadow-xl flex flex-col items-center w-[16rem]">
              {/* 모달 제목 */}
              <div className="text-xl font-bold mb-4 text-[#6F4223]">{openInput === "goal" && "목표 저축 금액"}</div>

              {/* 금액 입력 필드 */}
              <input
                type="number"
                className="bg-white md:border-4 border-2 border-[#BBA14F] rounded-lg px-4 py-2 text-lg text-center mb-4 focus:outline-none w-full"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="금액을 입력하세요"
                autoFocus
              />

              {/* 확인 버튼 */}
              <button
                className="cursor-pointer bg-[#BBA14F] text-white font-bold rounded-xl px-6 py-2 mt-2 transition"
                onClick={() => {
                  playButtonSound();
                  handleSaveInput();
                }}
              >
                확인
              </button>
            </div>
          </div>
        </>
      )}

      {/* 추가 입금 모달 */}
      {isDepositModalOpen && (
        <>
          {/* 모달 배경 오버레이 */}
          <div
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
            onClick={() => {
              playButtonSound(backClickSound);
              setIsDepositModalOpen(false);
            }}
          >
            {/* 입금 폼 */}
            <div
              className="bg-[#FFF6D5] rounded-2xl p-8 shadow-xl flex flex-col items-center w-[16rem] relative font-TJ"
              onClick={(e) => e.stopPropagation()}
            >
              {/* X 닫기 버튼 */}
              <button
                className="absolute top-0.5 right-2.5 text-2xl text-[#BBA14F] hover:text-[#6F4223] font-bold focus:outline-none cursor-pointer"
                onClick={() => {
                  playButtonSound(backClickSound);
                  setIsDepositModalOpen(false);
                }}
                aria-label="닫기"
              >
                ×
              </button>
              <div className="text-xl font-bold mb-4 text-[#6F4223]">입금 금액</div>

              {/* 입금 금액 입력 필드 */}
              <input
                type="number"
                className="bg-white md:border-4 border-2 border-[#BBA14F] rounded-lg px-4 py-2 text-m text-center mb-2 focus:outline-none w-full"
                value={depositInput}
                onChange={handleDepositInputChange}
                placeholder="금액을 입력하세요"
                autoFocus
                disabled={!IS_TEST_MODE && hasDepositedToday}
              />
              {/* 최대 입금 가능 금액 안내 */}
              {goalAmount && (
                <div className="text-xs text-[#BBA14F] mb-1">
                  {/* 최대 입금 가능 금액 안내 */}
                  {(() => {
                    const maxDeposit = Math.floor(Number(goalAmount) * MAX_DEPOSIT_RATE);
                    const remainToGoal = Number(goalAmount) - Number(currentAmount);
                    const maxDepositDisplay = Math.min(maxDeposit, remainToGoal);
                    return `최대 입금 가능 금액: ${maxDepositDisplay}냥`;
                  })()}
                </div>
              )}
              {/* 에러 메시지 */}
              {depositError && <div className="text-xs text-red-500 mb-1">{depositError}</div>}

              {/* 입금하기 버튼 */}
              <button
                className="cursor-pointer bg-[#BBA14F] text-white font-bold rounded-xl px-6 py-2 mt-2 transition disabled:opacity-50"
                onClick={() => {
                  playButtonSound();
                  handleDepositConfirm();
                }}
                disabled={
                  (!IS_TEST_MODE && hasDepositedToday) || !depositInput || !!depositError || Number(depositInput) <= 0
                }
              >
                {!IS_TEST_MODE && hasDepositedToday ? "오늘은 입금 완료" : "입금하기"}
              </button>
            </div>
          </div>
        </>
      )}

      {/* 목표 달성 보너스 모달 */}
      {isBonusModalOpen && (
        <>
          {/* 모달 배경 오버레이 */}
          <div className="fixed inset-0 bg-black/40 z-50" onClick={() => setIsBonusModalOpen(false)}></div>

          {/* 축하 메시지 */}
          <div className="fixed inset-0 flex items-center justify-center z-50 font-TJ">
            <div className="bg-[#FFF6D5] rounded-2xl p-8 shadow-xl flex flex-col items-center w-[18rem]">
              <div className="text-2xl font-bold mb-4 text-[#6F4223]">축하합니다!</div>
              <div className="text-lg text-[#573924] mb-4">
                목표를 달성해서
                <br />
                <span className="font-extrabold text-[#BBA14F]">+{goalAmount ? Math.floor(Number(goalAmount) * BONUS_RATE) : 0}냥</span>을 받았습니다!
              </div>

              {/* 확인 버튼 */}
              <button
                className="cursor-pointer bg-[#BBA14F] text-white font-bold rounded-xl px-6 py-2 mt-2 transition"
                onClick={() => {
                  setIsBonusModalOpen(false);
                  resetSavingsAccount();
                }}
              >
                확인
              </button>
            </div>
          </div>
        </>
      )}

      {/* 입금 완료 결과 모달 */}
      {isDepositResultModalOpen && (
        <>
          {/* 모달 배경 오버레이 */}
          <div className="fixed inset-0 bg-black/40 z-50" onClick={() => setIsDepositResultModalOpen(false)}></div>

          {/* 입금 결과 표시 */}
          <div className="fixed inset-0 flex items-center justify-center z-50 font-TJ">
            <div className="bg-[#FFF6D5] rounded-2xl p-8 shadow-xl flex flex-col items-center w-[22rem] md:border-8 border-4 border-[#BBA14F]">
              <div className="text-2xl font-bold mb-4 text-[#BBA14F]">입금 완료!</div>

              {/* 입금 정보와 확인 버튼 */}
              <div className="flex flex-row items-center justify-between w-full mb-4">
                <div className="text-lg font-bold text-[#573924] text-left">
                  현재 금액: {currentAmount}냥<br />
                  입금 금액: {lastDepositAmount}냥
                </div>
                <button
                  className="bg-[#BBA14F] text-white font-bold rounded-xl px-6 py-2 ml-4 cursor-pointer"
                  onClick={() => {
                    playButtonSound();
                    setIsDepositResultModalOpen(false);
                  }}
                >
                  확인
                </button>
              </div>

              {/* 업데이트된 진행 상황 바 */}
              <div className="w-full flex flex-col items-center mt-2">
                <div className="w-4/5 h-8 relative flex items-center">
                  {/* 전체 바 */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-6 bg-[#E6E6E6] rounded-full"></div>

                  {/* 채워진 바 */}
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-6 bg-[#78CA7F] rounded-full transition-all duration-500"
                    style={{
                      width:
                        goalAmount && currentAmount
                          ? `${Math.min((Number(currentAmount) / Number(goalAmount)) * 100, 100)}%`
                          : "0%",
                    }}
                  ></div>

                  {/* 별 아이콘 */}
                  <img
                    src={IMAGE_URLS.savings.star}
                    alt="star"
                    className="absolute top-1/2 -translate-y-1/2"
                    style={{
                      left:
                        goalAmount && currentAmount
                          ? `calc(${Math.min((Number(currentAmount) / Number(goalAmount)) * 100, 100)}% - 1.5rem)`
                          : "-1.5rem",
                      width: "3rem",
                      height: "3rem",
                      transition: "left 0.5s",
                    }}
                  />
                </div>

                {/* 달성률 퍼센트 표시 */}
                <div className="mt-2 text-xl font-bold text-[#573924]">
                  {goalAmount && currentAmount
                    ? `${Math.floor((Number(currentAmount) / Number(goalAmount)) * 100)}%`
                    : "0%"}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
