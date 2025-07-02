import { BackArrow } from "@/components/button/BackArrow";
import { Background } from "@/components/layout/Background";
import { IMAGE_URLS } from "@/lib/constants/constants";
import { InventorySpeechBubble } from "../components/SpeechBubble";
import { InventoryDarkWoodTitle } from "../components/WoodTitle";
import { Modal } from "@/components/modal/Modal";
import { InventoryModal } from "../components/InventoryModal";
import NameAndPoint from "@/components/user/NameAndPoint";
import type { InventoryItem } from "@/lib/api/market/getInventory";
import { TextWithStroke } from "@/components/text/TextWithStroke";
import SoundButton from "@/components/button/SoundButton";
import { useEffect } from "react";

interface InventoryTemplateProps {
  isUseModalOpen: boolean;
  setIsUseModalOpen: (isOpen: boolean) => void;
  productIndex: number;
  selectedProduct: InventoryItem | null;
  currentMessage: { text: string; buttonText: string };
  handleSpeechBubbleClick: () => void;
  handleProductClick: (product: InventoryItem) => void;
  storeItems: InventoryItem[];
  handleBack: () => void;
  handleUseProduct: (exp?: number ) => void;
}

export const InventoryTemplate = ({
  isUseModalOpen,
  setIsUseModalOpen,
  productIndex: productIndex,
  selectedProduct,
  currentMessage,
  handleSpeechBubbleClick,
  handleProductClick,
  storeItems,
  handleBack,
  handleUseProduct,
}: InventoryTemplateProps) => {
  
  // 디버깅 로그
  useEffect(() => {
    console.log('productIndex:', productIndex, 'storeItems length:', storeItems.length);
  }, [productIndex, storeItems.length]);

  return (
    <Background backgroundImage={IMAGE_URLS.market.inventory_bg}>
      {/* 뒤로가기 */}
      <BackArrow onClick={handleBack} />
      {/* 음소거 버튼 */}
      <SoundButton />
      {/* 이름과 포인트 */}
      <NameAndPoint />
      {/* 제목 */}
      <InventoryDarkWoodTitle title="창고" />
      {/* 말풍선 */}
      <InventorySpeechBubble
        text={currentMessage.text}
        buttonText={currentMessage.buttonText}
        onClick={() => {
          handleSpeechBubbleClick()
        }}
      />
      <Modal isOpen={isUseModalOpen} >
        <InventoryModal
          text={selectedProduct?.name || ""}
          price={selectedProduct?.price || 0}
          image={selectedProduct?.imageUrl || ""}
          exp={selectedProduct?.exp || 0}
          onConfirm={handleUseProduct}
          onClose={() => setIsUseModalOpen(false)}
        />
      </Modal>
      {/* 상품들 */}
      <div className="absolute top-39 left-43 w-75 flex flex-col gap-y-5">
        {Array(3)
          .fill(0)
          .map((_, row) => {
            const startIndex = productIndex * 9 + row * 3;
            const endIndex = productIndex * 9 + (row + 1) * 3;
            const rowItems = storeItems.slice(startIndex, endIndex);
            console.log('startIndex:', startIndex, 'endIndex:', endIndex)
            console.log('rowItems:', rowItems)
            console.log('row:', rowItems.map((product) => product.name))
            return (
              <div key={row + productIndex} className="flex items-center gap-x-13">
                {rowItems.map((product,index) => (
                  <div
                    className="relative w-[3.8rem] active:scale-95 transition-all duration-100 flex flex-col items-center gap-y-1"
                    key={`${product.name}, ${index}`}
                    onClick={() => {
                      handleProductClick(product)
                    }}
                  >
                    <img src={product.imageUrl} alt={product.name} className="w-10 h-10 object-contain" />
                    <div className="bg-[#5C3600] py-0.5 px-1 text-[0.5rem] text-[#FFEDDA] text-center rounded-md whitespace-nowrap max-w-[3.8rem] truncate">
                      {product.name}
                    </div>
                    {/* 재고 표시 */}
                    {product.exp > 0 && (
                    <div className="absolute top-6 left-10">
                      <TextWithStroke
                        text={product.stock.toString()}
                        textClassName="text-[#060502] font-bold text-[0.6rem]"
                        strokeClassName="text-[#FFF9D7] font-bold text-[0.6rem] text-stroke-width-[0.12rem] text-stroke-color-[#FFF9D7]"
                      />
                    </div>
                    )}
                  </div>
                ))}
              </div>
            );
          })}
      </div>
    </Background>
  );
};


