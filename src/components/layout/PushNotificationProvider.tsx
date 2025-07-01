import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/lib/zustand/authStore"
import { subscribe } from "@/lib/utils/pushNotification";
interface PushNotificationProviderProps {
  queryClient: QueryClient;
}

const PushNotificationProvider = ({ queryClient }: PushNotificationProviderProps) => {
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    // 로그인하지 않은 상태에서는 리스너 등록하지 않음
    if (!isAuthenticated) {
      return;
    }

    // 서비스 워커로부터 메시지 수신
    const handleMessage = (event: MessageEvent) => {


      if (event.data && event.data.type === "PUSH_NOTIFICATION_RECEIVED") {
        // 퀘스트 데이터 갱신
        if (event.data.data.includes("퀘스트")) {
          queryClient.invalidateQueries({ queryKey: ["quest"] });
        }

        // 상품 데이터 갱신
        if (event.data.data.includes("상품")) {
          console.log("상품 데이터 갱신");
          queryClient.invalidateQueries({ queryKey: ["inventory-items"] });
          queryClient.invalidateQueries({ queryKey: ["store-items", "parent"] });
        }
      }
    };

    // 메시지 리스너 등록
    const newSubscription = async () => {
      await subscribe();
      if (!navigator.serviceWorker) {
        console.log("Service Worker not supported");
        return;
      }
      navigator.serviceWorker.addEventListener("message", handleMessage);
    }

    newSubscription();
    console.log("Push notification listener registered for authenticated user");

    // 클린업
    return () => {
      navigator.serviceWorker.removeEventListener("message", handleMessage);
      console.log("Push notification listener removed");
    };
  }, [queryClient, isAuthenticated]);

  return <Outlet />;
};

export default PushNotificationProvider;
