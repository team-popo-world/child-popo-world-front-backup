import apiClient, { ApiError } from "@/lib/api/axios";

export async function postPoint(point: number) {
    try{
        const response = await apiClient.post("/api/quiz/point", { point });
        return response.data;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw error;
    }
}