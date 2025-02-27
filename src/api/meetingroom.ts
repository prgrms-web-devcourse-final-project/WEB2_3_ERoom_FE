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

//AI 회의록 가져오는 API
export const getAINote = async (
  chatRoomId: number,
  startTime: string,
  endTime: string
): Promise<AINoteType> => {
  try {
    const response = await api.get(
      `/api/report/${chatRoomId}?startTime=${startTime}&endTime=${endTime}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("AI회의록 불러오기 에러", error);
    throw error;
  }
};
