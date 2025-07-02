import { QuestTemplate } from "../../module/quest/template";
import { useLocation, useNavigate } from "react-router-dom";
import { playButtonSound, playSound, setNewAudio, stopBackgroundMusic } from "@/lib/utils/sound";
import { useEffect } from "react";
import { useSoundStore } from "@/lib/zustand/soundStore";
import QuestBackgroundMusic from "@/assets/sound/quest.mp3";
import QuestTTS from "@/assets/sound/pageSound/quest_tts.wav"

export default function QuestPage() {
  const navigate = useNavigate();
  const { isMuted, audio } = useSoundStore();
  const { state } = useLocation();
  const from = state?.from;

   // 첫페이지 로드시 배경음악 설정
   useEffect(() => {
    if(audio?.name !== QuestBackgroundMusic) {
      setNewAudio(QuestBackgroundMusic, 0.35);
    }
    if (from === "main") {
      playSound(QuestTTS, 1);
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
    

  const onClickQuest = (questType: string) => {
    playButtonSound();
    navigate(`/quest/detail/${questType}`);
  };

  const handleBack = () => {
    navigate("/");
  };

  return <QuestTemplate onClickQuest={onClickQuest} onBack={handleBack} />;
}
