import Button from "../common/Button";
import SelectCategory from "../CreateProjectModal/SelectCategory";
import SelectMember from "../CreateProjectModal/SelectMember";
import SelectTeammate from "../CreateProjectModal/SelectMember";
import WriteProjectName from "../CreateProjectModal/WriteProjectName";

interface CreateProjectModalProps {
  setIsCreateProjectModal: React.Dispatch<React.SetStateAction<boolean>>;
}

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
// 여기까지 임시 데이터

const CreateProjectModal = ({
  setIsCreateProjectModal,
}: CreateProjectModalProps) => {
  return (
    <div
      className="w-[790px] h-fit bg-white text-main-green
    flex justify-center items-center gap-[30px]"
      onClick={(e) => e.stopPropagation()}
    >
      {/* 프로젝트 생성 */}
      <div
        className="w-[350px] flex flex-col justify-between items-center
      gap-[20px] px-[50px] py-[30px]"
      >
        {/* 제목 */}
        <p className="w-full text-center text-[18px] font-bold">
          프로젝트 생성
        </p>

        {/* 프로젝트명 작성 */}
        <WriteProjectName />

        {/* 분야 검색 */}
        <SelectCategory />

        {/* 팀원 검색 */}
        <SelectMember data={membersData} />

        {/* 버튼 */}
        <div className="flex gap-[20px] w-[174px]">
          <Button
            text="생성하기"
            size="md"
            css="text-main-green01 w-full text-[14px] bg-white border-[1px] border-main-green01"
          />
          <Button
            text="취소"
            size="md"
            css="text-main-beige01 w-full text-[14px] bg-[#2B3E34] border-none"
            onClick={() => setIsCreateProjectModal(false)}
          />
        </div>
      </div>
      {/* 워드 클라우드 */}
      <div className="w-[440px]"></div>
    </div>
  );
};

export default CreateProjectModal;
