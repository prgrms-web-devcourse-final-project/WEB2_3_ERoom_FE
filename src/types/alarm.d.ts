interface notificationsMemberType {
  id: number;
  username: string;
  email: string;
  password: null;
  organization: string;
}

interface notificationsType {
  createAt: string;
  id: number;
  member: notificationsMemberType;
  message: string;
  read: boolean;
  referenceId: string;
  referenceName: string;
  type: "PROJECT_INVITE" | "PROJECT_EXIT" | "TASK_ASSIGN" | "MESSAGE_SEND";
}

interface AlarmModalProps {
  onClose: () => void;
  allAlarms: notificationsType[];
}

interface AlarmBoxProps {
  id: number;
  project: string;
  projectId: string;
  theme: "PROJECT_INVITE" | "PROJECT_EXIT" | "TASK_ASSIGN" | "MESSAGE_SEND";
  css?: string;
}
