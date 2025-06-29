// 푸시 알림 이벤트 리스너
// 서버에서 푸시 메시지가 전송될 때 실행됨
self.addEventListener('push', function (event) {
    // 푸시 메시지에 데이터가 포함되어 있는지 확인
    if (event.data) {
      // 푸시 메시지 데이터를 JSON으로 파싱
      const data = event.data.json()
      
      // 알림 표시 옵션 설정
      const options = {
        body: data.body,                    // 알림 본문 내용
        icon: data.icon || '/icon.png',     // 알림 아이콘 (기본값: /icon.png)
        // badge: '/badge.png',                // 알림 배지 아이콘, 이게 뭔지 몰라서 그냥 주석처리 해버리기
        vibrate: [100, 50, 100],           // 진동 패턴 (밀리초 단위)
        data: {
          dateOfArrival: Date.now(),        // 알림 도착 시간
          primaryKey: '2',                  // 알림 식별 키
        },
      }
      
      // 알림을 화면에 표시
      // waitUntil은 비동기 작업이 완료될 때까지 서비스 워커를 활성 상태로 유지
      event.waitUntil(self.registration.showNotification(data.title, options))
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