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
interface AIMessage {
  role: string;
  content: string;
  refusal: string | null;
}

interface Choice {
  index: number;
  message: AIMessage;
  logprobs: any | null;
  finish_reason: string;
}

interface Usage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  prompt_tokens_details: TokenDetails;
  completion_tokens_details: CompletionTokenDetails;
}

interface TokenDetails {
  cached_tokens: number;
  audio_tokens: number;
}

interface CompletionTokenDetails {
  reasoning_tokens: number;
  audio_tokens: number;
  accepted_prediction_tokens: number;
  rejected_prediction_tokens: number;
}

interface AINoteType {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Choice[];
  usage: Usage;
  service_tier: string;
  system_fingerprint: string | null;
}
