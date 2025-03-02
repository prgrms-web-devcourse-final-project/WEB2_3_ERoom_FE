import AdminButton from "../../common/AdminButton";
import Button from "../../common/Button";
import SearchIcon from "../../../assets/icons/search.svg";

import ResotreIcon from "../../../assets/icons/restore_account.svg";
import { useEffect, useState } from "react";
import Pagination from "../Pagination";
import UnCheckBox from "../../../assets/icons/unchecked_box.svg";
import CheckBox from "../../../assets/icons/checked_box.svg";
import AdminProjectList from "./AdminProjectList";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  adminDeleteProject,
  getAdminInActiveProjectList,
  getAdminProjectList,
} from "../../../api/admin";
import AdminDeleteBtn from "../Button/AdminDeleteBtn";

const AdminProject = () => {
  const { data: adminActiveProject } = useQuery<AdminProjectsListType[]>({
    queryKey: ["AdminAcitveProject"],
    queryFn: getAdminProjectList,
  });

  const { data: adminInActiveProject } = useQuery<AdminProjectsListType[]>({
    queryKey: ["AdminInAcitveProject"],
    queryFn: getAdminInActiveProjectList,
  });

  // const [projects, setProjects] = useState(adminActiveProject);

  //추후 프로젝트 정보 업데이트 API 나오면 연동 추가
  // const handleUpdateProject = (
  //   id: number,
  //   updatedProject: Partial<AdminProjectsListType>
  // ) => {
  //   setProjects((prevProjects) =>
  //     prevProjects.map((project) =>
  //       project.id === id ? { ...project, ...updatedProject } : project
  //     )
  //   );
  // };

  //활성계정, 비활성계정 페이지 이동과 버튼 UI변경
  const [projectMenu, setProjectMenu] = useState<"active" | "inactive">(
    "active"
  );

  const handleButtonClick = (type: "active" | "inactive") => {
    setProjectMenu(type);
  };

  const selectedProjects =
    projectMenu === "active" ? adminActiveProject : adminInActiveProject;

  //페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // 한 페이지에 보여줄 항목 개수
  const totalPages = selectedProjects
    ? Math.ceil(selectedProjects.length / itemsPerPage)
    : 1;

  // 현재 페이지에 해당하는 데이터만 필터링
  // 활성 프로젝트
  const paginatedProjects = selectedProjects?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckBox = () => {
    setIsChecked((prev) => !prev);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [projectMenu]);

  // 프로젝트 삭제(비활성)
  const [checkedIds, setCheckedIds] = useState<number[]>([]);

  useEffect(() => {
    console.log(checkedIds);
  }, [checkedIds]);

  const { mutateAsync } = useMutation({
    mutationFn: (projectId: number) => adminDeleteProject(projectId),
  });

  const deleteProjects = () => {
    checkedIds.forEach(async (id) => {
      const response = await mutateAsync(id);
      console.log(response, "del");
    });

    alert("선택한 프로젝트 삭제완료!");
  };

  return (
    <div className="h-[calc(100vh-50px)] bg-gradient-to-t from-white/0 via-[#BFCDB7]/30 to-white/0">
      <div className="min-h-[calc(100vh-80px)] mx-[30px] mb-[30px] px-[30px] pt-[30px] flex flex-col bg-white/60">
        <div className="pl-[20px] mb-[30px]">
          <span className="text-[22px] font-bold text-main-green">
            프로젝트 정보
          </span>
        </div>
        <div className="flex justify-between mb-[30px]">
          <div className="flex gap-[10px]">
            <AdminButton
              text="활성 프로젝트"
              type={projectMenu === "active" ? "green" : "white"}
              onClick={() => handleButtonClick("active")}
            />
            <AdminButton
              text="비활성 프로젝트"
              type={projectMenu === "inactive" ? "green" : "white"}
              onClick={() => handleButtonClick("inactive")}
            />
          </div>
          <div className="flex gap-[10px]">
            <input
              className="w-[250px] h-[27px] border border-header-green rounded-[5px] focus:outline-none flex px-[10px] items-center text-[14px]"
              placeholder="프로젝트명 검색"
            />
            <Button
              text="검색"
              logo={SearchIcon}
              size="sm"
              css="h-[27px] text-[14px] text-main-beige01 bg-header-green"
            />
          </div>
          <div className="flex gap-[5px] w-[80px] justify-end">
            {projectMenu === "inactive" && (
              <button>
                <img src={ResotreIcon} alt="계정 복구 버튼" />
              </button>
            )}
            <AdminDeleteBtn onClick={deleteProjects} />
          </div>
        </div>
        <div className="flex flex-col gap-[10px] flex-grow mb-[30px]">
          {/* 제목 부분 */}
          <div className="grid grid-cols-[5%_5%_15%_15%_30%_30%] h-[36px] w-full text-main-green text-[14px] border-b border-b-header-green">
            <div className="flex justify-center items-center">
              <button onClick={toggleCheckBox} className="cursor-pointer">
                <img src={isChecked ? CheckBox : UnCheckBox} alt="체크박스" />
              </button>
            </div>
            <div className="flex justify-center items-center">
              <span>No.</span>
            </div>
            <div className="flex justify-center items-center">
              <span>프로젝트명</span>
            </div>
            <div className="flex justify-center items-center">
              <span>진행상태</span>
            </div>
            <div className="flex justify-center items-center">
              <span>생성일</span>
            </div>
            <div className="flex justify-center items-center">
              <span>기간</span>
            </div>
          </div>
          {paginatedProjects &&
            paginatedProjects.map((project, index) => (
              <AdminProjectList
                key={project.projectId}
                project={project}
                index={(currentPage - 1) * itemsPerPage + index}
                setCheckedIds={setCheckedIds}
                // onUpdateProject={handleUpdateProject}
              />
            ))}
          <div className="flex justify-center items-center mt-[30px]">
            <Pagination
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              menu={projectMenu}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProject;
