import { ParentShopTemplate } from "@/module/market/template/parent-shop";
import {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../lib/zustand/authStore";
import { playButtonSound, playSound } from "@/lib/utils/sound";
import { getStoreItems, type StoreItem } from "@/lib/api/market/getStore";
import { buyProduct } from "@/lib/api/market/buyProduct";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ParentShopTTS1 from "@/assets/sound/pageSound/parent_shop_tts.wav"
import ParentShopTTS2 from "@/assets/sound/pageSound/parent_shop_noProduct.wav"
import { postPushMessage } from "@/lib/api/push/postPushMessage";

export const TEXT_MESSAGE = {
  not_product: {
    text: "아직 준비 중이야~~ \n 엄마가 곧 예쁜 선물 넣어줄게!",
    buttonText: "",
  },
  first_and_last: {
    text: "엄마가 준비한 선물 보러 왔구나\n 마음껏 골라봐~",
    buttonText: "",
  },
  first: {
    text: "엄마가 준비한 선물 보러 왔구나\n 마음껏 골라봐~",
    buttonText: "더보기",
  },
  middle: {
    text: "엄마가 준비한 선물 보러 왔구나\n 마음껏 골라봐~",
    buttonText: "더보기",
  },
  last: {
    text: "이제 마지막이야 !",
    buttonText: "처음으로",
  },
};

export default function NpcShop() {
  const navigate = useNavigate();
  const { setPoint, point, name: userName } = useAuthStore();
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [productIndex, setProductIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<StoreItem | null>(null);
  const [isCompleteOpen, setIsCompleteOpen] = useState(false);
  const [isNoPointModalOpen, setIsNoPointModalOpen] = useState(false);  
  const [currentMessage, setCurrentMessage] = useState<{text: string, buttonText: string} | null>(null);
  const queryClient = useQueryClient();
  const { data: storeItems } = useQuery({
    queryKey: ["store-items", "parent"],
    queryFn: () => getStoreItems("parent"),
  });

  useEffect(() => {
    if(storeItems?.length === 0) {
      playSound(ParentShopTTS2 , 1);
    } else {
      playSound(ParentShopTTS1 , 1);
    }
    
    // 아이템이 사라져서 현재 페이지가 유효하지 않으면 첫 페이지로 이동
    const newLastIndex = Math.ceil((storeItems?.length || 0) / 3) - 1;
    if (productIndex > newLastIndex && newLastIndex >= 0) {
      setProductIndex(0);
    }
  }, [storeItems, productIndex]);

  const purchaseMutation = useMutation({
    mutationFn: (productId: string) => buyProduct({ productId, amount: 1}),
    onSuccess: (response) => {
      setPoint(response.currentPoint); 
      setIsCompleteOpen(true); 
      
      queryClient.invalidateQueries({ queryKey: ["store-items", "parent"], refetchType:"all"});
      queryClient.invalidateQueries({ queryKey: ["inventory-items"], refetchType:"all"});
      // 상품 구매시 메시지
      postPushMessage(`${userName}님이 상품을 구매했어요!`);
    }, 
    onError: (error) => {
      console.error("Failed to buy product", error); 
    }
  })

  const lastIndex = Math.ceil((storeItems?.length || 0) / 3) - 1;
  const getMessage = () => {
    if (storeItems?.length === 0) {
      return TEXT_MESSAGE.not_product;
    }
    if (productIndex === 0 && productIndex === lastIndex) {
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

  useEffect(() => {
    setCurrentMessage(getMessage());
  }, [storeItems, productIndex, lastIndex]);

  const handleSpeechBubbleClick = () => {
    playButtonSound();
    
    if (currentMessage?.buttonText === "더보기") {
      setProductIndex((prev) => prev + 1);
    } else if (currentMessage?.buttonText === "처음으로") {
      setProductIndex(0);
    }
  };

  const handleProductClick = (product: StoreItem) => {
    playButtonSound();
    setSelectedProduct(product);
    setIsPurchaseModalOpen(true);
  };

  const handleBack = () => {
    navigate("/market", { state: { from: "parent-shop" } });
  };

  const handlePurchase = async () => {
    playButtonSound();

   if (selectedProduct?.price && point !== null && point >= 0 && selectedProduct.price > point) {
    setIsNoPointModalOpen(true);
    return;
   }

   purchaseMutation.mutate(selectedProduct?.id || "");  
  };

  const handleComplete = () => {
    playButtonSound();
    setIsCompleteOpen(false);
    setIsPurchaseModalOpen(false);
    setSelectedProduct(null);
    
    // 구매 완료 후 첫 페이지로 이동
    // setProductIndex(0);
  };

  return (
    <ParentShopTemplate
      isPurchaseModalOpen={isPurchaseModalOpen}
      setIsPurchaseModalOpen={setIsPurchaseModalOpen}
      productIndex={productIndex}
      selectedProduct={selectedProduct}
      currentMessage={currentMessage}
      handleSpeechBubbleClick={handleSpeechBubbleClick}
      handleProductClick={handleProductClick}
      storeItems={storeItems || []}
      handleBack={handleBack}
      handlePurchase={handlePurchase}
      isCompleteOpen={isCompleteOpen}
      handleComplete={handleComplete}
      isNoPointModalOpen={isNoPointModalOpen}
      setIsNoPointModalOpen={setIsNoPointModalOpen}
      point={point}
    />
  );
}
