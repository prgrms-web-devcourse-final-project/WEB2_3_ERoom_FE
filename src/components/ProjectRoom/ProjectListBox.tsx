import { Link } from "react-router";

const ProjectListBox = () => {
  return (
    <div className="bg-fuchsia-500 w-full h-[70px] flex justify-between items-center px-10">
      <div>
        <p>프로젝트 명</p>
        <p>프로젝트 기간</p>
      </div>

      {/* 진행률 */}
      <div>
        <p>진행률</p>
      </div>

      {/* 참여인원 */}
      <div>
        <p>참여인원</p>
      </div>

      {/* 프로젝트 입장 임시 url설정 */}
      <Link
        to={`/projectRoom/detail`}
        className="bg-[#fffce2] p-[10px] font-bold"
      >
        프로젝트 입장
      </Link>
    </div>
  );
};

export default ProjectListBox;
