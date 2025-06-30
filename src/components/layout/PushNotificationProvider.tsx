import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";

interface PushNotificationProviderProps {
  queryClient: QueryClient;
}

const PushNotificationProvider = ({ queryClient }: PushNotificationProviderProps) => {
  useEffect(() => {
    // 서비스 워커로부터 메시지 수신
    const handleMessage = (event: MessageEvent) => {
      console.log('푸시 알림 수신됨:', event?.data);
      // 
      if (event.data && event.data.type === 'PUSH_NOTIFICATION_RECEIVED') {
        
        // 퀘스트라는 텍스트가 포함되있다면
        if(event.data.data.includes("퀘스트")) {
          // 퀘스트 데이터 캐시 무효화
          queryClient.invalidateQueries({ queryKey: ["quest"] });
        }

        // 부모님 상품 
        if(event.data.data.includes("상품")) {
          queryClient.invalidateQueries({ queryKey: ["store-items", "parent"] });
          queryClient.invalidateQueries({ queryKey: ["inventory-items"] });
        }
      }
    };
    // 메시지 리스너 등록
    navigator.serviceWorker.addEventListener('message', handleMessage);

    // 클린업
    return () => {
      navigator.serviceWorker.removeEventListener('message', handleMessage);
    };
  }, [queryClient]);

  return <Outlet />;
};

export default PushNotificationProvider;