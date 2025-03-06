import { Client } from "@stomp/stompjs";
import { useQueryClient } from "@tanstack/react-query";
import SockJS from "sockjs-client";
import { create } from "zustand";
import {
  getUnreadAlarm,
  patchAllReadAlarm,
  patchReadAlarm,
} from "../api/alarm";

interface WebSocketStore {
  isConnected: boolean;
  notifications: notificationsType[];
  visibleAlarms: notificationsType[]; // 현재 표시되는 알람 리스트
  stompClient: Client | null;
  connectWebSocket: (accessToken: string, memberId: number) => void;
  subscribeToNotifications: (memberId: number) => void;
  getStompClient: () => Client | null;
  removeAlarm: (id: number) => void;
  clearAlarms: (memberId: number) => void;
  syncAlarmsWithAPI: (memberId: number) => Promise<void>;
}

const useWebSocketStore = create<WebSocketStore>((set, get) => {
  return {
    isConnected: false,
    notifications: [],
    visibleAlarms: [],
    stompClient: null,

    // 로그인 상태 확인 후 웹소켓 연결
    connectWebSocket: (accessToken: string, memberId: number) => {
      if (!accessToken || !memberId) {
        console.warn(
          " 로그인되지 않았거나 memberId가 없음 - 웹소켓 연결하지 않음"
        );
        return;
      }

      const { stompClient, isConnected } = get();
      if (stompClient && isConnected) {
        console.warn("이미 웹소켓이 연결되어 있음.");
        return;
      }

      console.log("웹소켓 연결 시도...");

      const socket = new SockJS(`${import.meta.env.VITE_API_URL}/ws`);
      const client = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000, // 재연결 설정
        connectHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
        onConnect: () => {
          console.log("STOMP 클라이언트 연결됨");
          set({ isConnected: true, stompClient: client });

          setTimeout(() => {
            const newStompClient = get().stompClient;
            if (newStompClient) {
              console.log(" 알람 구독 실행", memberId);
              get().subscribeToNotifications(memberId);
            } else {
              console.warn(" stompClient가 아직 설정되지 않음.");
            }
          }, 100);
        },
        onStompError: (frame) => {
          console.error("STOMP 에러:", frame);
        },
      });

      client.activate(); // Stomp 클라이언트 활성화
    },

    // 알람 구독
    subscribeToNotifications: (memberId: number) => {
      const { stompClient } = get();
      if (!stompClient) {
        console.warn(" STOMP 클라이언트가 아직 활성화되지 않았음.");
        return;
      }

      console.log(" 알람 구독 시도: /notifications/" + memberId);

      stompClient.subscribe(`/notifications/${memberId}`, (message) => {
        const data = JSON.parse(message.body);
        console.log("새로운 알람 수신:", data);

        set((state) => {
          // 중복 확인: 기존 notifications에 같은 ID가 있는지 체크
          const isDuplicate = state.notifications.some(
            (alarm) => alarm.id === data.id
          );

          if (isDuplicate) {
            console.warn("중복된 알람 수신 - 추가하지 않음", data);
            return state; // 기존 상태 유지
          }

          return {
            notifications: [...state.notifications, data],
            visibleAlarms: [...state.visibleAlarms, data], // UI에 반영
          };
        });

        //Tanstack query 캐시 업데이트
        const queryClient = useQueryClient();
        queryClient.setQueryData(
          ["unreadAlarms", memberId],
          (oldAlarms: any = []) => {
            const isDuplicate = oldAlarms.some(
              (alarm: notificationsType) => alarm.id === data.id
            );
            return isDuplicate ? oldAlarms : [...oldAlarms, data];
          }
        );
      });
    },

    //알람 1개 삭제 (UI 반영)
    removeAlarm: async (id: number) => {
      //  삭제할 알람 찾기
      const alarmToRemove = get().notifications.find(
        (alarm) => alarm.id === id
      );

      // UI에서 먼저 제거 (사용자 경험 최적화)
      set((state) => ({
        notifications: state.notifications.filter((alarm) => alarm.id !== id),
        visibleAlarms: state.visibleAlarms.filter((alarm) => alarm.id !== id),
      }));

      try {
        await patchReadAlarm(id); // 백엔드 요청
        console.log(` 알람 ${id} 읽음 처리 완료`);
      } catch (error) {
        console.error(" 알람 읽음 처리 실패:", error);

        if (!alarmToRemove) {
          console.warn("alarmToRemove가 undefined입니다.");
          return; // undefined면 추가하지 않도록 방지
        }

        // 실패하면 롤백 (UI 복구)
        set((state) => ({
          notifications: [...state.notifications, alarmToRemove], // 원래 데이터 복구
          visibleAlarms: [...state.visibleAlarms, alarmToRemove],
        }));
      }
    },

    //모든 알람 삭제 (백엔드 반영 + UI 업데이트)
    clearAlarms: async (memberId: number) => {
      try {
        await patchAllReadAlarm(memberId);
        console.log("모든 알람 읽음 처리 완료 (백엔드 + 프론트)");

        set(() => ({
          notifications: [],
          visibleAlarms: [],
        }));
      } catch (error) {
        console.error(" 모든 알람 읽음 처리 실패:", error);
      }
    },

    //API에서 최신 알람 동기화
    syncAlarmsWithAPI: async (memberId: number) => {
      try {
        const apiAlarms = await getUnreadAlarm(memberId);
        console.log("API에서 알람 동기화 완료", apiAlarms);

        set((state) => {
          // 🔹 중복 제거: 기존 알람 목록에 없는 새로운 알람만 추가
          const uniqueAlarms = apiAlarms.filter(
            (apiAlarm: notificationsType) =>
              !state.notifications.some((alarm) => alarm.id === apiAlarm.id)
          );

          return {
            notifications: [...state.notifications, ...uniqueAlarms],
            visibleAlarms: [...state.visibleAlarms, ...uniqueAlarms],
          };
        });
      } catch (error) {
        console.error(" 알람 동기화 실패:", error);
      }
    },

    //STOMP 클라이언트 반환
    getStompClient: () => get().stompClient,
  };
});

export default useWebSocketStore;
