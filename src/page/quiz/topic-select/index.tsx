import { useNavigate, useParams } from "react-router-dom";
import { QuizTopicSelectTemplate } from "@/module/quiz/template/QuizTopicSelectTemplate";
import { useTutorialStore } from "@/lib/zustand/tutorialStore";
import { playButtonSound } from "@/lib/utils/sound";

export default function TopicSelectPage() {
    const navigate = useNavigate();
    const { level } = useParams<{ level: string }>();
    const { isTutorialCompleted } = useTutorialStore();
  // 뒤로가기 버튼 클릭
  const handleBack = () => {
    // 튜토리얼을 완료하지 않았다면 뒤로가기 버튼 클릭 시 홈으로 이동
    if(!isTutorialCompleted) {
      navigate("/");
      return;
    }
    playButtonSound();
    navigate("/quiz/level-select");
  };
    
  const handleClickTopic = (topic: string) => {
    playButtonSound();
        if (!level) return;
        navigate(`/quiz/${level}/${topic}`);
    }


  return (
    <QuizTopicSelectTemplate onBack={handleBack} onClickTopic={handleClickTopic} />
  );
}
