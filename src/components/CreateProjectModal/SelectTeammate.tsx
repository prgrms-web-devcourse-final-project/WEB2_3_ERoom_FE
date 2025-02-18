import { useState } from "react";
import cancelButton from "../../assets/button/cancelButton.svg";

interface TeammateType {
  id: number;
  userName: string;
  email: string;
  password: string;
  grade: string;
  organization: string;
  profileImage: string;
  delete: string;
}

interface SelectTeammateProps {
  data: TeammateType[];
}

const SelectTeammate = ({ data }: SelectTeammateProps) => {
  // 인풋값 상태 관리
  const [inputValue, setInputValue] = useState("");
  // 필터링된 팀원 목록 상태
  const [filteredTeammate, setFilteredTeammate] = useState<TeammateType[]>([]);
  // 선택된 팀원 상태 관리
  const [selectedTeammate, setSelectedTeammate] = useState<TeammateType[]>([]);

  /* 검색결과 표시 함수 */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim() === "") {
      setFilteredTeammate([]);
      return;
    }

    // 팀원 배열에서 입력값을 포함하는 프로젝트 필터링
    const filtered = data
      .filter((teammate) =>
        teammate.userName?.toLowerCase().includes(value.toLowerCase())
      )
      .filter(
        (teammate) =>
          !selectedTeammate.some((selected) => selected.id === teammate.id)
      );
    setFilteredTeammate(filtered);

    setFilteredTeammate(filtered);
  };

  /* 검색 결과 클릭 시, 선택된 팀원 업데이트 */
  const handleTeammateClick = (teammate: TeammateType) => {
    // 이미 선택된 팀원이 있는지 확인
    const isSelected = selectedTeammate.some(
      (selected) => selected.id === teammate.id
    );

    if (!isSelected) {
      setSelectedTeammate((prevSelected) => [...prevSelected, teammate]);
    }

    // 필터된 팀원 목록에서 선택된 팀원 제외
    setFilteredTeammate((prevFiltered) =>
      prevFiltered.filter((filtered) => filtered.id !== teammate.id)
    );
  };

  /* 취소 버튼 클릭 시 선택된 팀원에서 제거 */
  const handleCancelClick = (id: number) => {
    setSelectedTeammate((prevSelected) =>
      prevSelected.filter((teammate) => teammate.id !== id)
    );

    // 취소 후 필터된 팀원 목록에 다시 추가
    const removedTeammate = selectedTeammate.find(
      (teammate) => teammate.id === id
    );
    if (removedTeammate) {
      setFilteredTeammate((prevFiltered) => [...prevFiltered, removedTeammate]);
    }
  };
  // console.log(data);
  console.log(selectedTeammate);
  console.log(filteredTeammate);

  return (
    <div className="flex flex-col w-full gap-[5px]">
      {/* 팀원 검색 */}
      <p className="w-full font-bold">팀원</p>
      <input
        className="w-full py-[5px]
          border-[1px] border-gray01 rounded-[5px] text-center
          font-bold text-[14px] text-logo-green placeholder-gray01"
        placeholder="팀원 검색"
        value={inputValue}
        onChange={handleInputChange}
      ></input>

      {/* 검색 결과 목록 */}
      {inputValue && (
        <div
          className="flex flex-col gap-[5px] w-full text-logo-green text-[14px]
          font-bold"
        >
          {/* (검색결과) 선택된 팀원 */}
          {inputValue &&
            selectedTeammate.map((teammate) => (
              <div
                key={teammate.id}
                className="flex justify-between items-center font-semibold
              w-full px-[10px] py-[5px]"
              >
                {/* 이름 & 이메일 */}
                <div>
                  <div className="text-main-green">@{teammate.userName}</div>
                  <div className="text-gray01">{teammate.email}</div>
                </div>
                {/* 취소버튼 */}
                <img
                  src={cancelButton}
                  onClick={() => handleCancelClick(teammate.id)}
                  className="cursor-pointer"
                />
              </div>
            ))}

          {/* (검색결과) 필터된 팀원 */}
          {filteredTeammate.map((teammate) => (
            <div
              key={teammate.id}
              className="flex justify-between items-center cursor-pointer
              font-medium"
              onClick={() => handleTeammateClick(teammate)}
            >
              {/* 이름 & 이메일 */}
              <div className="w-full px-[10px] py-[5px]">
                <div className="text-main-green">@{teammate.userName}</div>
                <div className="text-gray01">{teammate.email}</div>
              </div>
            </div>
          ))}

          {/* (선택결과) 선택된 팀원 이미지 */}
          <div className="flex">
            {selectedTeammate.map((teammate) => (
              <div
                key={teammate.id}
                className="w-[50px] h-[50px] bg-cover bg-center rounded-[100px]
              border-[1px] border-main-green"
                style={{ backgroundImage: `url(${teammate.profileImage})` }}
              >
                <div
                  className="flex justify-center items-center
                  w-full h-full rounded-[100px] bg-main-green/70
                text-white text-[14px] text-center font-medium
                  opacity-0 hover:opacity-100 transition-opacity duration-300"
                >
                  {teammate.userName}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectTeammate;
