// src/page/main/index.tsx
import { useEffect, useState } from "react";
import MainTemplate from "../../module/main/template";
import { useNavigate } from "react-router-dom";
import { useSoundStore } from "@/lib/zustand/soundStore";
import { useAuthStore } from "@/lib/zustand/authStore";
import { setNewAudio, stopBackgroundMusic } from "@/lib/utils/sound";
import { IMAGE_URLS } from "@/lib/constants/constants";
import { preload } from "react-dom";
import MainBackgroundMusic from "@/assets/sound/main1.mp3";
import { getDiary } from "@/lib/api/emotion/getDiary";
import { useQueryClient } from '@tanstack/react-query';
import Tutorial from "@/module/main/template/Tutorial";
import { useTutorialStore } from "@/lib/zustand/tutorialStore";
import { subscribe } from "@/lib/utils/pushNotification";
import { testAlert } from "@/lib/api/push/testAlert";

// 섬별 위치 정보
const ISLAND_POSITIONS = {
  market: { top: "4.25rem", left: "3.25rem" },
  emotionDiary: { top: "11rem", left: "3rem" },
  raising: { top: "13.75rem", left: "8.75rem" },
  savings: { top: "14.75rem", left: "19rem" },
  quest: { top: "12rem", left: "26rem" },
  investing: { top: "5rem", left: "26rem" },
} as const;

export default function Main() {
  const { logout } = useAuthStore();
  const { toggleMute, isMuted, audio } = useSoundStore();
  const { isTutorialCompleted } = useTutorialStore();
  const queryClient = useQueryClient();
  
  // 로그인 후 메인페이지에서 푸시 알림 구독 
  useEffect(() => {
    subscribe();
    // testAlert();
  }, []);
  
  // 첫페이지 로드시 배경음악 설정
  useEffect(() => {
    setNewAudio(MainBackgroundMusic, 0.38);
  }, []);

  // 음소거 상태 변경시 배경음악 정지 또는 재생
  useEffect(() => {
    if (isMuted && audio) stopBackgroundMusic();
    if (isMuted && !audio) return;

    if (audio && !isMuted) {
      audio.play();
    }
  }, [isMuted, audio]);

  const [isAnimating, setIsAnimating] = useState(false);
  const [targetPosition, setTargetPosition] = useState<{
    top: string;
    left: string;
  }>({
    top: "8rem",
    left: "14rem",
  });
  const [targetPath, setTargetPath] = useState<string>("");
  const [direction, setDirection] = useState<"left" | "right">("left");

  const navigate = useNavigate();

  preload(IMAGE_URLS.attandance.circle_popo, { as: "image" });
  preload(IMAGE_URLS.attandance.masic_popo, { as: "image" });

  const handleIslandClick = (
    island: keyof typeof ISLAND_POSITIONS,
    path: string,
    direction: "left" | "right" = "left"
  ) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTargetPosition(ISLAND_POSITIONS[island]);
    setTargetPath(path);
    setDirection(direction);

    if (island === "investing") {
      const investingPageImages = [
        ...Object.values(IMAGE_URLS.investing),
        ...Object.values(IMAGE_URLS.investing_game.little_pig),
        ...Object.values(IMAGE_URLS.investing_game.masic),
        ...Object.values(IMAGE_URLS.investing_game.ninja),
        ...Object.values(IMAGE_URLS.investing_game.truck),
        ...Object.values(IMAGE_URLS.investing_game.base),
      ];
      investingPageImages.forEach((image) => {
        preload(image, { as: "image" });
      });
      
    }

    if (island === "market") {
      const marketPageImages = [...Object.values(IMAGE_URLS.market), ...Object.values(IMAGE_URLS.items)];
      marketPageImages.forEach((image) => {
        preload(image, { as: "image" });
      });
    }

    if (island === "savings") {
      const savingsPageImages = [...Object.values(IMAGE_URLS.savings)];
      savingsPageImages.forEach((image) => {
        preload(image, { as: "image" });
      });
    }

    if (island === "raising") {
      const raisingPageImages = [...Object.values(IMAGE_URLS.raising)];
      raisingPageImages.forEach((image) => {
        preload(image, { as: "image" });
      });
    }

    if (island == "emotionDiary") {
      const emotionDiaryImages = [...Object.values(IMAGE_URLS.emotionList), ...Object.values(IMAGE_URLS.emotionDiary)];
      emotionDiaryImages.forEach((image) => {
        preload(image, { as: "image" });
      });
      // 일기 데이터 미리 가져오기
      queryClient.prefetchQuery({ queryKey: ["diary"], queryFn: getDiary });
    }

    if (island === "quest") {
      const questPageImages = [...Object.values(IMAGE_URLS.quest), ...Object.values(IMAGE_URLS.quest_detail)];
      questPageImages.forEach((image) => {
        preload(image, { as: "image" });
      });
    }
  };

  const handleAnimationComplete = () => {
    setIsAnimating(false);
    setDirection("left");

    if (targetPath === "/market") {
      return navigate("/market", { state: { from: "main" } });
    }
    if (targetPath === "/emotionDiary") {
      return navigate("/emotionDiary", { state: { from: "main" } });
    }
    if (targetPath === "/quest") {
      return navigate("/quest", { state: { from: "main" } });
    }
    if (targetPath) {
      return navigate(targetPath);
    }
  };

  if(!isTutorialCompleted) {
    setNewAudio(MainBackgroundMusic, 0.3);
    return <Tutorial/>;
  }

  return (
    <MainTemplate
      isAnimating={isAnimating}
      targetPosition={targetPosition}
      direction={direction}
      handleIslandClick={handleIslandClick}
      handleAnimationComplete={handleAnimationComplete}
      logout={logout}
    />
  );
}
