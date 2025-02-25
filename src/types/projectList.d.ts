interface ProjectListType {
  id: number;
  name: string;
  createdAt: string; // ISO8601 날짜 문자열
  category: string;
  subCategories1: SubCategory;
  subCategories2: SubCategory;
  startDate: string; // ISO8601 날짜 문자열
  endDate: string; // ISO8601 날짜 문자열
  status: "BEFORE_START" | "IN_PROGRESS" | "COMPLETED"; // 프로젝트 상태 Enum
  members: MemberType[];
  chatRoomId: number;
  progressRate: number;
  colors: Colors;
}

interface SubCategory {
  name: string;
  data: string[];
}

interface Colors {
  background: string; // Hex 색상 코드
  text: string; // Hex 색상 코드
}
