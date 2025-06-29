import { WEEK } from "@/page/attandance";
import { getKSTDateTime } from "@/lib/utils/getKSTDateTime";

export const getToday = () => {
    const today = getKSTDateTime();
    const date = new Date(today);
    return WEEK[date.getDay() - 1 < 0 ? 6 : date.getDay() - 1];
  };
  
  export const getYesterday = () => {
    const today = getKSTDateTime();
    const date = new Date(today);
    return WEEK[date.getDay() - 2 < 0 ? 6 : date.getDay() - 2];
  };    


  // Base64 문자열을 Uint8Array로 변환하는 유틸리티 함수
// VAPID 공개키를 웹 푸시 API에서 사용할 수 있는 형식으로 변환
// base64url -> base64 -> Uint8Array
export function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function arrayBufferToBase64(buffer: ArrayBuffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}