interface UpdateTaskModalProps {
  task: Task;
  onClose: () => void;
  value: string;
  onClick?: (taskId: number) => void;
  onDelete?: (taskId: number) => void;
  onUpdate?: (taskId: number, updateData: UpdateTask) => void;
  refetch: () => void;
  projectData?: ProjectDetailType;
}

interface selectedDateType {
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
  ampm: string;
}

interface TaskListProps {
  name: string;
  isAll?: boolean;
  taskInfo: Task[];
  refetch: () => void;
  projectData?: ProjectDetailType;
}

interface TaskBoxProps {
  isAll?: boolean;
  onClick: () => void;
  task: Task;
  onUpdate?: (taskId: number, updateData: UpdateTask) => void;
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
  colors: { background: string; text: string };
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

interface UpdateTask {
  title: string;
  startDate: string; // ISO 형식의 날짜 문자열로 취급
  endDate: string; // ISO 형식의 날짜 문자열로 취급
  status: "IN_PROGRESS" | "COMPLETED" | "BEFORE_START" | "HOLD";
  assignedMemberId: number;
  participantIds: number[]; // 참가자는 문자열 배열로 처리
}

interface GetUpdateTask {
  id: number;
  title: string;
  startDate: string; // ISO 형식의 날짜 문자열로 취급
  endDate: string; // ISO 형식의 날짜 문자열로 취급
  status: "IN_PROGRESS" | "COMPLETED" | "BEFORE_START" | "HOLD"; // 상태값이 정해져 있을 경우 문자열 리터럴 타입을 사용
  assignedMemberId: number;
  participantIds: number[]; // 참가자는 문자열 배열로 처리
  participantProfiles: string[];
}
interface ManageTasksType {
  name: string;
  tasks: Task[];
}

interface UpdatedTask {
  taskName: string;
  taskStatus: string;
}

interface GetAssignedTask {
  id: number;
  title: string;
  startDate: string; // ISO 형식의 날짜 문자열로 취급
  endDate: string; // ISO 형식의 날짜 문자열로 취급
  status: "IN_PROGRESS" | "COMPLETED" | "BEFORE_START" | "HOLD"; // 상태값이 정해져 있을 경우 문자열 리터럴 타입을 사용
  assignedMemberId: number;
  assignedMemberName: string;
  assignedMemberProfile: string | null;
  participantIds: number[]; // 참가자는 문자열 배열로 처리
  participantProfiles: string[];
  projectId: number;
}

interface TaskSearchResult {
  taskId: number;
  taskName: string;
  projectName: string;
  assignedMemberName: string;
  assignedMemberEmail: string;
  taskStatus: "IN_PROGRESS" | "COMPLETED" | "BEFORE_START" | "HOLD";
  startDate: string;
  endDate: string;
}
