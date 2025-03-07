interface MessageProps {
  id: number;
  text: string;
  sender: string;
  profile: string;
}

//개별 메시지 타입 (추후 senderId 추가될 예정)
interface ChatMessageType {
  messageId: number;
  chatRoomId: number;
  senderName: string;
  senderProfile: string | null;
  message: string;
  sentAt: string;
}

//채팅방 타입
interface ChatRoomType {
  chatRoomId: number;
  name: string;
  type: string;
  messages: ChatMessageType[];
}

//프로젝트별 미팅룸 타입 (getMeetingroom API 반환값)
interface MeetingroomType {
  projectId: number;
  projectName: string;
  description: string;
  category: string;
  subCategories1: string[];
  subCategories2: string[];
  startDate: string;
  endDate: string;
  status: "BEFORE_START" | "IN_PROGRESS" | "COMPLETED" | "HOLD";
  groupChatRoom: ChatRoom;
}

//MeetingRoomMessage컴포넌트에서 받는 타입
interface MessageType {
  messageId: number;
  senderName: string;
  senderProfile: string | null;
  message: string;
  sentAt: string;
}

//AI 회의록 관련 타입 정의
interface CreateAIMessage {
  content: string;
  members: string[];
}

interface AINoteListType {
  id: number;
  content: string;
  chatRoomId: number;
  createdAt: string;
  startDate: string;
  endDate: string;
  title: string;
  deleteStatus: "ACTIVE" | "DELETED";
  members: string[];
}
