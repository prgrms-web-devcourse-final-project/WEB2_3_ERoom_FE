import { api } from "./api";

export const getMeetingroom = async (projectId: number) => {
  try {
    const response = await api.get(`/api/projects/${projectId}/chatroom`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_JSESSION}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error project detail list:", error);
    throw error;
  }
};
