import { showToast } from "../utils/toastConfig";
import { api } from "./api";

// 관리자 대시보드
export const getAdminDashboard = async () => {
  try {
    const { data } = await api.get("/admin/dashboard");

    return data;
  } catch (error) {
    throw error;
  }
};

// 관리자 활성 계정 관리
export const getMemberList = async () => {
  try {
    const response = await api.get("/admin/manage/member/list", {
      params: { status: "active" },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching member list:", error);
    throw error;
  }
};

// 관리자 계정 관리 수정
export const editAdminAccount = async (
  member_id: number,
  editAccountInfo: EditAccountType
) => {
  try {
    const response = await api.put(
      `/admin/manage/member/${member_id}/modify`,
      editAccountInfo
    );

    if (response.status === 200) {
      showToast("success", "계정 이름이 수정되었습니다.");
    } else {
      showToast("error", "에러가 발생했습니다.");
    }
    return response;
  } catch (error) {
    console.error(error);
  }
};

// 관리자 비활성화 계정 관리
export const getInActiveMemberList = async () => {
  try {
    const response = await api.get("/admin/manage/member/list", {
      params: { deleteStatus: "deleted" },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching member list:", error);
  }
};

// 관리자 계정 비활성(삭제)
export const deleteAdminAccount = async (member_id: number) => {
  try {
    const response = await api.delete(
      `/admin/manage/member/${member_id}/delete`
    );

    if (response.status !== 204) {
      showToast("error", "에러가 발생했습니다.");
    }
    return response;
  } catch (error) {
    console.error(error);
  }
};

// 관리자 계정 활성 전환(복구)
export const adminRestoreAccount = async (memberId: number) => {
  try {
    const response = await api.patch(
      `/admin/manage/member/${memberId}/activate`
    );

    if (response.status !== 200) {
      showToast("error", "에러가 발생했습니다.");
    }
    return response;
  } catch (error) {
    console.error(error);
  }
};

// 관리자 활성 프로젝트 리스트
export const getAdminProjectList = async () => {
  try {
    const { data } = await api.get("/admin/manage/project/list");

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 관리자 비활성 프로젝트 리스트
export const getAdminInActiveProjectList = async () => {
  try {
    const { data } = await api.get("/admin/manage/project/list", {
      params: { deleteStatus: "deleted" },
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};

// 관리자 프로젝트 수정(업데이트)
export const adminEditProject = async (
  projectId: number,
  editInfo: AdminProjectsListType
) => {
  try {
    const response = await api.put(
      `/admin/manage/project/${projectId}/modify`,
      editInfo
    );

    if (response.status === 200) {
      showToast("success", "프로젝트가 수정되었습니다.");
    } else {
      showToast("error", "에러가 발생했습니다.");
    }
    return response;
  } catch (error) {
    console.error(error);
  }
};

// 관리자 프로젝트 삭제(완전 삭제)
export const adminDeleteProject = async (projectId: number) => {
  try {
    const response = await api.delete(
      `/admin/manage/project/${projectId}/delete`
    );

    if (response.status !== 204) {
      showToast("error", "에러가 발생했습니다.");
    }
    return response;
  } catch (error) {
    console.error(error);
  }
};

// 관리자 프로젝트 활성 전환 (복구)
export const adminRestoreProject = async (projectId: number) => {
  try {
    const response = await api.patch(
      `/admin/manage/project/${projectId}/activate`
    );

    if (response.status !== 200) {
      showToast("error", "에러가 발생했습니다.");
    }
    return response;
  } catch (error) {
    console.error(error);
  }
};

// 관리자 활성 업무 리스트
export const getAdminTaskList = async () => {
  try {
    const { data } = await api.get("/admin/manage/task/list");

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 관리자 비활성 업무 리스트
export const getAdminDeleteTaskList = async () => {
  try {
    const { data } = await api.get(
      "/admin/manage/task/list?deleteStatus=deleted"
    );

    return data;
  } catch (error) {
    console.error(error);
  }
};

// 관리자 업무 수정
export const updateTask = async (taskId: number, editTaskInfo: UpdatedTask) => {
  try {
    const { data, status } = await api.put(
      `/admin/manage/task/${taskId}/modify`,
      editTaskInfo
    );

    if (status === 200) {
      showToast("success", "업무가 수정되었습니다.");
    } else {
      showToast("error", "에러가 발생했습니다.");
    }
    return data;
  } catch (error) {
    console.error("업무 수정 실패", error);
  }
};

// 관리자 업무 삭제
export const deleteTask = async (taskId: number) => {
  try {
    const { data, status } = await api.delete(
      `/admin/manage/task/${taskId}/delete`
    );

    if (status !== 204) {
      showToast("error", "에러가 발생했습니다.");
    }
    return data;
  } catch (error) {
    console.error("업무 삭제 실패", error);
  }
};

// 관리자 업무 활성 전환 (복구)
export const adminRestoreTask = async (taskId: number) => {
  try {
    const response = await api.patch(`/admin/manage/task/${taskId}/activate`);

    if (response.status !== 200) {
      showToast("error", "에러가 발생했습니다.");
    }
    return response;
  } catch (error) {
    console.error(error);
  }
};
