import { useCallback, useEffect, useState } from "react";
import cancelButton from "../../assets/button/cancelButton.svg";
import { debounceFunction } from "../../utils/debounce";
import { useQuery } from "@tanstack/react-query";
import { searchMembers } from "../../api/search";
import { debounce } from "lodash";

const SelectMember = ({
  selectedData,
  selectedMembers,
  setSelectedMembers,
  value,
}: SelectMembersProps) => {
  // 인풋값 상태 관리
  const [inputValue, setInputValue] = useState("");
  // 필터링된 팀원 목록 상태
  const [filteredMembers, setFilteredMembers] = useState<MemberType[]>([]);

  useEffect(() => {
    console.log(selectedMembers);
  }, [selectedMembers]);

  // 검색 함수
  const { data: searchMember, refetch } = useQuery<MemberType[]>({
    queryKey: ["searchMember", inputValue],
    queryFn: () => searchMembers(inputValue),
    enabled: false,
  });

  useEffect(() => {
    console.log("searchmember", searchMember);
  }, [searchMember]);

  // 선택한 팀원 관리 props로 변경
  useEffect(() => {
    if (selectedMembers && setSelectedMembers) {
      setSelectedMembers(selectedMembers);
    }
  }, [selectedData]);

  /* 검색결과 표시 함수 */
  // const filterMembers = useCallback(
  //   (value: string) => {
  //     if (value.trim() === "") {
  //       setFilteredMembers([]);
  //       return;
  //     }

  //     // 팀원 배열에서 입력값을 포함하는 프로젝트 필터링
  //     const filtered = dummy.membersData
  //       .filter((member) =>
  //         member.username?.toLowerCase().includes(value.toLowerCase())
  //       )
  //       .filter(
  //         (member) =>
  //           !selectedMembers?.some((selected) => selected.id === member.id)
  //       )
  //       .sort((a, b) => a.username.localeCompare(b.username));

  //     setFilteredMembers(filtered);
  //   },
  //   [dummy.membersData, selectedMembers]
  // );

  /* 디바운스된 핸들러 */
  const debouncedSearch = useCallback(
    debounce(() => {
      if (inputValue.trim()) {
        refetch();
      }
    }, 500),
    [inputValue]
  );

  useEffect(() => {
    debouncedSearch();

    return () => debouncedSearch.cancel();
  }, [inputValue]);

  // --------------------------------------------------------
  /* 검색어 변경 핸들러 */
  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setInputValue(value);
  //   debouncedFilter(value);
  // };

  /* 검색 결과 클릭 시, 선택된 팀원 업데이트 */
  const handleMemberClick = (member: MemberType) => {
    // 이미 선택된 팀원이 있는지 확인

    const isSelected = selectedMembers?.some(
      (selected) => selected.id === member.id
    );

    if (!isSelected && setSelectedMembers) {
      setSelectedMembers((prevSelected: MemberType[]) =>
        [...prevSelected, member].sort((a, b) =>
          a.username.localeCompare(b.username)
        )
      );
    }

    // 필터된 팀원 목록에서 선택된 팀원 제외
    setFilteredMembers((prevFiltered) =>
      prevFiltered.filter((filtered) => filtered.id !== member.id)
    );
  };

  /* 취소 버튼 클릭 시 선택된 팀원에서 제거 */
  const handleCancelClick = (id: number) => {
    if (setSelectedMembers)
      setSelectedMembers((prevSelected: MemberType[]) =>
        prevSelected
          .filter((member) => member.id !== id)
          .sort((a, b) => a.username.localeCompare(b.username))
      );

    // 취소 후 필터된 팀원 목록에 다시 추가
    const removedMember =
      selectedMembers && selectedMembers.find((member) => member.id === id);

    if (removedMember) {
      setFilteredMembers((prevFiltered) =>
        [...prevFiltered, removedMember].sort((a, b) =>
          a.username.localeCompare(b.username)
        )
      );
    }
  };

  return (
    <div className="flex flex-col w-full gap-[5px]">
      {/* 팀원 검색 */}
      <p className="w-full font-bold">{value === "업무" ? "담당자" : "팀원"}</p>

      <input
        className="w-full py-[5px]
          border-[1px] border-gray01 rounded-[5px] text-center
          font-bold text-[14px] text-logo-green placeholder-gray01"
        placeholder={value === "업무" ? "담당자 검색" : "팀원 검색"}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      {/* 검색 결과 목록 */}
      {inputValue && (
        <div
          className="flex flex-col gap-[5px] w-full text-logo-green text-[14px]
          font-bold"
        >
          {/* (검색결과) 선택된 팀원 */}

          {/* (검색결과) 필터된 팀원 */}
          {searchMember?.map((member) => (
            <div
              key={member.id}
              className="flex justify-between items-center cursor-pointer
              font-medium"
              onClick={() => {
                setInputValue("");
                handleMemberClick(member);
              }}
            >
              {/* 이름 & 이메일 */}
              <div className="w-full px-[10px] py-[5px]">
                <div className="text-main-green">@{member.username}</div>
                <div className="text-gray01">{member.email}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* (선택결과) 선택된 팀원 이미지 */}
      <div className="flex">
        {selectedMembers?.map((member) => (
          <div
            key={member.id}
            className="w-[50px] h-[50px] bg-cover bg-center rounded-[100px]
              border-[1px] border-main-green cursor-pointer"
            style={{ backgroundImage: `url(${member.profile})` }}
            onClick={() => handleCancelClick(member.id)}
          >
            <div
              className="flex justify-center items-center
                  w-full h-full rounded-[100px] bg-main-green/70
                text-white text-[14px] text-center font-medium
                  opacity-0 hover:opacity-100 transition-opacity duration-300"
            >
              {member.username}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectMember;
