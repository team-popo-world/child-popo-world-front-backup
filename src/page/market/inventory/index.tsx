import { InventoryTemplate } from "@/module/market/template/inventory";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { playButtonSound, playSound } from "@/lib/utils/sound";
import { getInventory, type InventoryItem } from "@/lib/api/market/getInventory";
import { useProduct } from "@/lib/api/market/useProduct";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import InventoryTTS from "@/assets/sound/pageSound/inventory_tts.wav"
import { postPushMessage } from "@/lib/api/push/postPushMessage";
import { useAuthStore } from "@/lib/zustand/authStore";

export const TEXT_MESSAGE = {
  not_product: {
    text: "아직 상품이 없어요. \n 다음에 찾아주세요!",
    buttonText: "",
  },
  first_and_last: {
    text: "창고를 구경해봐요!",
    buttonText: "",
  },
  first: {
    text: "더 많은 상품을 보고 싶나요?",
    buttonText: "더보기",
  },
  middle: {
    text: "좋은 물건 많죠? \n 다음 것도 볼래요?",
    buttonText: "더보기",
  },
  last: {
    text: "이제 마지막이에요. 처음부터 \n 보고싶으면 여기를 눌러요!",
    buttonText: "처음으로",
  },
};

export default function Inventory() {
  const navigate = useNavigate();
  const [isUseModalOpen, setIsUseModalOpen] = useState(false);
  const [productIndex, setProductIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<InventoryItem | null>(null);
  const queryClient = useQueryClient();
  const { name: userName } = useAuthStore();
  useEffect(() => {
    playSound(InventoryTTS, 1);
  }, []);

  // 인벤토리 아이템 조회
  const { data: storeItems } = useQuery({
    queryKey: ["inventory-items"], 
    queryFn: () => getInventory(),
  })

  const useProductMutation = useMutation({
    mutationFn: (productId: string) => useProduct({ productId }), 
    onSuccess: () => {
      setIsUseModalOpen(false);
      // 인벤토리 아이템 캐시 무효화, 리패치
      queryClient.invalidateQueries({ queryKey: ["inventory-items"], refetchType: "all" });
      // 상품 구매시 메시지
      postPushMessage(`${userName}님이 상품을 사용했어요!`);
    },
    onError: (error) => {
      console.error("Failed to use product", error);
    }
  })

  // 마지막 페이지 인덱스 
  const lastIndex = Math.ceil((storeItems?.length || 0) / 3) - 1;

  const getMessage = () => {
    if (storeItems?.length === 0) {
      return TEXT_MESSAGE.not_product;
    }
    if (productIndex === 0 && lastIndex === 0) {
      return TEXT_MESSAGE.first_and_last;
    }
    if (productIndex === 0) {
      return TEXT_MESSAGE.first;
    }
    if (productIndex === lastIndex) {
      return TEXT_MESSAGE.last;
    }
    return TEXT_MESSAGE.middle;
  };

  const currentMessage = getMessage();

  const handleSpeechBubbleClick = () => {
    playButtonSound();
    
    if (currentMessage.buttonText === "더보기") {
      setProductIndex((prev) => prev + 1);
    } else if (currentMessage.buttonText === "처음으로") {
      setProductIndex(0);
    }
  };

  const handleProductClick = (product: InventoryItem) => {
    playButtonSound();
    setSelectedProduct(product);
    setIsUseModalOpen(true);
  };

  const handleBack = () => {
    navigate("/market", { state: { from: "inventory" } });
  };

  const handleUseProduct = (exp?: number) => {
    playButtonSound();
    
    if (exp && exp > 0) {
      setIsUseModalOpen(false);
      navigate("/raising", { state: { from: "inventory" } });
      return; 
    }

    useProductMutation.mutate(selectedProduct?.productId || "" )
    setIsUseModalOpen(false);
  };

  return (
    <InventoryTemplate
      isUseModalOpen={isUseModalOpen}
      setIsUseModalOpen={setIsUseModalOpen}
      storeItems={storeItems || []}
      productIndex={productIndex}
      selectedProduct={selectedProduct}
      currentMessage={currentMessage}
      handleSpeechBubbleClick={handleSpeechBubbleClick}
      handleProductClick={handleProductClick}
      handleBack={handleBack}
      handleUseProduct={handleUseProduct}
    />
  );
}
