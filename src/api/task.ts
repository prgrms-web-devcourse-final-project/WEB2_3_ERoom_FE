import { api } from "./api";

// 업무 생성
export const createTask = async (taskData: CreateTask) => {
  try {
    const response = await api.post("/api/tasks/create", taskData);

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

    return response.data;
  } catch (error) {
    console.error("업무 삭제 실패:", error);
    throw error;
  }
};

// 담당 업무 리스트
export const getAssignedTaskList = async (memberId: number) => {
  try {
    const response = await api.get(`/api/tasks/member/${memberId}`);

    return response.data;
  } catch (error) {
    console.error("담당 업무 불러오기 실패:", error);
    throw error;
  }
};
