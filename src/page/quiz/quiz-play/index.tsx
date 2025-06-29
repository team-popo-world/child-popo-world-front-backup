import { QuizPlayTemplate } from "@/module/quiz/template/QuizPlayTemplate";
import { QuizAnswerTemplate } from "@/module/quiz/template/QuizAnswerTemplate";
import { QuizCompleteTemplate } from "@/module/quiz/template/QuizCompleteTemplate";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "@/lib/api/axios";
import { useAuthStore } from "@/lib/zustand/authStore";
import { useTutorialStore } from "@/lib/zustand/tutorialStore";
import { playButtonSound } from "@/lib/utils/sound";
import { postPushMessage } from "@/lib/api/push/postPushMessage";

interface Quiz {
  question: string;
  choices: string[];
  answerIndex?: number;
  answerText?: string;
  description: string;
}

export default function QuizPlayPage() {
  const { level, topic } = useParams<{ level: string; topic: string }>();
  const { isTutorialCompleted } = useTutorialStore();
  const [quizList, setQuizList] = useState<Quiz[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showAnswerPage, setShowAnswerPage] = useState(false);
  const [showCompletePage, setShowCompletePage] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [reward, setReward] = useState(0);
  const { point, setPoint, name: userName } = useAuthStore();
  const navigate = useNavigate();

  const handleBack = () => {
    if(!isTutorialCompleted) {
      navigate("/");
      return;
    }
    navigate("/quiz");
  }

  useEffect(() => {
    if (!level || !topic) return;

    apiClient
      .get("/api/quiz", {
        params: { difficulty: level, topic },
      })
      .then((res) => {
        console.log(res)
        const raw = JSON.parse(res.data.questionJson);
        const parsedQuiz: Quiz[] = [];

        const makeQuiz = (
          question: string,
          choices: string[] | undefined,
          answer: string | number,
          description: string
        ): Quiz => {
          if (!choices || choices.length === 0) {
            return {
              question,
              choices: ["O", "X"],
              answerText: answer as string,
              description,
            };
          }
          return {
            question,
            choices,
            answerIndex: (answer as number) - 1,
            description,
          };
        };

        parsedQuiz.push(makeQuiz(raw.Q1, raw.Q1_choices, raw.A1, raw.D1));
        parsedQuiz.push(makeQuiz(raw.Q2, raw.Q2_choices, raw.A2, raw.D2));
        parsedQuiz.push(makeQuiz(raw.Q3, raw.Q3_choices, raw.A3, raw.D3));

        setQuizList(parsedQuiz);
      })
      .catch((err) => console.error("퀴즈 생성 api 요청 실패", err));
  }, [level, topic]);

  const handleSelectChoice = (choice: string | number) => {
    playButtonSound();
    const currentQuiz = quizList[currentIndex];
    let isCorrect = false;

    if (currentQuiz.answerText !== undefined) {
      isCorrect = choice === currentQuiz.answerText;
    } else if (currentQuiz.answerIndex !== undefined) {
      isCorrect = choice === currentQuiz.answerIndex;
    }

    setSelectedChoice(choice);
    setIsCorrect(isCorrect);
    if (isCorrect) setCorrectCount((prev) => prev + 1);
    setShowAnswerPage(true);
  };

  const handleNext = () => {
    playButtonSound();
    setShowAnswerPage(false);
    if (currentIndex + 1 < quizList.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedChoice(null);
      setIsCorrect(null);
    } else {
      calculateTotalPoint();
      setShowCompletePage(true);
    }
  };

  const handleComplete = () => {
    playButtonSound();
    navigate("/quiz");
    postPushMessage(`${userName}님이 퀴즈를 완료했어요!`);
    if(!isTutorialCompleted) {
      navigate("/");
    }
  };

  const calculateTotalPoint = () => {
    if (!level) return;
    if (!point) return;
    const pointPerQuestion =
      level === "hard" ? 300 : level === "normal" ? 200 : 100;

    const reward = correctCount * pointPerQuestion;
    setPoint(point + reward);
    setReward(reward);
  };

  const currentQuiz = quizList[currentIndex];
  const isLastQuiz = currentIndex === quizList.length - 1;

  return showCompletePage ? (
    <QuizCompleteTemplate
      correctCount={correctCount}
      totalCount={quizList.length}
      onBackToHome={handleComplete}
      reward={reward}
    />
  ) : showAnswerPage && currentQuiz ? (
    <QuizAnswerTemplate
      answer={
        currentQuiz.answerText ?? currentQuiz.choices[currentQuiz.answerIndex ?? 0]
      }
      explanation={currentQuiz.description}
      isCorrect={isCorrect ?? false}
      isNext={handleNext}
      isLast={isLastQuiz} // 👈 추가
    />
  ) : (
    <QuizPlayTemplate
      onBack={handleBack}
      quizList={quizList}
      currentIndex={currentIndex}
      selectedChoice={selectedChoice}
      onSelectChoice={handleSelectChoice}
    />
  );
}
