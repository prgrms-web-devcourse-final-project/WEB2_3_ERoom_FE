import { api } from "./api";

// 관리자 카테고리 전체 조회
export const getAllCategory = async () => {
  try {
    const { data } = await api.get("/admin/manage/category/list");
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const adminNewCategory = async (newCategoryName: string) => {
  try {
    const response = api.post("/admin/manage/category/create", {
      name: newCategoryName,
    });
    console.log(response);
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
    console.log(response);
    if (response.status === 204) {
      alert("카테고리 수정이 완료되었습니다.");
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
    console.log("adminDeleteCategory", response);
    if (response.status === 204) {
      alert("카테고리가 삭제되었습니다");
    }
    return response;
  } catch (error) {
    console.error(error);
  }
};
