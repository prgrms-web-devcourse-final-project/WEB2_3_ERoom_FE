import { api } from "../../api/api";

export const getProjectDetail = async (projectId: string) => {
  try {
    const { data } = await api.get("/project-detail");

    // 임시
    const findProject = data.find(
      (project: any) => project.projectId === +projectId
    );
    return findProject;
  } catch (error) {
    console.error(error);
  }
};
