import { showToast } from "../utils/toastConfig";
import { api } from "./api";

// 프로젝트 리스트 정보 가져오는 API
export const getProjectList = async () => {
  try {
    const response = await api.get("/api/projects/list");
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
    const response = await api.post("/api/projects/create", projectData);
    console.log("생성된 프로젝트:", response);
    if (response.status === 201) {
      showToast("success", "프로젝트가 생성되었습니다.");
    } else {
      showToast("error", "에러가 발생했습니다.");
    }
    return response.data;
  } catch (error) {
    console.error("프로젝트 생성 실패:", error);
    throw error;
  }
};

//프로젝트 수정 전 기존 프로젝트 정보 불러오기
export const getProjectById = async (
  projectId: string
): Promise<GetProjectById> => {
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
  projectId: number,
  updateData: patchProjectRequestType
): Promise<patchProjectResponseType> => {
  try {
    const response = await api.patch(
      `/api/projects/${projectId}/update`,
      updateData
    );
    console.log("프로젝트 수정 성공", response);
    if (response.status === 204) {
      showToast("success", "프로젝트가 수정되었습니다.");
    } else {
      showToast("error", "에러가 발생했습니다.");
    }
    return response.data;
  } catch (error: any) {
    console.error("프로젝트 수정 오류", error);
    Object.values(error.response.data as string).forEach((value: string) =>
      showToast("error", value)
    );
    throw new Error("프로젝트 수정하기 오류");
  }
};

// 프로젝트 상세
export const getProjectDetail = async (projectId: number) => {
  try {
    const response = await api.get(`/api/projects/${projectId}/detail`);
    console.log("프로젝트 상세정보:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error project detail:", error);
    throw error;
  }
};

// 프로젝트삭제
export const deleteProject = async (projectId: number) => {
  try {
    const response = await api.delete(`/api/projects/${projectId}/delete`);
    console.log("프로젝트 삭제:", response);
    if (response.status === 204) {
      showToast("success", "프로젝트가 삭제되었습니다!");
    } else {
      showToast("error", "에러가 발생했습니다.");
    }
    return response;
  } catch (error) {
    console.error("Error project delete:", error);
    throw error;
  }
};

// 프로젝트 나가기
export const leaveProject = async (projectId: number) => {
  try {
    const response = await api.delete(`/api/projects/${projectId}/leave`);
    console.log("프로젝트 나가기:", response);
    return response;
  } catch (error) {
    console.error("Error project leave:", error);
    throw error;
  }
};
