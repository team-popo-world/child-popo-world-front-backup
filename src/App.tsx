import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Main from "@/page/main";
import Investing from "@/page/investing";
import Market from "@/page/market";
import Savings from "@/page/savings";
import Quest from "@/page/quest";
import QuestDetail from "@/page/quest/detail";
import QuestComplete from "./page/quest/complete/QuestComplete";
import Raising from "@/page/raising";
import EmotionDiary from "@/page/emotionDiary";
import DiaryWrite from "@/page/emotionDiary/write";
import Attandance from "@/page/attandance";
import Quiz from "@/page/quiz";
import QuizLevelSelect from "@/page/quiz/level-select";
import QuizTopicSelect from "@/page/quiz/topic-select";
import QuizPlay from "@/page/quiz/quiz-play";
import NotFound from "@/page/notfound";
import InvestingGame from "@/page/investing/game";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ParentShop from "./page/market/parent-shop";
import NpcShop from "./page/market/npc-shop";
import Inventory from "./page/market/inventory";
import ProtectedRouter from "@/components/auth/ProtectedRouter";
import LoginPage from "./page/auth/login";
import RegisterPage from "./page/auth/register";
import { BrowserRouter } from "react-router-dom";
import { getPublicKey } from "./lib/api/push/getPublicKey";
import { postSubscribe } from "./lib/api/push/postSubscribe";
import { urlBase64ToUint8Array, arrayBufferToBase64 } from "./lib/utils/urlBase64ToUint8Array";
import { testAlert } from "./lib/api/push/test_alert";

// QueryClient 인스턴스 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // 실패시 1번만 재시도
      staleTime: 5 * 60 * 1000, // 5분 동안 데이터를 신선한 상태로 유지
    },
  },
});

function App() {
  // 1. 핸드폰 기기에서 알림 권한 요청
  // 2. 서버에서 공개키 받음
  // 3. 공개키로 구독 정보 생성
  // 4. 구독 정보를 서버로 보냄
  // 5. 서버에서 푸시 메시지 전송
  // 6. 푸시 메시지 수신
  // 7. 푸시 메시지 표시
  // 8. 푸시 메시지 클릭 시 앱 실행
  // 9. 푸시 메시지 삭제
  useEffect(() => {
    // 푸시 알림 구독 및 서버 전송 로직
    const subscribe = async () => {
      // 1. 브라우저에 알림 권한 요청
      await Notification.requestPermission(); 
      
      // 2. 서버에서 VAPID 공개키 받아오기
      console.log("publicKey");
      const publicKey = await getPublicKey();
      console.log(publicKey);
      
      // 3. 서비스 워커가 준비될 때까지 대기
      const resistration = await navigator.serviceWorker.ready;

      // 4. PushManager를 통해 푸시 구독 생성 (이미 구독된 경우 에러 발생 가능)
      const subscription: PushSubscription = await resistration.pushManager.subscribe({
        userVisibleOnly: true, // 반드시 사용자에게 알림이 보여야 함
        applicationServerKey: urlBase64ToUint8Array(publicKey), // 서버에서 받은 공개키를 변환하여 사용
      });
      
      // 5. 구독 객체에서 암호화 키 추출
      const p256dhKey = subscription.getKey('p256dh'); // 메시지 암호화용 공개키
      const authKey = subscription.getKey('auth');     // 인증용 비밀값
      console.log("p256dhKey", p256dhKey);
      console.log("authKey", authKey);
      
      // 6. 두 키가 모두 존재할 때만 서버로 구독 정보 전송
      if( p256dhKey && authKey) {
        const p256dh = arrayBufferToBase64(p256dhKey); // ArrayBuffer를 Base64 문자열로 변환
        const auth = arrayBufferToBase64(authKey);
        const response = await postSubscribe(subscription.endpoint, p256dh, auth);  // 서버에 구독 정보 전송
        console.log("response, postSubscribe", response);
        await testAlert();
      } else {
        // 키가 없을 경우 에러 로그 출력
        console.log("p256dh or auth key가 없음");
      }
    };
    // 컴포넌트 마운트 시 구독 함수 실행
    console.log("subscribe");
    subscribe();
  }, []);


  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRouter />}>
            <Route index element={<Main />} />
            {/* 투자 */}
            <Route path="/investing">
              <Route index element={<Investing />} />
              <Route path="game/:gametype" element={<InvestingGame />} />
            </Route>
            {/* 시장 */}
            <Route path="/market">
              <Route index element={<Market />} />
              <Route path="parent" element={<ParentShop />} />
              <Route path="npc" element={<NpcShop />} />
              <Route path="inventory" element={<Inventory />} />
            </Route>
            {/* 저축통장 */}
            <Route path="/savings" element={<Savings />} />
            {/* 퀘스트 */}
            <Route path="/quest">
              <Route index element={<Quest />} />
              <Route path="detail/:questType" element={<QuestDetail />} />
              <Route path="detail/complete" element={<QuestComplete />} />
            </Route>
            {/* 포포 키우기 */}
            <Route path="/raising" element={<Raising />} />
            {/* 감정일기 */}
            <Route path="/emotionDiary">
              <Route index element={<EmotionDiary />} />
              <Route path="write" element={<DiaryWrite />}></Route>
            </Route>
            {/* 출석 */}
            <Route path="/attandance" element={<Attandance />} />
            {/* 퀴즈 */}
            <Route path="/quiz">
              <Route index element={<Quiz />} />
              <Route path="level-select" element={<QuizLevelSelect />}></Route>
              <Route path=":level" element={<QuizTopicSelect />}></Route>
              <Route path=":level/:topic" element={<QuizPlay />}></Route>
            </Route>
          </Route>
          {/* 로그인 */}
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
