import { api } from "./api";

// 멤버 검색 API
export const getMembers = async (name: string) => {
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
