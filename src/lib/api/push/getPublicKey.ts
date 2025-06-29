import apiClient from "@/lib/api/axios";

export const getPublicKey = async () => {
  try {
    const response = await apiClient.get("/api/push/public-key");
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Failed to subscribe", error);
    throw error;
  }
};
