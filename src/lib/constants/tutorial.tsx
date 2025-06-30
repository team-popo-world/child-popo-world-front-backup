import tutorial_start from "@/assets/sound/tutorial/tutorial_start.wav"
import tutorial_sound from "@/assets/sound/tutorial/tutorial_sound.wav"
import tutorial_attandance1 from "@/assets/sound/tutorial/tutorial_attandance1.wav"
import tutorial_attandance2 from "@/assets/sound/tutorial/tutorial_attandance2.wav"
import tutoral_quiz1 from "@/assets/sound/tutorial/tutorial_quiz1.wav"
import tutoral_quiz2 from "@/assets/sound/tutorial/tutorial_quiz2.wav"
import tutorial_last1 from "@/assets/sound/tutorial/tutorial_last1.wav"
import { IMAGE_URLS } from "@/lib/constants/constants";



export const tutorialOrder: Record<string, {text: React.ReactNode, sound: string}> = {
    // currentStep 1
    intro: {
      text:  <div className="absolute top-6 left-10 ">
      <div className="absolute top-2 left-5 whitespace-nowrap">안녕~ 난 포포야! </div>
      <div className="absolute top-6.5 -left-1 whitespace-nowrap">포포월드에 온 걸 환영해!</div>
      <div className="absolute top-11 left-1 whitespace-nowrap">재밌는 섬들이 가득해! </div>
      <div className="absolute top-15.5 left-1 whitespace-nowrap">하나씩 같이 둘러보자!</div>
    </div>,
    sound: tutorial_start
    },
    // currentStep 2
    sound: {
      text: <div className="absolute top-6 left-10">
      <div className="absolute top-2.5 left-5 whitespace-nowrap flex items-center">
        여기! 위에 있는 
      </div>
      <div className="absolute top-7 -left-2 whitespace-nowrap flex items-center">
        이<img src={IMAGE_URLS.sound.off} alt="music" className="w-[1.2rem]" />
        버튼을 누르면 신나는
        </div>
      <div className="absolute top-11.5 left-2.5 whitespace-nowrap">음악이 짜잔~ 포포랑 </div>
      <div className="absolute top-16 left-2.5 whitespace-nowrap">같이 춤출 준비 됐지?</div>
    </div>,
    sound: tutorial_sound
    },
    // currentStep 3
    attendance1: {
      text:<div className="absolute top-6 left-10 "> 
      <div className="absolute top-6 left-4 whitespace-nowrap">출석하러 가볼까?  </div>
      <div className="absolute top-11.5 left-1 whitespace-nowrap">요기 버튼 꾹 눌러줘~!</div>
    </div>,
    sound: tutorial_attandance1
    },

    // currentStep 5
    quiz1: {
      text: <div  className="absolute top-6 left-10 ">
        <div className="absolute top-3.5 left-8 whitespace-nowrap">이건 퀴즈를 </div>
        <div className="absolute top-8 left-3 whitespace-nowrap">할수있는 버튼이야!</div>
        <div className="absolute top-12.5 -left-2 whitespace-nowrap">문제 맞히면 포인트가 짠~!</div>
    </div>,
    sound: tutoral_quiz1
    },

    // currentStep 7
    last: {
      text: <div className="absolute top-6 left-10 ">
      <div className="absolute top-2.5 left-5 whitespace-nowrap">우와~ 다 배웠다!</div>
      <div className="absolute top-7.5 -left-1 whitespace-nowrap">이제 넌 포포월드 전문가! </div>
      <div className="absolute top-12.5 left-4 whitespace-nowrap">진짜탐험, 지금부터</div>
      <div className="absolute top-17.5 left-9 whitespace-nowrap">시작이야~!</div>
    </div>,
    sound: tutorial_last1
    },
  };
  
export const tutorialAttandance: Record<string, {text: React.ReactNode, sound: string}> = {
    // currentStep 4
    attendance2: {
      text:<div className="absolute top-6 left-10 ">
      <div className="absolute top-6 left-7 whitespace-nowrap">매일 눌러봐~  </div>
      <div className="absolute top-11.5 left-0.5 whitespace-nowrap">출석하면 포인트가 뿅!</div>
    </div>,
    sound: tutorial_attandance2
    },
}
  export const tutorialQuiz: Record<string, {text: React.ReactNode, sound: string}> = {
    // currentStep 6
    quiz2: {
      text: <div className="absolute top-6 left-10 ">
      <div className="absolute top-6 left-0 whitespace-nowrap">퀴즈 풀기버튼을 누르고</div>
      <div className="absolute top-11 left-4.5 whitespace-nowrap">포인트를 받아봐!</div>
    </div>,
    sound: tutoral_quiz2
    },
  }