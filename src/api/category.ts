import { api } from "./api";

// 일반 유저 카테고리
export const getCategory = async () => {
  try {
    const response = await api.get("category/list");
    console.log("getCategory", response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
