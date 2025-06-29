import apiClient from "@/lib/api/axios";

export const postPushMessage = async (message : string) => {
    try {
        const response = await apiClient.post("/api/push/message", {
            "userId": "",
            "role": "Parent",
            "message": message
        });
        console.log(response);
    } catch (error) {
        console.error("Failed to test alert", error);
        throw error;
    }
}