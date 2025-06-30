import { QuestDetailTemplate } from "@/module/quest/template/QuestDetailTemplate";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Quest } from "@/module/quest/types/quest";
import { StateChangeModal } from "@/module/quest/components/StateChangeModal";
import { useAuthStore } from "@/lib/zustand/authStore";
import { playButtonSound, } from "@/lib/utils/sound";
import backClickSound from "@/assets/sound/back_click.mp3";
import { getQuest } from "@/lib/api/quest/getQuest";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { postQuestState } from "@/lib/api/quest/postQuestState";
import { postPushMessage } from "@/lib/api/push/postPushMessage";

const questStateMap: Record<string, Quest["state"]> = {
  PENDING_ACCEPT: "수락하기",
  IN_PROGRESS: "다 했어요",
  PENDING_APPROVAL: "기다리는 중",
  APPROVED: "돈 받기",
  COMPLETED: "완료!",
  EXPIRED: "만료!",
};

const serverQuestStateMap: Record<Quest["state"], string> = {
  수락하기: "IN_PROGRESS",
  "다 했어요": "PENDING_APPROVAL",
  "기다리는 중": "",
  "돈 받기": "COMPLETED",
  "완료!": "",
  "만료!": "",
};

const nextStateMap: Record<Quest["state"], Quest["state"] | undefined> = {
  수락하기: "다 했어요",
  "다 했어요": "기다리는 중",
  "기다리는 중": undefined,
  "돈 받기": "완료!",
  "완료!": undefined,
  "만료!": undefined,
};

const MatchModalText: Record<string, string> = {
  수락하기: "이 퀘스트를 수락할래?",
  "다 했어요": "퀘스트를 완료했어?",
};

export default function QuestDetail() {
  const { questType } = useParams() as { questType: "daily" | "parent" };
  const navigate = useNavigate();
  const [questData, setQuestData] = useState<Quest[]>([]);
  const [selectedState, setSelectedState] = useState<Quest["state"] | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalText, setModalText] = useState<string>("");
  const { point } = useAuthStore();
  const [pendingChange, setPendingChange] = useState<{
    questId: string;
    childId: string;
    state: Quest["state"];
    reward: number;
  } | null>(null);

  const { setPoint } = useAuthStore();
  const queryClient = useQueryClient(); 
  const { name: userName } = useAuthStore();

  const total = questData.filter(
    (q) =>
      q.state === "기다리는 중" ||
      q.state === "다 했어요" ||
      q.state === "돈 받기" ||
      q.state === "완료!"
  ).length;
  const completed = questData.filter((q) => q.state === "완료!").length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  // 퀘스트 목록 조회후 퀘스트 데이터 저장
  const {data: responseQuestData, isLoading, error} = useQuery({
    queryKey: ["quest", questType],
    queryFn: () => getQuest(questType),
  });

  useEffect(() => {
    if(!responseQuestData || isLoading || error) return;

    // 받은 퀘스트 데이터 객체에 {KEY, VALUE} 추가 (state: "수락하기" 등) 
    const mapped = responseQuestData.quests.map((item: any) => ({
      ...item,
      state: questStateMap[item.state],
    }));

    // 매핑된 객체 정렬 (각 상태를 인덱스 순서대로 오름차순 정렬)
    const sorted = sortQuests(mapped);
    setQuestData(sorted);
  }, [responseQuestData, isLoading, error]);

  // 퀘스트 정렬하기
  const sortQuests = (quests: Quest[]) => {
    const stateOrder: Quest["state"][] = [
      "돈 받기",
      "다 했어요",
      "수락하기",
      "기다리는 중",
      "완료!",
      "만료!",
    ];

    return quests.sort((a, b) => {
      const stateA = stateOrder.indexOf(a.state);
      const stateB = stateOrder.indexOf(b.state);
      if (stateA !== stateB) return stateA - stateB; 
      return new Date(a.end_date).getTime() - new Date(b.end_date).getTime();
    });
  };

  // 완료 버튼
  const handleComplete = () => {
    playButtonSound();
    navigate("/quest/detail/complete", {
      state: { questType },
    });
  };

  // 뒤로가기 버튼
  const handleBack = () => {
    navigate("/quest");
  };

  // 퀘스트 상태 변경 클릭
  const handleChangeState = (
    questId: string,
    childId: string,
    state: Quest["state"]
  ) => {
    playButtonSound();
    const modalMessage = MatchModalText[state];

    const quest = questData.find((q) => q.quest_id === questId);
    const reward = quest?.reward || 0;

    // 다 했어요 눌렀을 경우 푸시 알림 전송
    if (modalMessage == "다 했어요") {
      postPushMessage(`${userName}님이 퀘스트를 완료했어요!`);
    }
    if(modalMessage == "수락하기") {
      postPushMessage(`${userName}님이 퀘스트를 수락했어요!`);
    }

    // 수락하기, 다 했어요 눌렀을 경우 모달창 띄우기, 상태변경
    if (modalMessage) {
      setModalText(modalMessage);
      setIsModalOpen(true);
      setPendingChange({ questId, childId, state,reward });
    } else {
      // 완료 버튼 클릭시 모달창 없이 바로 상태 변경
      proceedChangeState(questId, childId, state,reward);
    }
  };

  // 상태 변경하기 api 요청
  const proceedChangeState = async (
    questId: string,
    childId: string,
    state: Quest["state"],
    reward: number,
  ) => {
    const serverState = serverQuestStateMap[state];
    if (!serverState) return;

    const body = { questId, childId, state: serverState };
    console.log("상태 변경 요청 body:", body);

    try {
      await postQuestState(questId, childId, serverState); 

      // 다 했어요 눌렀을 경우 푸시 알림 전송
      if (state == "다 했어요") {
        postPushMessage(`${userName}님이 퀘스트를 완료했어요!`);
      }
      // 수락하기 눌렀을 경우 푸시 알림 전송
      if (state == "수락하기") {
        postPushMessage(`${userName}님이 퀘스트를 수락했어요!`);
      }
      // 돈 받기 눌렀을 경우 푸시 알림 전송
      if (state == "돈 받기") {
        postPushMessage(`${userName}님이 퀘스트 보상을 받았어요!`);
      }
      
      queryClient.invalidateQueries({ queryKey: ["quest"], refetchType: "all" });

      const nextState = nextStateMap[state];
      if (!nextState) return;

      setQuestData((prev) =>
        prev.map((quest) => (quest.quest_id === questId ? { ...quest, state: nextState } : quest))
      );

      if (state === "돈 받기" && reward > 0) {
        setPoint((point??0) + reward);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 모달창에서 확인 버튼 클릭
  const handleModalConfirm = () => {
    if (pendingChange) {
      proceedChangeState(
        pendingChange.questId,
        pendingChange.childId,
        pendingChange.state,
        pendingChange.reward
      );
    }
    playButtonSound();
    setPendingChange(null);
    setIsModalOpen(false);
  };

  const filteredQuestData = selectedState
    ? questData.filter((q) => q.state === selectedState)
    : questData;

  return (
    <div>
      {!isLoading && !error && (
        <>
          <QuestDetailTemplate
            questType={questType}
            questData={filteredQuestData}
            selectedState={selectedState}
            onSelectState={(state) => {
              playButtonSound();
              setSelectedState((prev) => (prev === state ? null : state))
            }}
            onComplete={handleComplete}
            onBack={handleBack}
            onChangeState={handleChangeState}
            total={total}
            completed={completed}
            percentage={percentage}
          />
          <StateChangeModal
            isOpen={isModalOpen}
            onClose={() => {
              playButtonSound(backClickSound);
              setIsModalOpen(false);
            }}
            text={modalText}
            onConfirm={handleModalConfirm}
          />
        </>
      )}
    </div>
  );
}
