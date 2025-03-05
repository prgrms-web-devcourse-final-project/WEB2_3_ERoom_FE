import { Client } from "@stomp/stompjs";
import { useQueryClient } from "@tanstack/react-query";
import SockJS from "sockjs-client";
import { create } from "zustand";

interface WebSocketStore {
  isConnected: boolean;
  notifications: any[]; // 알람 타입 추후 지정
  stompClient: Client | null;
  connectWebSocket: (accessToken: string, memberId: number) => void;
  subscribeToNotifications: (memberId: number) => void;
  getStompClient: () => Client | null;
}

const useWebSocketStore = create<WebSocketStore>((set, get) => {
  return {
    isConnected: false,
    notifications: [],
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

      const subscription = stompClient.subscribe(
        `/notifications/${memberId}`,
        (message) => {
          const data = JSON.parse(message.body);
          console.log("새로운 알람 수신:", data);
          set((state) => {
            const updatedNotifications = [...state.notifications, data];
            console.log(" 현재 알람 리스트:", updatedNotifications);
            return { notifications: updatedNotifications };
          });

          //Tanstack query 캐시 업데이트
          const queryClient = useQueryClient();
          queryClient.setQueryData(
            ["unreadAlarms", memberId],
            (oldAlarms: any = []) => {
              return [...oldAlarms, data];
            }
          );
        }
      );
      if (subscription) {
        console.log("알람 구독 성공:", subscription.id);
      }
    },

    getStompClient: () => get().stompClient,
  };
});

export default useWebSocketStore;
