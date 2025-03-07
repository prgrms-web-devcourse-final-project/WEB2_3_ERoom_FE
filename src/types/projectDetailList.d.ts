interface ProjectDetailType {
  projectId: number;
  projectName: string;
  categoryName: string;
  subCategories: subCategories[];
  status: "BEFORE_START" | "IN_PROGRESS" | "COMPLETED"; // 프로젝트 상태 Enum
  tasks: tasks[];
  members: members[];
}

interface subCategories {
  id: number;
  name: string;
  tags: tags[];
}

interface tags {
  id: number;
  name: string;
}

interface tasks {
  taskId: number;
  title: string;
  startDate: string;
  endDate: string;
  status: "BEFORE_START" | "IN_PROGRESS" | "COMPLETED" | "HOLD";
  assignedMemberName: string;
  assignedMemberProfile: string | null;
  participants: string[];
  colors: colors;
}

interface colors {
  background: string; // Hex 색상 코드
  text: string; // Hex 색상 코드
}

interface members {
  memberId: number;
  username: string;
  profile: string | null;
}
