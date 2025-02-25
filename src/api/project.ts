import { update } from "lodash";
import {
  patchProjectByIdType,
  patchProjectRequestType,
  patchProjectResponseType,
  postProjectType,
  ProjectDetailType,
  ProjectListType,
} from "../types/project";
import { api } from "./api";

// 프로젝트 리스트 정보 가져오는 API
export const getProjectList = async (): Promise<ProjectListType> => {
  try {
    const response = await api.get("/api/projects/list ");
    const response = await api.get("/api/projects/list ");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error project detail list:", error);
    throw new Error("프로젝트 목록 불러오기 오류");
  }
};

//프로젝트 생성 API
export const postProject = async (projectData: postProjectType) => {
  try {
    const response = await api.post("/api/projects/create ", projectData);
    console.log("생성된 프로젝트:", response.data);
    return response.data;
  } catch (error) {
    console.error("프로젝트 생성 실패:", error);
    throw error;
  }
};

//프로젝트 수정 전 기존 프로젝트 정보 불러오기
export const getProjectById = async (
  projectId: string
): Promise<ProjectDetailType> => {
  try {
    const response = await api.get(`/api/projects/${projectId}/edit`, {
      params: { projectId },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error project by Id:", error);
    throw new Error("특정 프로젝트 정보 불러오기 오류");
  }
};

//프로젝트 수정 API
export const patchProjectById = async (
  projectId: string,
  updateData: patchProjectRequestType
): Promise<patchProjectResponseType> => {
  try {
    const response = await api.patch(
      ` /api/projects/${projectId}/update`,
      updateData
    );
    console.log("프로젝트 수정 성공", response.data);
    return response.data;
  } catch (error) {
    console.error("프로젝트 수정 오류", error);
    throw new Error("프로젝트 수정하기 오류");
  }
};
