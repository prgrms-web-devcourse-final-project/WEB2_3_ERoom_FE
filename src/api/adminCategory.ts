import { showToast } from "../utils/toastConfig";
import { api } from "./api";

// 관리자 카테고리 전체 조회
export const getAllCategory = async () => {
  try {
    const { data } = await api.get("/admin/manage/category/list");

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const adminNewCategory = async (newCategoryName: string) => {
  try {
    const response = await api.post("/admin/manage/category/create", {
      name: newCategoryName,
    });

    return response;
  } catch (error) {
    console.error(error);
  }
};

// 관리자 카테고리 수정
export const adminEditCategory = async (
  categoryId: number,
  editedName: string
) => {
  try {
    const response = await api.put(
      `/admin/manage/category/${categoryId}/modify`,
      {
        name: editedName,
      }
    );

    if (response.status === 200) {
      showToast("success", "카테고리 수정이 완료되었습니다.");
    } else {
      showToast("error", "에러가 발생했습니다.");
    }
    return response;
  } catch (error) {
    console.error(error);
  }
};

// 관리자 카테고리 삭제
export const adminDeleteCategory = async (categoryId: number) => {
  try {
    const response = await api.delete(
      `/admin/manage/category/${categoryId}/delete`
    );

    if (response.status === 204) {
      showToast("success", "카테고리가 삭제되었습니다");
    } else {
      showToast("error", "에러가 발생했습니다");
    }
    return response;
  } catch (error) {
    console.error(error);
  }
};
