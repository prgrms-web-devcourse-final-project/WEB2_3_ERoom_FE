import dayjs from "dayjs";
import { api } from "../../api/api";
import { EventDropArg } from "@fullcalendar/core/index.js";

// 캘린더 일정 드래그시 호출함수
export const dragChangeTask = async (info: EventDropArg) => {
  // 변경된 일정 날짜 포맷팅
  const startDate = dayjs(info.event.start).format("YYYY-MM-DDTHH:mm:ss");
  const endDate = dayjs(info.event.end).format("YYYY-MM-DDTHH:mm:ss");

  const projectData = info.event.extendedProps;
  console.log(projectData);
  // console.log({
  //   name: info.event.title,
  //   startDate,
  //   endDate,
  //   status: projectData.status,
  //   assignedMemberId: projectData.memberIds,
  //   participantIds: [projectData.memberIds],
  // });

  try {
    const response = await api.put(`/api/tasks/${info.event.id}`, {
      name: info.event.title,
      startDate,
      endDate,
      status: projectData.status,
      assignedMemberId: projectData.assignedMemberId,
      participantIds: [projectData.assignedMemberId],
    });
    console.log(response);
    return response;
  } catch (error: any) {
    console.error(error.response.data);
    Object.values(error.response.data).forEach((value) => alert(value));
    // alert("에러가 발생했습니다.");
    info.revert();
  }
};
