import { ProjectSearchResult } from "../types/project";
import { api } from "./api";

// 멤버 검색 API
export const searchMembers = async (name: string): Promise<MemberType> => {
  try {
    const response = await api.get(`/api/search/members`, {
      params: { name },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching members:", error);
    throw error;
  }
};

//프로젝트 검색 API
export const searchProjects = async (
  name: string
): Promise<ProjectSearchResult[]> => {
  try {
    const response = await api.get(`/api/search/projects`, {
      params: { name },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching members:", error);
    throw error;
  }
};
