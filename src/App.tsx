import { Routes, Route } from "react-router-dom";
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
import { NotFound } from "@/page/notfound/index";
import InvestingGame from "@/page/investing/game";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ParentShop from "./page/market/parent-shop";
import NpcShop from "./page/market/npc-shop";
import Inventory from "./page/market/inventory";
import ProtectedRouter from "@/components/auth/ProtectedRouter";
import LoginPage from "./page/auth/login";
import RegisterPage from "./page/auth/register";
import { BrowserRouter } from "react-router-dom";

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
