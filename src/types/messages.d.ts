interface MessageProps {
  id: number;
  text: string;
  sender: string;
  profile: string;
}

interface Message {
  messageId: number;
  chatRoomId: number;
  senderName: string;
  senderProfile: string | null;
  message: string;
  sentAt: string;
}
