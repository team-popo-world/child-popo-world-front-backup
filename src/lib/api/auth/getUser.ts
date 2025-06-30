import apiClient from "@/lib/api/axios";

export const getUser = async () => {
  try {
    const response = await apiClient.get("/auth");
    console.log("response", response.headers);
    console.log("getUser", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
