import { api } from "./api";

// 알람 읽음 처리 API
export const patchReadAlarm = async (notificationId: number) => {
  try {
    const response = await api.patch(`/notifications/read/${notificationId}`);
    console.log("알람 읽음 처리 완료");
    return response.data;
  } catch (error) {
    console.error("알람 읽음 처리되지 않음", error);
    throw new Error();
  }
};

// 안 읽음 알림 리스트 가져오기 (응답 데이터 타입 처리해주기)
export const getUnreadAlarm = async (memberId: number) => {
  try {
    const response = await api.get(`/notifications/unread/${memberId}`);
    console.log("안 읽은 알람 리스트 가져옴");
    return response.data;
  } catch (error) {
    console.error("안 읽은 알람을 가져오지 못함", error);
    throw new Error();
  }
};
