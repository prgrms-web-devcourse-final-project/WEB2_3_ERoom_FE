import { api } from "./api";

export const getMyPageInfo = async () => {
  try {
    const response = await api.get("/api/mypage");
    console.log("myPage", response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
