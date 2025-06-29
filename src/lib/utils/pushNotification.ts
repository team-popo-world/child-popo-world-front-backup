import { getPublicKey } from "@/lib/api/push/getPublicKey";
import { testAlert } from "@/lib/api/push/testAlert";
import { urlBase64ToUint8Array, arrayBufferToBase64 } from "@/lib/utils/utils";
import { postSubscribe } from "@/lib/api/push/postSubscribe";
export const subscribe = async () => {
    try {
      if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
          navigator.serviceWorker.register("/sw.js")
            .then((reg) => {
              console.log("✅ Service Worker registered:", reg);
            })
            .catch((err) => {
              console.error("❌ Service Worker registration failed:", err);
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
      console.log("publicKey", publicKey);
      
      // 3. 서비스 워커 등록 및 준비 대기
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log("registration", registration);
      
      // 기존 구독 해제
      const existingSubscription = await registration.pushManager.getSubscription();
      if (existingSubscription) {
        await existingSubscription.unsubscribe();
        console.log('기존 구독 해제 완료');
      }
      
      // 4. PushManager를 통해 푸시 구독 생성
      const subscription: PushSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });
      
      // 5. 구독 객체에서 암호화 키 추출
      const p256dhKey = subscription.getKey('p256dh');
      const authKey = subscription.getKey('auth');
      console.log("p256dhKey", p256dhKey);
      console.log("authKey", authKey);
      
      // 6. 두 키가 모두 존재할 때만 서버로 구독 정보 전송
      if (p256dhKey && authKey) {
        const p256dh = arrayBufferToBase64(p256dhKey);
        const auth = arrayBufferToBase64(authKey);
        const response = await postSubscribe(subscription.endpoint, p256dh, auth);
        console.log("response, postSubscribe", response);
        await testAlert();
      } else {
        console.log("p256dh or auth key가 없음");
      }
    } catch (error) {
      console.error('푸시 알림 구독 실패:', error);
    }
  };