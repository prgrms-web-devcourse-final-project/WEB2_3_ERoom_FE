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
  members: Member[];
  chatRoomId: number;
  progressRate: number;
  colors: Colors;
}

interface SubCategory {
  name: string;
  data: string[];
}

interface Member {
  id: number;
  username: string;
  email: string;
  profile: string; // 프로필 이미지 URL
}

interface Colors {
  background: string; // Hex 색상 코드
  text: string; // Hex 색상 코드
}
