import apiClient from "@/lib/api/axios";

export const postSubscribe = async (endpoint: string, p256dh: string, auth: string) => {
  try {
    const response = await apiClient.post("/api/push/subscribe", {
      endpoint: endpoint,
      p256dh: p256dh,
      auth: auth,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
