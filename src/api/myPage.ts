import { api } from "./api";

// 내 정보 가져오기
export const getMyPageInfo = async () => {
  try {
    const response = await api.get("/api/mypage");
    console.log("myPage", response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 내 정보 수정
export const editMyPageInfo = async (formData: FormData) => {
  try {
    const response = await api.putForm("api/mypage", formData);
    formData.forEach((value, key) => {
      console.log(key, value); // 각 키-값 쌍을 출력
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
