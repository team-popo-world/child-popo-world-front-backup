import { getPublicKey } from "@/lib/api/push/getPublicKey";
import { urlBase64ToUint8Array, arrayBufferToBase64 } from "@/lib/utils/utils";
import { postSubscribe } from "@/lib/api/push/postSubscribe";

const SUBSCRIPTION_KEY = 'push_subscription_status';

interface SubscriptionStatus {
  endpoint: string;
  timestamp: number;
  expiresAt: number;
}

export const subscribe = async () => {
    try {
      if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
          navigator.serviceWorker.register("/sw.js")
            .then((reg) => {
              console.log("✅ 서비스 워커 등록:", reg);
            })
            .catch((err) => {
              console.error("❌ 서비스 워커 등록 실패:", err);
            });
        });
      }
      
      // 1. 브라우저에 알림 권한 요청
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        console.log('알림 권한이 거부되었습니다.');
        return;
      }
      
      // 2. 서버에서 VAPID 공개키 받아오기
      const publicKey = await getPublicKey();
      
      // 3. 서비스 워커 등록 및 준비 대기
      const registration = await navigator.serviceWorker.register('/sw.js');
      
      // 4. 로컬 스토리지에서 구독 상태 확인
      const storedStatus = localStorage.getItem(SUBSCRIPTION_KEY);
      let subscriptionStatus: SubscriptionStatus | null = null;
      
      if (storedStatus) {
        try {
          subscriptionStatus = JSON.parse(storedStatus);
        } catch (error) {
          console.log('저장된 구독 상태 파싱 실패');
        }
      }
      
      // 5. 기존 구독 확인
      const existingSubscription = await registration.pushManager.getSubscription();
      
      // 6. 기존 구독이 있고 유효한지 확인
      if (existingSubscription && subscriptionStatus) {
        const now = Date.now();
        const isExpired = now > subscriptionStatus.expiresAt;
        const isSameEndpoint = existingSubscription.endpoint === subscriptionStatus.endpoint;
        
        if (!isExpired && isSameEndpoint) {
          console.log('기존 구독이 유효합니다. 새로 구독하지 않습니다.');
          return;
        } else {
          console.log('기존 구독이 만료되었거나 변경되었습니다. 새로 구독합니다.');
          // 기존 구독 해제
          await existingSubscription.unsubscribe();
          localStorage.removeItem(SUBSCRIPTION_KEY);
        }
      } else if (existingSubscription) {
        // 기존 구독은 있지만 로컬 스토리지에 정보가 없는 경우
        console.log('기존 구독이 있지만 로컬 정보가 없습니다. 새로 구독합니다.');
        await existingSubscription.unsubscribe();
      }
      
      // 7. PushManager를 통해 푸시 구독 생성
      const subscription: PushSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });
      
      // 8. 구독 객체에서 암호화 키 추출
      const p256dhKey = subscription.getKey('p256dh');
      const authKey = subscription.getKey('auth');
      
      // 9. 두 키가 모두 존재할 때만 서버로 구독 정보 전송
      if (p256dhKey && authKey) {
        const p256dh = arrayBufferToBase64(p256dhKey);
        const auth = arrayBufferToBase64(authKey);
        await postSubscribe(subscription.endpoint, p256dh, auth);
        
        // 10. 구독 상태를 로컬 스토리지에 저장 (24시간 유효)
        const newStatus: SubscriptionStatus = {
          endpoint: subscription.endpoint,
          timestamp: Date.now(),
          expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24시간
        };
        localStorage.setItem(SUBSCRIPTION_KEY, JSON.stringify(newStatus));
        
        console.log('서버에 구독 정보 전송 완료 및 로컬 저장');
      } else {
        console.log("p256dh or auth key가 없음");
      }
    } catch (error) {
      console.error('푸시 알림 구독 실패:', error);
    }
  };