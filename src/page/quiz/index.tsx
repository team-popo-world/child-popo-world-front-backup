import { useNavigate } from "react-router-dom";
import { QuizTemplate } from "../../module/quiz/template";
import { useTutorialStore } from "@/lib/zustand/tutorialStore";
import { playSound } from "@/lib/utils/sound";
import { tutorialQuiz } from "@/lib/constants/tutorial";
import { useSoundStore } from "@/lib/zustand/soundStore";
import { useEffect, useState } from "react";
import {
  playButtonSound,
  setNewAudio,
  stopBackgroundMusic,
} from "@/lib/utils/sound";
import QuizBackgroundMusic from "@/assets/sound/quiz2.mp3";
import apiClient from "@/lib/api/axios";

export default function QuizPage() {
    const { isTutorialCompleted} = useTutorialStore();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isMuted, audio } = useSoundStore();

  // 첫페이지 로드시 배경음악 설정
  useEffect(() => {
    console.log("audio.name", audio?.name);
    if (audio?.name !== QuizBackgroundMusic) {
      setNewAudio(QuizBackgroundMusic, 0.6);
    }
  }, []);

  // 음소거 상태 변경시 배경음악 정지 또는 재생
  useEffect(() => {
    if (isMuted && audio) stopBackgroundMusic();
    if (isMuted && !audio) return;

    if (audio && !isMuted) {
      audio.play();
    }
  }, [isMuted, audio]);

  useEffect(() => {
    if(!isTutorialCompleted) {
      playSound(tutorialQuiz["quiz2"].sound, 1, true);
    }
  }, [isTutorialCompleted]);

  // 뒤로가기 버튼 클릭 시 홈으로 이동
  const handleBack = () => {
    navigate("/");
  };

  // 퀴즈 풀기 클릭 시 API 호출 후 이동 여부 결정
  const handleClickQuiz = async () => {
    playButtonSound();
    try {
      await apiClient.get("/api/quiz/active");
      // 성공 -> 아직 퀴즈 안함
      navigate("/quiz/level-select");
    } catch (error: any) {
        setIsModalOpen(true);
    }
  };

  // 모달창 닫기
  const handleCloseModal = () => {
    playButtonSound();
    setIsModalOpen(false);
  };


  return (
    <QuizTemplate
      onBack={handleBack}
      isModalOpen={isModalOpen}
      onCloseModal={handleCloseModal}
      onClickQuiz={handleClickQuiz}
      isTutorialCompleted={isTutorialCompleted}
    />
  );
}
