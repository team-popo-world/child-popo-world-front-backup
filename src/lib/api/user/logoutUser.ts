import apiClient from "@/lib/api/axios";

export const logoutUser = async (userEmail: string) => {
    try {
        const response = await apiClient.post("/auth/logout", {
           userEmail,
        });
        return response.data;
    } catch (error) {
        console.error("Error logging out user:", error);
        throw error;
    }
};
