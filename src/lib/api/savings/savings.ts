import apiClient from "../axios";

// 저축통장 생성 요청 타입
interface CreateSavingsRequest {
  goalAmount: number;
  createdAt: string;
  endDate: string;
  rewardPoint: number;
}

// 저축통장 생성 응답 타입
interface CreateSavingsResponse {
  success: boolean;
  message: string;
}

// 저축통장 정보 응답 타입
interface SavingsAccountInfo {
  status: string;
  goalAmount: number;
  accountPoint: number;
  createdDate: string;
  endDate: string;
}

// 입금 요청 타입
interface DepositRequest {
  depositPoint: number;
  success: boolean;
}

// 입금 응답 타입
interface DepositResponse {
  accountPoint: number;
  currentPoint: string;
}

// 저축통장 생성
export const createSavingsAccount = async ({
  goalAmount,
  createdAt,
  endDate,
  rewardPoint,
}: CreateSavingsRequest): Promise<CreateSavingsResponse> => {
  try {
    const response = await apiClient.post("/api/saveAccount", {
      goalAmount,
      createdAt,
      endDate,
      rewardPoint,
    });
    return { success: true, message: response.data };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// 저축통장 정보 조회
export const getSavingsAccount = async (): Promise<SavingsAccountInfo | null> => {
  try {
    const response = await apiClient.get("/api/saveAccount");
    return response.data;
  } catch (error) {
    console.error("저축통장 정보 조회 실패:", error);
    return null;
  }
};

// 입금하기
export const depositToSavings = async ({
  depositPoint,
  success,
}: DepositRequest): Promise<DepositResponse> => {
    const response = await apiClient.put("/api/saveAccount/dailyDeposit", {
      depositPoint,
      success,
    });
    return response.data;
}; 