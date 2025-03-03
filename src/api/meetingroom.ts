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

//AI 회의록 생성 API
export const getAINote = async (
  chatRoomId: number,
  title: string,
  startTime: string,
  endTime: string
): Promise<CreateAIMessage> => {
  try {
    const encodedTitle = encodeURI(title);
    const encodedStartTime = encodeURI(startTime);
    const encodedEndTime = encodeURI(endTime);
    const response = await api.get(
      `/api/report/create/${chatRoomId}/${encodedTitle}?startTime=${encodedStartTime}&endTime=${encodedEndTime}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("AI회의록 불러오기 에러", error);
    throw error;
  }
};

// AI 회의록 수정 API
export const editAINote = async (
  reportId: number,
  content: string | undefined
): Promise<void> => {
  try {
    console.log("AI 회의록 수정 요청:", { reportId, content });

    const response = await api.post(`/api/report/modify/${reportId}`, content, {
      headers: {
        "Content-Type": "text/plain",
      },
    });

    console.log("AI 회의록 수정 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("AI회의록 수정 실패", error);
    throw error;
  }
};

// AI 회의록 삭제 API
export const deleteAINote = async (reportId: number): Promise<void> => {
  try {
    console.log("AI 회의록 삭제 요청 reportId:", reportId);
    await api.post(`/api/report/delete/${reportId}`);
    console.log("AI 회의록 삭제 성공");
  } catch (error) {
    console.error("AI회의록 삭제 실패", error);
    throw error;
  }
};

// AI 회의록 목록 조회 API
export const getAINoteList = async (
  chatroomId: number
): Promise<AINoteListType[]> => {
  try {
    console.log("AI 회의록 조회 요청 URL:", `/api/report/list/${chatroomId}`);
    const response = await api.get(`/api/report/list/${chatroomId}`);
    console.log("AI 회의록 조회 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("AI회의록 조회 실패", error);
    throw error;
  }
};
