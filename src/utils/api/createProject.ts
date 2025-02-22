import { api } from "../../api/api";

export const createProject = async (newProjectInfo: any) => {
  try {
    const response = await api.post("/projects", newProjectInfo);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};
