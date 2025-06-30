import { Background } from "@/components/layout/Background";
import { TextWithStroke } from "@/components/text/TextWithStroke";
import { Link } from "react-router-dom";
import { Poni } from "../components/Poni";
import { BackArrow } from "@/components/button/BackArrow";
import { IMAGE_URLS } from "@/lib/constants/constants";
import NameAndPoint from "@/components/user/NameAndPoint";
import SoundButton from "@/components/button/SoundButton";
import { playButtonSound } from "@/lib/utils/sound";

// 포니 초기 위치
const INITIAL_POSITION = {
  right: { top: "19rem", left: "-1rem" },
  left: { top: "18rem", left: "2rem" },
};

// 포니 목표 위치
const TARGET_POSITION = {
  right: { top: "20rem", left: "2rem" },
  left: { top: "19rem", left: "-1rem" },
};

interface MarketTemplateProps {
  isAnimate: boolean | null;
  isMounted: boolean;
  direction: "right" | "left";
  handleBack: () => void;
  handleAnimationComplete: () => void;
}

export const MarketTemplate = ({
  isAnimate,
  direction,
  isMounted,
  handleBack,
  handleAnimationComplete,
}: MarketTemplateProps) => {
  return (
    <Background backgroundImage={IMAGE_URLS.market.bg}>
      {/* 뒤로가기키 */}
      <BackArrow onClick={handleBack} />
      {/* 음소거 버튼 */}
      <SoundButton />
      {/* 이름 포인트 */}
      <NameAndPoint />
      {/* 처음 페이지 방문했을때 포니 배타고 오는것 */}
      {isMounted && (
      <Poni
        initialPosition={INITIAL_POSITION[direction]}
        isAnimate={isAnimate}
        targetPosition={TARGET_POSITION[direction]}
          direction={direction}
          onAnimationComplete={handleAnimationComplete}
        />
      )}

      {/* 제목 */}
      <div className=" top-6  flex justify-center items-center mt-6">
        <div className="shadow-md px-5 rounded-2xl bg-[#ffda46e2]">
        <TextWithStroke
            text="포포 시장"
            className="mt-[0.1rem] "
          textClassName="text-main-red-500 text-[2.8rem] font-semibold"
          strokeClassName="text-main-yellow-300 text-[2.8rem] font-semibold   text-stroke-width-[0.25rem] text-stroke-color-main-black-500"
        />
</div>
      </div>

      {/* npc 상점 */}
      <Link to="/market/npc" onClick={() => playButtonSound()}  >
        <div className="flex flex-col items-center justify-center absolute top-[8.5rem] left-[11rem] ">
          <img src={IMAGE_URLS.market.npc_shop} alt="npc_shop" className="w-38 object-contain" />
          <div className="px-[1rem] text-[0.8rem] py-[2px] -ml-3 -mt-3 font-bold text-[#5C3600] bg-[#ffe46a] border-[0.14rem] border-[#fc9a18] rounded-lg ">
            NPC 상점
          </div>
        </div>
      </Link>
      {/* 포포 창고 */}
      <Link to="/market/inventory" onClick={() => playButtonSound()}>
        <div className="flex flex-col items-center justify-center absolute bottom-[0.8em] right-[10rem]">
          <img src={IMAGE_URLS.market.inventory} alt="inventory" className="w-[8.3rem] object-contain " />
          <div className="px-[1rem] text-[0.8rem] py-[2px] mt-[-1rem] font-bold text-[#5C3600] bg-[#F6D8B8] border-[0.14rem] border-[#97784A] rounded-lg ">
            창고
          </div>
        </div>
      </Link>
      {/* 부모님 상점 */}
      <Link to="/market/parent" onClick={() => playButtonSound()}>
        <div className="flex flex-col items-center justify-center absolute top-[9.8rem] right-[4.4rem] ">
          <img src={IMAGE_URLS.market.parent_shop} alt="parent_shop" className="w-[8.4rem] object-contain" />
          <div className="px-[0.8rem] text-[0.8rem] py-[2px] mt-[-0.65rem] font-bold text-[#5C3600] bg-[#f2f7fe] border-[0.14rem] border-[#233e5b] rounded-lg ">
            부모님 상점
          </div>
        </div>
      </Link>
    </Background>
  );
};
