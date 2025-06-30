import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TutorialState {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  isTutorialCompleted: boolean;
  setTutorialCompleted: (completed: boolean) => void;
}

export const useTutorialStore = create<TutorialState>()(
  persist(
    (set, get) => ({
      currentStep: 1,
      setCurrentStep: (step: number) => set({ currentStep: step }),
      nextStep: () => {
        const { currentStep } = get();
        set({ currentStep: currentStep + 1 });
      },
      isTutorialCompleted: true,
      setTutorialCompleted: (completed: boolean) => set({ isTutorialCompleted: completed }),
    }),
    {
      name: "tutorial-storage", // localStorage 키 이름
      partialize: (state) => ({ 
        isTutorialCompleted: state.isTutorialCompleted,
        currentStep: state.currentStep,
      }), // 튜토리얼 완료 여부만 저장
    }
  )
); 