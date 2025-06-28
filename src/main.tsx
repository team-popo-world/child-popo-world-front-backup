import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  // 리프레쉬 토큰 땜에 이렇게 해야함...
  <StrictMode>
    <App />
  </StrictMode>
);
