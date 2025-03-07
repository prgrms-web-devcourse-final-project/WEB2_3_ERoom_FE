const alarmData = [
  {
    id: 1,
    theme: "message" as const,
    project: "최종 프로젝트",
  },
  {
    id: 2,
    theme: "newTask" as const,
    project: "최종 프로젝트",
    task: "UI 디자인 수정",
  },
  { id: 3, theme: "newProject" as const, project: "최종 프로젝트" },
  { id: 4, theme: "endProject" as const, project: "최종 프로젝트" },
  {
    id: 5,
    theme: "message" as const,
    project: "최종 프로젝트",
  },
  {
    id: 6,
    theme: "newTask" as const,
    project: "최종 프로젝트",
    task: "UI 디자인 수정",
  },
  { id: 7, theme: "newProject" as const, project: "최종 프로젝트" },
  { id: 8, theme: "endProject" as const, project: "최종 프로젝트" },
];

// (임시) 프로젝트 배열
const projectData = [
  {
    name: "최종프로젝트",
    startDate: "2025-02-03",
    endDate: "2025-03-12",
  },
  {
    name: "토이프로젝트",
    startDate: "2025-02-03",
    endDate: "2025-03-12",
  },
  {
    name: "사이드프로젝트",
    startDate: "2025-02-03",
    endDate: "2025-03-12",
  },
  { name: "1차프로젝트", startDate: "2025-02-03", endDate: "2025-03-12" },
  { name: "2차프로젝트", startDate: "2025-02-03", endDate: "2025-03-12" },
  { name: "3차프로젝트", startDate: "2025-02-03", endDate: "2025-03-12" },
  {
    name: "파이널프로젝트",
    startDate: "2025-02-03",
    endDate: "2025-03-12",
  },
];

// (임시) 카테고리 데이터
const categoryData = [
  {
    category: "개발",
    subcategories1: {
      name: "사용언어",
      data: [
        { name: "C", value: 10 },
        { name: "C++", value: 20 },
        { name: "C#", value: 30 },
        { name: "Java", value: 40 },
        { name: "JavaScript", value: 50 },
        { name: "TypeScript", value: 60 },
        { name: "Python", value: 70 },
        { name: "Go", value: 80 },
        { name: "PHP", value: 90 },
        { name: "Swift", value: 100 },
        { name: "Kotlin", value: 110 },
        { name: "기타", value: 120 },
      ],
    },
    subcategories2: {
      name: "프레임워크/라이브러리",
      data: [
        { name: "Spring", value: 10 },
        { name: "React", value: 20 },
        { name: "Vue.js", value: 30 },
        { name: "Svelte", value: 40 },
        { name: "Angular", value: 50 },
        { name: "Flutter", value: 60 },
        { name: "Next.js", value: 70 },
        { name: "Nuxt.js", value: 80 },
        { name: "Unity", value: 90 },
        { name: "Unreal", value: 100 },
        { name: "Django", value: 110 },
        { name: "Flask", value: 120 },
        { name: "Bootstrap", value: 130 },
        { name: "Tailwind CSS", value: 140 },
      ],
    },
  },
  { category: "교육" },
  { category: "금융" },
  { category: "디자인" },
  { category: "제조" },
  { category: "기타" },
];

// (임시) 팀원 배열
const membersData = [
  {
    id: 1,
    username: "홍길동",
    email: "a@gmail.com",
    password: "1234",
    grade: "DISABLE",
    organization: "데브코스1",
    profile:
      "https://cdn.pixabay.com/photo/2018/01/15/09/17/woman-3083516_1280.jpg",
    delete: "ACTIVE",
  },
  {
    id: 2,
    username: "홍서범",
    email: "b@gmail.com",
    password: "1234",
    grade: "DISABLE",
    organization: "데브코스2",
    profile:
      "https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg",
    delete: "ACTIVE",
  },
  {
    id: 3,
    username: "홍홍홍",
    email: "c@gmail.com",
    password: "1234",
    grade: "DISABLE",
    organization: "데브코스3",
    profile:
      "https://cdn.pixabay.com/photo/2018/01/21/14/16/woman-3096664_1280.jpg",
    delete: "ACTIVE",
  },
];

// (임시) 프로젝트 박스 선택된 멤버
const selectedMemberData = [
  {
    id: 2,
    username: "홍서범",
    email: "b@gmail.com",
    password: "1234",
    grade: "DISABLE",
    organization: "데브코스2",
    profile:
      "https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg",
    delete: "ACTIVE",
  },
  {
    id: 3,
    username: "홍홍홍",
    email: "c@gmail.com",
    password: "1234",
    grade: "DISABLE",
    organization: "데브코스3",
    profile:
      "https://cdn.pixabay.com/photo/2018/01/21/14/16/woman-3096664_1280.jpg",
    delete: "ACTIVE",
  },
];

// (임시) 프로젝트 박스 프로젝트정보
const selectedProjectData = {
  projectName: "최종프로젝트",
  projectStatus: "COMPLETED",
  createdAt: "2025-02-01T14:30:00",
  startDate: "2025-02-05T05:17:17.374",
  endDate: "2025-03-11T05:17:17.374",
  cate: "개발",
  subcate1: ["JavaScript"],
  subcate2: ["React"],
};

// (임시) 메시지
const messagesData = [
  {
    id: 1,
    text: "안녕하세요!",
    sender: "team",
    profile:
      "https://cdn.pixabay.com/photo/2017/07/31/11/44/laptop-2557571_1280.jpg",
  },
  {
    id: 2,
    text: "회의 시작하겠습니다.",
    sender: "team",
    profile:
      "https://cdn.pixabay.com/photo/2017/07/31/11/44/laptop-2557571_1280.jpg",
  },
  {
    id: 3,
    text: "네, 확인했습니다!",
    sender: "user",
    profile:
      "https://cdn.pixabay.com/photo/2017/07/31/11/44/laptop-2557571_1280.jpg",
  },
  {
    id: 4,
    text: "자료 공유드릴게요.",
    sender: "user",
    profile:
      "https://cdn.pixabay.com/photo/2017/07/31/11/44/laptop-2557571_1280.jpg",
  },
];

export const dummy = {
  alarmData,
  projectData,
  categoryData,
  membersData,
  selectedMemberData,
  selectedProjectData,
  messagesData,
};
