import { Client } from "@stomp/stompjs";
import { create } from "zustand";

interface WebSocketStore {
  isConnected: boolean;
  notifications: any[]; // 알람 타입 추후 지정
  stompClient: Client | null;
  connectWebSocket: () => void;
  subscribeToNotifications: (memberId: number) => void;
  getWebSocket: () => WebSocket | null;
}

const useWebSocketStore = create<WebSocketStore>((set) => {
  let webSocket: WebSocket | null = null;
  let stompClient: Client | null = null;

  return {
    isConnected: false,
    notifications: [],
    stompClient: null,

    // 로그인 상태 확인 후 웹소켓 연결
    connectWebSocket: () => {
      const token = localStorage.getItem("token"); //  로그인 상태 확인
      if (!token) {
        console.warn(" 로그인되지 않았음 - 웹소켓 연결하지 않음");
        return;
      }

      if (!webSocket) {
        webSocket = new WebSocket(`${import.meta.env.VITE_API_URL}/ws`);

        webSocket.onopen = () => {
          set({ isConnected: true });
          console.log("웹소켓 연결됨");

          //stomp 클라이언트 설정
          stompClient = new Client({
            webSocketFactory: () => webSocket!,
            reconnectDelay: 5000, // 재연결 설정
            onConnect: () => {
              console.log("STOMP 클라이언트 연결됨");
              set({ stompClient });
            },
            onStompError: (frame) => {
              console.error("STOMP 에러:", frame);
            },
          });

          stompClient.activate(); // Stomp 클라이언트 활성화
        };

        webSocket.onclose = () => {
          set({ isConnected: false });
          console.log("웹소켓 연결 종료");
        };
      }
    },

    // 알람 구독
    subscribeToNotifications: (memberId: number) => {
      if (stompClient) {
        stompClient.subscribe(`/topic/notifications/${memberId}`, (message) => {
          const data = JSON.parse(message.body);
          set((state) => ({
            notifications: [...state.notifications, data],
          }));
        });
      }
    },

    getWebSocket: () => webSocket,
  };
});

export default useWebSocketStore;
