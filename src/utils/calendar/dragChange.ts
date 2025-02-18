import dayjs from "dayjs";
import { api } from "../../api/api";
import { EventDropArg } from "@fullcalendar/core/index.js";

// 캘린더 일정 드래그시 호출함수
export const dragChange = async (info: EventDropArg) => {
  // 변경된 일정 날짜 포맷팅
  const startDate = dayjs(info.event.start).format("YYYY-MM-DD");
  const endDate = dayjs(info.event.end).format("YYYY-MM-DD");

  try {
    const response = await api.patch(`/projects/${info.event.id}`, {
      startDate,
      endDate,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    info.revert();
  }
};
