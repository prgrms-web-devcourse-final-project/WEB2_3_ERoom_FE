import { api } from "./api";

export const fetchTask = async (taskId: string) => {
  try {
    const response = await api.get(`/api/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_JSESSION}`,
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error("Error project detail list:", error);
  }
};

export const projectDetail = async (projectId: string) => {
  try {
    const response = await api.get(`/api/projects/${projectId}/detail`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_JSESSION}`,
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error("Error project detail list:", error);
  }
};

export const createTask = async (
  projectId: number,
  title: string,
  startDate: string,
  endDate: string,
  status: string,
  assignedMemberId: number,
  participanyIds: number[]
) => {
  try {
    const response = await api.post(
      "/api/tasks/create",
      {
        projectId,
        title,
        startDate,
        endDate,
        status,
        assignedMemberId,
        participanyIds,
      },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_JSESSION}`,
        },
      }
    );
    console.log("생성된 업무:", response.data);
    return response.data;
  } catch (error) {
    console.error("업무 생성 실패:", error);
    throw error;
  }
};
