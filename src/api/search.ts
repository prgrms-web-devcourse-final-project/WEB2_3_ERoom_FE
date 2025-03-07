import { api } from "./api";

// 멤버 검색 API (활성 멤버만)
export const searchMembers = async (
  name: string
): Promise<SearchMemberType[]> => {
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
// 멤버 검색 API (비활성 멤버 포함)
export const searchAllMembers = async (
  name: string
): Promise<SearchMemberType[]> => {
  try {
    const response = await api.get(`/api/search/admin/members`, {
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

// 업무 검색 API
export const searchTasks = async (
  title: string
): Promise<TaskSearchResult[]> => {
  try {
    const response = await api.get(`/api/search/tasks`, {
      params: { title },
    });
    console.log("업무 검색 성공", response.data);
    return response.data;
  } catch (error) {
    console.error("업무 검색 실패", error);
    throw error;
  }
};
