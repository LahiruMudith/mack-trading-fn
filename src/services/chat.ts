import api from "./api.ts"; // Your existing axios instance

export const sendMessageToAI = async (message: string) => {
    try {
        const response = await api.post("/chat/message", { message });
        return response.data.reply;
    } catch (error: any) {
        throw error.response?.data?.message || "AI is offline";
    }
};