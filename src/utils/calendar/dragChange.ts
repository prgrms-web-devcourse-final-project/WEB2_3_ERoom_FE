import dayjs from "dayjs";
import { api } from "../../api/api";
import { EventDropArg } from "@fullcalendar/core/index.js";
import { showToast } from "../toastConfig";

// 캘린더 일정 드래그시 호출함수
export const dragChange = async (info: EventDropArg) => {
  // 변경된 일정 날짜 포맷팅
  const startDate = dayjs(info.event.start).format("YYYY-MM-DDTHH:mm:ss");
  const endDate = dayjs(info.event.end).format("YYYY-MM-DDTHH:mm:ss");

  const projectData = info.event.extendedProps;

  try {
    const response = await api.patch(`/api/projects/${info.event.id}/update`, {
      name: info.event.title,
      // categoryId: projectData.categoryId,
      subCategories: projectData.subCategories,
      status: projectData.status,
      startDate,
      endDate,
      membersIds: projectData.memberIds,
    });
    console.log(response);
    if (response.status === 204) {
      showToast("success", "프로젝트 일정이 수정되었습니다");
    }
    return response;
  } catch (error: any) {
    console.error(error.response.data);
    Object.values(error.response.data).forEach((value) =>
      showToast("error", value as string)
    );
    info.revert();
  }
};
