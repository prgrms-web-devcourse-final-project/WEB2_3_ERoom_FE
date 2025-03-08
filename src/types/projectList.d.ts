interface ProjectListType {
  id: number;
  name: string;
  createdAt: string;
  categoryName: string;
  subCategories: SubCategoryType[];
  startDate: string;
  endDate: string;
  status: "BEFORE_START" | "IN_PROGRESS" | "COMPLETED";
  members: ProjectMemberType[];
  chatRoomId: number;
  progressRate: number;
  creatorId: number;
  colors: Colors;
}

interface ProjectRoomData {
  completed: ProjectListType[];
  inProgress: ProjectListType[];
  beforeStart: ProjectListType[];
}

// interface ProjectDetailType {
//   id: number;
//   name: string;
//   createdAt: string; // ISO8601 날짜 문자열
//   category: string;
//   subCategories1: SubCategory;
//   subCategories2: SubCategory;
//   startDate: string; // ISO8601 날짜 문자열
//   endDate: string; // ISO8601 날짜 문자열
//   status: "BEFORE_START" | "IN_PROGRESS" | "COMPLETED"; // 프로젝트 상태 Enum
//   memberNames: string[];
//   memberProfiles: string[];
//   chatRoomId: number;
//   progressRate: number;
//   colors: Colors;
// }
