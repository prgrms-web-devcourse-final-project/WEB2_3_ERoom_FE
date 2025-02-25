import axios from "axios";
import { api } from "../../api/api";

// 임시 Url
export const getProjectDetail = async (projectId: string) => {
  try {
    const { data } = await axios.get("http://localhost:3000/project-detail");

    // 임시
    const findProject = data.find(
      (project: any) => project.projectId === +projectId
    );
    return findProject;
  } catch (error) {
    console.error(error);
  }
};
