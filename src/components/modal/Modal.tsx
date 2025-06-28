
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

// Modal 컴포넌트의 props 타입 정의
interface ModalProps {
  isOpen?: boolean; // 모달이 열려있는지 여부
  onClose?: () => void; // 모달을 닫는 함수
  children?: React.ReactNode; // 모달 내부에 표시될 내용
}

/**
 * Modal 컴포넌트
 */
export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  // 모달이 닫혀있으면 null 반환
  if (!isOpen) return null;

  return (
    <ModalPortal>
      {/* 모달 오버레이: 배경을 어둡게 하고 모달을 중앙에 배치 */}
      <div
        className="fixed inset-0 bg-black/50 flex justify-center items-center z-1000 font-TJ"
        onClick={() => {
          onClose?.();
        }}
      >
        {/* 모달 컨텐츠: 흰색 배경의 실제 모달 내용 */}
        {children}
      </div>
    </ModalPortal>
  );
};

// ModalPortal 컴포넌트의 props 타입 정의
interface ModalPortalProps {
  children: React.ReactNode;
}

/**
 * ModalPortal 컴포넌트
 * React의 createPortal을 사용하여 모달을 DOM의 다른 위치에 렌더링합니다.
 * 이는 모달이 다른 요소들 위에 표시되도록 보장합니다.
 */
const ModalPortal = ({ children }: ModalPortalProps) => {
  // 컴포넌트가 마운트되었는지 추적하는 상태
  const [mounted, setMounted] = useState(false);

  // 컴포넌트가 마운트될 때와 언마운트될 때 상태를 업데이트
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // 컴포넌트가 마운트되지 않았다면 null 반환
  if (!mounted) return null;

  // modal-root 엘리먼트를 찾아서 portal 생성
  let modalRoot = document.getElementById("modal-root");
  if (!modalRoot) {
    // modal-root가 없으면 생성
    modalRoot = document.createElement("div");
    modalRoot.id = "modal-root";
    document.body.appendChild(modalRoot);
  }

  // createPortal을 사용하여 children을 modal-root에 렌더링
  return createPortal(children, modalRoot);
};
