import apiClient from "../axios";

export const tutorialComplete = async () => {
    try {
        const response = await apiClient.put("/auth/tutorial/complete");
        return response.data;
    } catch (error) {
        console.error("튜토리얼 완료 실패:", error);
        return false;
    }
};