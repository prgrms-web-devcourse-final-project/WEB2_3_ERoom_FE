import { api } from "./api";

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
      alert("서브카테고리 삭제가 완료되었습니다");
    }
    return response;
  } catch (error) {
    console.error(error);
  }
};
