import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store/authStore";
import useUnreadAlarms from "./useUnreadAlarm";
import { patchReadAlarm } from "../api/alarm";

const useReadAlarm = () => {
  const memberId = useAuthStore((state) => state.member?.id);
  const { refetch } = useUnreadAlarms(memberId);

  return useMutation({
    mutationFn: (notificationId: number) => patchReadAlarm(notificationId),
    onSuccess: () => {
      console.log("알람 읽음 처리 완료");

      refetch();
    },
    onError: (error) => {
      console.error("알람 읽음 처리 실패", error);
    },
  });
};

export default useReadAlarm;
