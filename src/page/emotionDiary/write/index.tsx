import { DiaryWriteTemplate } from "@/module/emotionDiary/template/diaryWrite";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postDiary } from "@/lib/api/emotion/postDiary";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { playButtonSound } from "@/lib/utils/sound";
import { postPushMessage } from "@/lib/api/push/postPushMessage";
import { useAuthStore } from "@/lib/zustand/authStore";

export default function EmotionDiaryWritePage() {
  const navigate = useNavigate();
  const [emotion, setEmotion] = useState<string | null>(null);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [description, setDescription] = useState<string>(
    "이 날의 이야기는 마음속에만 담아두었어요."
  );
  const { name: userName } = useAuthStore();
  const queryClient = useQueryClient();
  const postDiaryMutation = useMutation({
    mutationFn: ({emotion, description}: {emotion: string, description: string}) => postDiary({emotion, description}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diary"] });
      postPushMessage(`${userName}님이 감정 일기를 작성했어요!`);
      navigate("/emotionDiary");
    },
    onError: (error) => {
      console.error("submit error:", error);
    }
  });

  const handleBack = () => {
    navigate("/emotionDiary");
  };

  const handleSubmit = async () => {
    if (!emotion) {
      setIsAlertModalOpen(true);
      return;
    }
    postDiaryMutation.mutate({emotion, description: description || ""});
  };

  const handleCloseAlertModal = () => {
    playButtonSound();
    setIsAlertModalOpen(false);
  };
  
  return (
    <DiaryWriteTemplate
      onBack={handleBack}
      onSelectEmotion={setEmotion}
      onChangeDescription={setDescription}
      onSubmit={handleSubmit}
      selectedEmotion={emotion}
      isAlertModalOpen={isAlertModalOpen}
      onCloseAlertModal={handleCloseAlertModal}
    />
  );
}
