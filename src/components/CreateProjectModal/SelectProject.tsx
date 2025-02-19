import { useState } from "react";
import cancelButton from "../../assets/button/cancelButton.svg";

interface ProjectDataType {
  name?: string;
  startDate?: string;
  endDate?: string;
}

interface SelectProjectProps {
  data: ProjectDataType[];
}

const SelectProject = ({ data }: SelectProjectProps) => {
  // 인풋값 상태 관리
  const [inputValue, setInputValue] = useState("");
  // 필터링된 프로젝트 목록 상태
  const [filteredProjects, setFilteredProjects] = useState<ProjectDataType[]>(
    []
  );
  // 선택된 프로젝트 상태 관리
  const [selectedProject, setSelectedProject] =
    useState<ProjectDataType | null>(null);

  /* 검색결과 표시 함수 */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // 숫자만 포함된 입력값일 경우, 숫자로만 필터링
    const isNumeric = /^[0-9]*$/.test(value);

    // 프로젝트명 배열에서 입력값을 포함하는 프로젝트 필터링
    const filtered = data
      .filter((project) => {
        if (isNumeric) {
          // 숫자만 검색할 경우, 프로젝트명에 숫자가 포함된 항목을 필터링
          return project.name?.split("").some((char) => char === value);
        } else {
          // 텍스트 필터링: 숫자 또는 텍스트에 대해 모두 처리
          return project.name?.toLowerCase().includes(value.toLowerCase());
        }
      })
      .map((project) => ({
        name: project.name, // 프로젝트명
        startDate: project.startDate, // 시작 날짜
        endDate: project.endDate, // 종료 날짜
      }));

    setFilteredProjects(filtered);
  };

  /* 검색 결과 클릭 시, 입력값을 해당 프로젝트명으로 설정 */
  const handleProjectClick = (project: ProjectDataType) => {
    setSelectedProject(project);
    // 클릭 후 인풋창 비워서 초기값으로 설정
    setInputValue("");
    // 클릭 후 검색결과를 비워서 목록을 숨기기
    setFilteredProjects([]);
  };
  console.log(selectedProject);

  return (
    <div className="w-full">
      {/* 프로젝트명 */}
      <p className="w-full font-bold">프로젝트명</p>
      <input
        className="w-full py-[5px]
          border-[1px] border-gray01 rounded-[5px] text-center
          font-bold text-[14px] text-logo-green placeholder-gray01"
        placeholder="프로젝트 검색"
        value={inputValue}
        onChange={handleInputChange}
      ></input>

      {/* 검색결과 */}
      {inputValue && filteredProjects.length > 0 && (
        <div className="w-full mt-4">
          <ul>
            {filteredProjects.map((project, index) => (
              <div key={index} onClick={() => handleProjectClick(project)}>
                {/* (검색결과) 프로젝트명 */}
                <li className="text-black01 text-[14px]">{project.name}</li>
                {/* (검색결과) 기간 */}
                <li className="text-gray01 text-[12px]">
                  {project.startDate} ~ {project.endDate}
                </li>
              </div>
            ))}
          </ul>
        </div>
      )}
      {selectedProject && (
        <div
          className="flex justify-between text-logo-green text-[14px]
          p-[5px] font-bold"
        >
          <div>
            {/* (선택결과) 프로젝트명 */}
            <div className="text-black01 text-[14px]">
              {selectedProject.name}
            </div>
            {/* (선택결과) 기간 */}
            <div className="text-gray01 text-[12px]">
              {selectedProject.startDate} ~ {selectedProject.endDate}
            </div>
          </div>
          <img
            src={cancelButton}
            onClick={() => setSelectedProject(null)}
            className="cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};

export default SelectProject;
