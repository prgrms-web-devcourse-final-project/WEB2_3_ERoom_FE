import { api } from "./api";

export const fetchProjectList = async () => {
  try {
    const response = await api.get("/api/projects/list ");
    console.log(response.data);
  } catch (error) {
    console.error("Error project detail list:", error);
  }
};

export const createProject = async (
  name: string,
  description: string,
  category: string,
  subCategories1: string[],
  subCategories2: string[],
  startDate: string,
  endDate: string,
  invitedMemberIds: number[]
) => {
  try {
    const response = await api.post("/api/projects/create ", {
      name,
      description,
      category,
      subCategories1,
      subCategories2,
      startDate,
      endDate,
      invitedMemberIds,
    });
    console.log("생성된 프로젝트:", response.data);
    return response.data;
  } catch (error) {
    console.error("프로젝트 생성 실패:", error);
    throw error;
  }
};

export const projectDetail = async (projectId: string) => {
  try {
    const response = await api.get(`/api/projects/${projectId}/detail`);
    console.log("프로젝트 상세정보:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error project detail list:", error);
    throw error;
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    const response = await api.get(`/api/projects/${projectId}/delete`);
    console.log("프로젝트 삭제:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error project delete:", error);
    throw error;
  }
};

export const leaveProject = async (projectId: string) => {
  try {
    const response = await api.get(`/api/projects/${projectId}/leave`);
    console.log("프로젝트 나가기:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error project leave:", error);
    throw error;
  }
};
