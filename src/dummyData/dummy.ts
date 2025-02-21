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
    name: "개발",
    subcategories: [
      {
        subname: "사용언어",
        data: [
          { text: "C", value: 10 },
          { text: "C++", value: 20 },
          { text: "C#", value: 30 },
          { text: "Java", value: 40 },
          { text: "JavaScript", value: 50 },
          { text: "TypeScript", value: 60 },
          { text: "Python", value: 70 },
          { text: "Go", value: 80 },
          { text: "PHP", value: 90 },
          { text: "Swift", value: 100 },
          { text: "Kotlin", value: 110 },
          { text: "기타", value: 120 },
        ],
      },
      {
        subname: "프레임워크/라이브러리",
        data: [
          { text: "Spring", value: 10 },
          { text: "React", value: 20 },
          { text: "Vue.js", value: 30 },
          { text: "Svelte", value: 40 },
          { text: "Angular", value: 50 },
          { text: "Flutter", value: 60 },
          { text: "Next.js", value: 70 },
          { text: "Nuxt.js", value: 80 },
          { text: "Unity", value: 90 },
          { text: "Unreal", value: 100 },
          { text: "Django", value: 110 },
          { text: "Flask", value: 120 },
          { text: "Bootstrap", value: 130 },
          { text: "Tailwind CSS", value: 140 },
        ],
      },
    ],
  },
  { name: "교육" },
  { name: "금융" },
  { name: "디자인" },
  { name: "제조" },
  { name: "기타" },
];

// (임시) 팀원 배열
const membersData = [
  {
    id: 1,
    userName: "홍길동",
    email: "a@gmail.com",
    password: "1234",
    grade: "DISABLE",
    organization: "데브코스1",
    profileImage:
      "https://cdn.pixabay.com/photo/2018/01/15/09/17/woman-3083516_1280.jpg",
    delete: "ACTIVE",
  },
  {
    id: 2,
    userName: "홍서범",
    email: "b@gmail.com",
    password: "1234",
    grade: "DISABLE",
    organization: "데브코스2",
    profileImage:
      "https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg",
    delete: "ACTIVE",
  },
  {
    id: 3,
    userName: "홍홍홍",
    email: "c@gmail.com",
    password: "1234",
    grade: "DISABLE",
    organization: "데브코스3",
    profileImage:
      "https://cdn.pixabay.com/photo/2018/01/21/14/16/woman-3096664_1280.jpg",
    delete: "ACTIVE",
  },
];

// (임시) 프로젝트 박스 선택된 멤버
const selectedMemberData = [
  {
    id: 2,
    userName: "홍서범",
    email: "b@gmail.com",
    password: "1234",
    grade: "DISABLE",
    organization: "데브코스2",
    profileImage:
      "https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg",
    delete: "ACTIVE",
  },
  {
    id: 3,
    userName: "홍홍홍",
    email: "c@gmail.com",
    password: "1234",
    grade: "DISABLE",
    organization: "데브코스3",
    profileImage:
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
