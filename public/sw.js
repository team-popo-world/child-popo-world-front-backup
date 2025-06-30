  // 1. 핸드폰 기기에서 알림 권한 요청
  // 2. 서버에서 공개키 받음
  // 3. 공개키로 구독 정보 생성
  // 4. 구독 정보를 서버로 보냄
  // 5. 서버에서 푸시 메시지 전송
  // 6. 푸시 메시지 수신
  // 7. 푸시 메시지 표시
  // 8. 푸시 메시지 클릭 시 앱 실행
  // 9. 푸시 메시지 삭제

  
self.addEventListener("install", (event) => {
  self.skipWaiting();
  console.log("[SW] Installed");
});

self.addEventListener("activate", (event) => {
  clients.claim();
  console.log("[SW] Activated");
});

self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
});


// 푸시 알림 이벤트 리스너
// 서버에서 푸시 메시지가 전송될 때 실행됨, 알림 올떄 
self.addEventListener('push', function (event) {
    // 푸시 메시지에 데이터가 포함되어 있는지 확인
    if (event.data) {
      try {
        // 알림 텍스트온거 
        const text = event.data.text();
        const options = {
          body: text,                    // 알림 본문 내용
          icon: '/icon.png',             // 알림 아이콘 (기본값: /icon.png)
          vibrate: [100, 50, 100],        // 진동 패턴 (밀리초 단위)
          data: {
            dateOfArrival: Date.now(),    // 알림 도착 시간
            primaryKey: '2',              // 알림 식별 키
          },
        };
        // 알림 표시
        event.waitUntil(self.registration.showNotification('알림', options));   
        // 알림 표시후 메인 앱에 메시지 전송, 이게 클라이언트들 이라고 뜨는 이유는 모든 탭들이 클라이언트들이기 때문
        // 여기서 메인 앱에 메시지 전송
        event.waitUntil(
          self.clients.matchAll().then(clients => {
            clients.forEach(client => {
              client.postMessage({
                type: 'PUSH_NOTIFICATION_RECEIVED',
                data: text
              });
            });
          })
        );
      } catch (error) {
        console.error('푸시 알림 처리 중 오류 발생:', error);
      }
    }
  })
   
// 알림 클릭 이벤트 리스너
// 사용자가 알림을 클릭했을 때 실행됨
self.addEventListener('notificationclick', function (event) {
    console.log('Notification click received.')  // 알림 클릭 로그 출력
    // 클릭된 알림을 닫음
    event.notification.close()
    clients.openWindow('/') // 클릭 시 열 URL, 이걸 우리어플로 해야하는건가? 
  })