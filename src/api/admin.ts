import { api } from "./api";

// 관리자 대시보드
export const getAdminDashboard = async () => {
  try {
    const { data } = await api.get("/admin/dashboard");
    console.log(data);
    return data;
  } catch (error) {}
};

export const getMemberList = async () => {
  try {
    const response = await api.get("/admin/manage/member/list", {
      params: { status: "active" },
    });
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching member list:", error);
  }
};
