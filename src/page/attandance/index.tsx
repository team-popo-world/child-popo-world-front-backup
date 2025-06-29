import { useEffect, useMemo, useState } from "react";
import { getAttendance, postAttendance } from "@/lib/api/attandance/attendance";
import { useAuthStore } from "@/lib/zustand/authStore";
import { AttandanceTemplate } from "@/module/attandance/template";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { playButtonSound, playSound } from "@/lib/utils/sound";
import { getToday, getYesterday } from "@/lib/utils/utils";
import { useTutorialStore } from "@/lib/zustand/tutorialStore";
import { useNavigate } from "react-router-dom";
import { tutorialAttandance } from "@/lib/constants/tutorial";
import { postPushMessage } from "@/lib/api/push/postPushMessage";

export const WEEK = ["월", "화", "수", "목", "금", "토", "일"];

export const rewardText = {
  day: "출석체크 보상을 받았어요!",
  week: "일주일 연속성공 보상을 받았어요!",
}

export const cheeringText = {
  "start": "이제부터 시작입니다!",
  "middle" : "오늘도 환영합니다!",
  "end" : "7일 연속 출석이 되었어요!",
}

export interface Attendance {
  dayOfWeek: string;
  attended: boolean;
}

export default function AttandancePage() {
  const [isPointModalOpen, setIsPointModalOpen] = useState(false);
  const [rewardPoints, setRewardPoints] = useState(0); 
  const [isWeekCompleted, setIsWeekCompleted] = useState(false);
  const [isAlreadyAttended, setIsAlreadyAttended] = useState(false);
  const {setPoint, point} = useAuthStore();
  const queryClient = useQueryClient();
  const { isTutorialCompleted  } = useTutorialStore();
  const navigate = useNavigate();
  const { name: userName } = useAuthStore();
  const { data: attendanceData } = useQuery<Attendance[]>({
    queryKey: ["attendance"],
    queryFn: getAttendance,
    staleTime: 60 * 1000 * 60 , // 1시간 마다 캐시 무효화
  });

  useEffect(() => {
    if (!isTutorialCompleted) {
      playSound(tutorialAttandance["attendance2"].sound, 1, true);
    }
  }, [isTutorialCompleted]);


  const attendanceMutation = useMutation({
    mutationFn: (dayOfWeek: string) => postAttendance(dayOfWeek),
    onSuccess: (data) => {
      setRewardPoints(data.rewardPoints);
      if(point !== null) setPoint(point + data.rewardPoints);
      setIsWeekCompleted(data.weekCompleted);
      setIsPointModalOpen(true);
      postPushMessage(`${userName}님이 출석체크를 했어요!`);
      queryClient.invalidateQueries({ queryKey: ["attendance"], refetchType: "all" });
    },
    onError: () => {
      setIsAlreadyAttended(true);
    }
  })

  const consecutive = useMemo(() => {
    if (!attendanceData) return 0;
    
    const getConsecutive = () => {
      const yesterday = getYesterday();
      let consecutive = 0;
      let todayIndex = 0;
      
      for (let i = 0; i < attendanceData.length; i++) {
        if (attendanceData[i].attended) {
          consecutive++;
        } else {
          consecutive = 0;
        }
  
        if (attendanceData[i].dayOfWeek === yesterday) {
          todayIndex = i + 1 > 6 ? 0 : i + 1;
          break;
        }
      }
  
      if (attendanceData[todayIndex]?.attended) {
        consecutive += 1;
      }
  
      return consecutive;
    };
  
    return getConsecutive();
  }, [attendanceData]);

  const handleAttendance = () => {
    playButtonSound();
    console.log("isPointModalOpen", isPointModalOpen);
    setIsPointModalOpen(true);
    attendanceMutation.mutate(getToday());
  };

  // 튜토리얼 중 포인트 모달 닫힐 때 메인으로 돌아가서 튜토리얼 계속
  const handlePointModalClose = () => {
    setIsPointModalOpen(false);

    if (!isTutorialCompleted) {
      navigate("/");
    }
  };

  return <AttandanceTemplate 
    consecutive={consecutive}
    isPointModalOpen={isPointModalOpen}
    handlePointModalClose={handlePointModalClose}
    rewardPoints={rewardPoints}
    isWeekCompleted={isWeekCompleted}
    isAlreadyAttended={isAlreadyAttended}
    setIsAlreadyAttended={setIsAlreadyAttended}
    handleAttendance={handleAttendance}
    attendance={attendanceData || []}
    isTutorialCompleted={isTutorialCompleted}
  />;
}
