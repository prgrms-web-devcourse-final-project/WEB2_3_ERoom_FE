import { api } from "./api";

// 업무 생성
export const createTask = async (taskData: CreateTask) => {
  try {
    const response = await api.post("/api/tasks/create", taskData);
    console.log("생성된 업무:", response.data);
    return response.data;
  } catch (error) {
    console.error("업무 생성 실패:", error);
    throw error;
  }
};

// 업무 수정 정보 (기존 업무 정보)
export const getTaskById = async (taskId: number) => {
  try {
    const response = await api.get(`/api/tasks/${taskId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error task by Id:", error);
    throw new Error("특정 업무 정보 불러오기 오류");
  }
};

// 업무 수정
export const updateTask = async (taskId: number, updateData: UpdateTask) => {
  try {
    const response = await api.put(`/api/tasks/${taskId}`, updateData);
    console.log("수정된 업무:", response.data);
    return response.data;
  } catch (error) {
    console.error("업무 수정 실패:", error);
    throw error;
  }
};

// 업무 삭제
export const deleteTask = async (taskId: number) => {
  try {
    const response = await api.delete(`/api/tasks/${taskId}`);
    console.log("삭제된 업무:", response.data);
    return response.data;
  } catch (error) {
    console.error("업무 삭제 실패:", error);
    throw error;
  }
};
