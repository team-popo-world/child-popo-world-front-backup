import { useSoundStore } from "../zustand/soundStore";
import buttonSound from "@/assets/sound/button_click.mp3";
import  type { NamedHTMLAudioElement } from "../zustand/soundStore";


export const playButtonSound = (url: string = buttonSound, volume: number = 1) => {
  const { isMuted } = useSoundStore.getState();
  if (isMuted) return;

  const audio = new Audio(url);
  audio.volume = volume;
  audio.play();
};

// 전역 효과음 Audio 객체
let effectAudio: HTMLAudioElement | null = null;
export const playSound = (url: string, volume: number = 1,  tutorial: boolean = false) => {
  const { isMuted } = useSoundStore.getState();
  if(!tutorial && isMuted) return;

  if (effectAudio) {
    effectAudio.pause();
    effectAudio.currentTime = 0;
  }
  
  // 새로운 오디오 객체 생성 또는 기존 객체 재사용
  if (!effectAudio) {
    effectAudio = new Audio();
  }
  
  effectAudio.src = url;
  effectAudio.volume = volume;
  
  
  effectAudio.play();
};

// 배경음악 설정
export const setNewAudio = (url: string, volume: number = 0.8, loop: boolean = true) => {
  const { audio, setAudio } = useSoundStore.getState();
  if (audio) {

    audio.volume = volume;
    if( url == audio.name) return 

    audio.pause();
    audio.src = ""; // src 제거
    audio.load(); // 메모리에서 해제
    audio.remove(); // DOM에서 제거 (필요시)

    // 오디오 이름 부여 
    audio.name = url;

    // 이벤트 리스너 제거 (있다면)
    audio.onloadstart = null;
    audio.oncanplay = null;
    audio.onplay = null;
    audio.onpause = null;
    audio.onended = null;
    audio.onerror = null;
  }

  const newAudio: NamedHTMLAudioElement = new Audio(url);
  newAudio.volume = volume;
  newAudio.loop = loop;
  newAudio.name = url;
  setAudio(newAudio);
};

// 배경음악 재생
export const playBackgroundMusic = () => {
  const { audio } = useSoundStore.getState();

  if (!audio) return;

  // 오디오 재생 시 에러 처리
  audio.play().catch((error) => {
    console.warn("오디오 재생 실패:", error);
  });

  return audio;
};

// 배경음악 정지
export const stopBackgroundMusic = () => {
  const { audio } = useSoundStore.getState();
  if (!audio) return;
  audio.pause();
};
