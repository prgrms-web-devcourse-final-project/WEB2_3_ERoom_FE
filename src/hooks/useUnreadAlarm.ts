import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUnreadAlarm } from "../api/alarm";

const useUnreadAlarms = (memberId: number | undefined) => {
  const queryClient = useQueryClient();

  const { data: unreadAlarms = [], refetch } = useQuery({
    queryKey: ["unreadAlarms", memberId],
    queryFn: () => getUnreadAlarm(memberId),
    staleTime: 1000 * 60 * 5,
  });

  const addWebSocketAlarm = (newAlarm: notificationsType) => {
    queryClient.setQueryData(
      ["unreadAlarms", memberId],
      (oldAlarms: any = []) => {
        return [...oldAlarms, newAlarm];
      }
    );
  };
  return { unreadAlarms, refetch, addWebSocketAlarm };
};

export default useUnreadAlarms;
