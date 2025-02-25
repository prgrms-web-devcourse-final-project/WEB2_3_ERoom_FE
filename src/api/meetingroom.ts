import { api } from "./api";

//미팅룸 채팅 내역 가져오는 API
export const getMeetingroom = async (
  projectId: number
): Promise<MeetingroomType> => {
  try {
    const response = await api.get(`/api/projects/${projectId}/chatroom`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error chat list:", error);
    throw error;
  }
};
