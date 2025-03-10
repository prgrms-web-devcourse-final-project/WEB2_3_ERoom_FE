import { showToast } from "../utils/toastConfig";
import { api } from "./api";

// 관리자 상세항목 태그 생성
export const adminAddnewDetailTag = async (
  subcategoryId: number,
  newDetailTagName: string
) => {
  try {
    const response = await api.post(
      `/admin/manage/subcategory/${subcategoryId}/tag/create`,
      {
        name: newDetailTagName,
      }
    );
    console.log("adminAddnewDetailTag", response);
    if (response.status === 200) {
      showToast("success", "상세항목이 추가되었습니다.");
    } else {
      showToast("error", "에러가 발생했습니다.");
    }

    return response;
  } catch (error) {
    console.error(error);
  }
};

// 관리자 상세항목 태그 수정
export const adminEditDetailTag = async (
  subcategoryId: number,
  tagId: number,
  editDetailTagName: string
) => {
  try {
    const response = await api.put(
      `/admin/manage/subcategory/${subcategoryId}/tag/${tagId}/modify`,
      {
        name: editDetailTagName,
      }
    );
    console.log("adminEditDetailTag", response);
    if (response.status === 200) {
      showToast("success", "상세항목이 수정되었습니다.");
    } else {
      showToast("error", "에러가 발생했습니다.");
    }
    return response;
  } catch (error) {
    console.error(error);
  }
};

// 관리자 상세항목 태그 삭제
export const adminDeleteDetailTag = async (
  subcategoryId: number,
  tagId: number
) => {
  try {
    const response = await api.delete(
      `/admin/manage/subcategory/${subcategoryId}/tag/${tagId}/delete`
    );

    console.log("adminDeleteDetailTag", response);

    if (response.status === 204) {
      showToast("success", "상세항목이 삭제되었습니다.");
    } else {
      showToast("error", "에러가 발생했습니다.");
    }
    return response;
  } catch (error) {
    console.error(error);
  }
};
