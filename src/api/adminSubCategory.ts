import { showToast } from "../utils/toastConfig";
import { api } from "./api";

// 관리자 서브카테고리 조회
export const adminGetSubCategory = async (categoryId: number | null) => {
  if (categoryId !== null) {
    try {
      const response = await api.get(
        `/admin/manage/subcategory/list?categoryId=${categoryId}`
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  } else {
    showToast("error", "카테고리를 선택해주세요.");
  }
};

// 관리자 서브카테고리 생성
export const adminAddNewSubCategory = async (
  categoryId: number,
  newName: string
) => {
  try {
    const response = await api.post(
      `/admin/manage/subcategory/${categoryId}/create`,
      { name: newName }
    );
    console.log("adminAddNewSubCategory", response);
    if (response.status === 201) {
      showToast("success", "세부항목이 추가되었습니다.");
    } else {
      showToast("error", "에러가 발생했습니다.");
    }
    return response;
  } catch (error) {
    console.error(error);
  }
};

// 관리자 서브카테고리 수정
export const adminEditSubCategory = async (
  subcategoryId: number,
  editSubCateName: string
) => {
  try {
    const response = await api.put(
      `/admin/manage/subcategory/${subcategoryId}/modify`,
      { name: editSubCateName }
    );
    console.log("adminEditSubCategory", response);
    if (response.status === 200) {
      showToast("success", "세부항목이 수정되었습니다.");
    } else {
      showToast("error", "에러가 발생했습니다.");
    }
    return response;
  } catch (error) {
    console.error(error);
  }
};

// 관리자 서브카테고리 삭제
export const adminDeleteSubCategory = async (subcategoryId: number) => {
  try {
    const response = await api.delete(
      `/admin/manage/subcategory/${subcategoryId}/delete`
    );
    console.log("adminDeleteSubCategory", response);
    if (response.status === 204) {
      showToast("success", "세부항목이 삭제되었습니다.");
    } else {
      showToast("error", "에러가 발생했습니다.");
    }
    return response;
  } catch (error) {
    console.error(error);
  }
};
