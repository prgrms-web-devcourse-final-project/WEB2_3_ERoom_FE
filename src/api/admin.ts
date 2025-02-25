import { api } from "./api";

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
