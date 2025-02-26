import { api } from "./api";

export const fetchTask = async (taskId: string) => {
  try {
    const response = await api.get(`/api/tasks/${taskId}`);
    console.log(response.data);
  } catch (error) {
    console.error("Error project detail list:", error);
  }
};

export const createTask = async (taskData: CreateTask) => {
  try {
    const response = await api.post("/api/tasks/create", { taskData });
    console.log("생성된 업무:", response.data);
    return response.data;
  } catch (error) {
    console.error("업무 생성 실패:", error);
    throw error;
  }
};
