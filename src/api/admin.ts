import { api } from "./api";

// 관리자 대시보드
export const getAdminDashboard = async () => {
  try {
    const { data } = await api.get("/admin/dashboard");
    console.log(data);
    return data;
  } catch (error) {}
};

// 관리자 활성 계정 관리
export const getMemberList = async () => {
  try {
    const response = await api.get("/admin/manage/member/list", {
      params: { status: "active" },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching member list:", error);
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
    console.log(response);
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
    const response = api.delete(`/admin/manage/member/${member_id}/delete`);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
