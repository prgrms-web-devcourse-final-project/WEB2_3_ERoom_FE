interface UpdateTaskModalProps {
  task: Task;
  onClose: () => void;
  value: string;
  onClick: (taskId: number) => void;
}

interface selectedDateType {
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
  ampm: string;
}

interface CreateTaskProps {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: number;
  onClick: (task: CreateTask) => void;
}

interface TaskListProps {
  name: string;
  isAll?: boolean;
  taskInfo: Task[];
  refetch: () => void;
}

interface TaskBoxProps {
  isAll?: boolean;
  onClick: () => void;
  task: Task;
}

interface AllTasksType {
  IN_PROGRESS: Task[];
  COMPLETED: Task[];
  BEFORE_START: Task[];
  HOLD: Task[];
}
interface Task {
  taskId: number;
  title: string;
  startDate: string; // ISO 형식의 날짜 문자열로 취급
  endDate: string; // ISO 형식의 날짜 문자열로 취급
  status: "IN_PROGRESS" | "COMPLETED" | "BEFORE_START" | "HOLD"; // 상태값이 정해져 있을 경우 문자열 리터럴 타입을 사용
  assignedMemberName: string;
  assignedMemberProfile: string; // URL 형식으로 처리
  participants: string[]; // 참가자는 문자열 배열로 처리
}

interface CreateTask {
  projectId: number;
  title: string;
  startDate: string; // ISO 형식의 날짜 문자열로 취급
  endDate: string; // ISO 형식의 날짜 문자열로 취급
  status: "IN_PROGRESS" | "COMPLETED" | "BEFORE_START" | "HOLD"; // 상태값이 정해져 있을 경우 문자열 리터럴 타입을 사용
  assignedMemberId: number;
  participantIds: number[]; // 참가자는 문자열 배열로 처리
  colors?: { background: string; text: string };
}

interface ManageTasksType {
  name: string;
  tasks: Task[];
}
