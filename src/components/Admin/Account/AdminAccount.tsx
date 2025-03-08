import AdminButton from "../../common/AdminButton";
import Button from "../../common/Button";
import SearchIcon from "../../../assets/icons/search.svg";
import DeleteIcon from "../../../assets/icons/delete.svg";
import ResotreIcon from "../../../assets/icons/restore_account.svg";
import AccountList from "./AdminAccountList";
import { useEffect, useState } from "react";
import Pagination from "../Pagination";
import UnCheckBox from "../../../assets/icons/unchecked_box.svg";
import CheckBox from "../../../assets/icons/checked_box.svg";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  adminRestoreAccount,
  deleteAdminAccount,
  getInActiveMemberList,
  getMemberList,
} from "../../../api/admin";
import { queryClient } from "../../../main";
import { searchAllMembers } from "../../../api/search";
import AlertModal from "../../common/AlertModal";

const AdminAccount = () => {
  // 활성 멤버 데이터
  const { data: AllMemberData } = useQuery<AccountListProps[]>({
    queryKey: ["AdminAllMemberData"],
    queryFn: getMemberList,
  });

  // 비활성 멤버 데이터
  const { data: inActiveMemberData } = useQuery<AccountListProps[]>({
    queryKey: ["AdminInactiveMemberData"],
    queryFn: getInActiveMemberList,
  });
  useEffect(() => {
    console.log(inActiveMemberData);
  }, [inActiveMemberData]);

  const [memberData, setMemberData] = useState<AccountListProps[]>([]);

  //활성계정, 비활성계정 페이지 이동과 버튼 UI변경
  const [userMenu, setUserMenu] = useState<"active" | "inactive">("active");

  const handleButtonClick = (type: "active" | "inactive") => {
    setUserMenu(type);
  };

  //관리자 계정 검색
  const [searchName, setSearchName] = useState<string>("");
  const [searchResult, setSearchResult] = useState<AccountListProps[] | null>(
    null
  );

  const { data: _, refetch } = useQuery<SearchMemberType[]>({
    queryKey: ["searchedMembers", searchName],
    queryFn: () => searchAllMembers(searchName),
    enabled: false,
  });

  const handleSearch = async () => {
    if (searchName.trim() === "") {
      setSearchResult(null);
      return;
    }

    setSearchResult(null);
    const result = await refetch();
    if (result.data) {
      const filteredMembers = result.data.filter((member) =>
        userMenu === "active"
          ? member.deleteStatus === "ACTIVE"
          : member.deleteStatus !== "ACTIVE"
      );

      //타입 매핑
      const convertedMembers = filteredMembers.map((member) => ({
        memberId: member.id,
        email: member.email,
        username: member.username,
        createdAt: member.createdAt,
        profile: member.profile,
        organization: member.organization,
      }));

      setSearchResult(convertedMembers);
    }
  };

  // 검색어 비어있을 때 전체 리스트로 초기화
  useEffect(() => {
    if (searchName.trim() === "") {
      setSearchResult(null);
      setMemberData(
        userMenu === "active" ? AllMemberData || [] : inActiveMemberData || []
      );
    }
  }, [searchName, userMenu, AllMemberData, inActiveMemberData]);

  // 탭 변경 시 검색 결과 초기화
  useEffect(() => {
    setSearchName(""); // 검색어 초기화
    setSearchResult(null); // 검색 결과 초기화
    setMemberData(
      userMenu === "active" ? AllMemberData || [] : inActiveMemberData || []
    );
  }, [userMenu, AllMemberData, inActiveMemberData]);

  //검색 결과가 업데이트되면 `memberData`에 반영
  useEffect(() => {
    if (searchResult !== null) {
      setMemberData(searchResult);
    }
  }, [searchResult]);

  //페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // 한 페이지에 보여줄 항목 개수
  const totalPages = memberData
    ? Math.ceil(memberData.length / itemsPerPage)
    : 1;

  // 현재 페이지에 해당하는 데이터만 필터링
  const paginatedUsers = memberData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const [isCheckedAll, setIsCheckedAll] = useState(false);

  const toggleCheckBox = () => {
    setIsCheckedAll((prev) => !prev);
  };

  useEffect(() => {
    if (isCheckedAll) {
      setCheckedAccountIds(paginatedUsers.map((user) => user.memberId));
    } else {
      setCheckedAccountIds([]);
    }
  }, [isCheckedAll]);

  useEffect(() => {
    setCurrentPage(1);
    setCheckedAccountIds([]);
    setIsCheckedAll(false);
  }, [userMenu]);

  useEffect(() => {
    setIsCheckedAll(false);
    setCheckedAccountIds([]);

    console.log(currentPage);
  }, [currentPage]);

  // 모달 적용
  const [modalText, setModalText] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);

  const openModal = (text: string, confirmAction?: () => void) => {
    setModalText(text);
    setIsModalOpen(true);
    setConfirmAction(() => confirmAction || null);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setConfirmAction(null);
  };

  // 관리자 계정 비활성(삭제)
  const [checkedAccountIds, setCheckedAccountIds] = useState<number[]>([]);

  useEffect(() => {
    console.log(checkedAccountIds);
  }, [checkedAccountIds]);

  const { mutate } = useMutation({
    mutationFn: (memberId: number) => deleteAdminAccount(memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["AdminAllMemberData"] });
      queryClient.invalidateQueries({ queryKey: ["AdminInactiveMemberData"] });
    },
  });

  // 삭제 버튼 클릭 시 실행
  const handleDeleteClick = () => {
    if (checkedAccountIds.length === 0) {
      return openModal("유저를 선택해주세요");
    }

    // 삭제 확인 모달 띄우기
    openModal(
      `정말 ${checkedAccountIds.length}명의 유저를 삭제하시겠습니까?`,
      async () => {
        await Promise.all(
          checkedAccountIds.map((id) => {
            mutate(id);
          })
        );
        closeModal();
        setIsCheckedAll(false);
        setCheckedAccountIds([]);

        alert("유저가 삭제되었습니다");
      }
    );
  };

  // 관리자 계정 활성 전환(복구)
  const { mutate: restoreAccount } = useMutation({
    mutationFn: (id: number) => adminRestoreAccount(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["AdminAllMemberData"] });
      queryClient.invalidateQueries({ queryKey: ["AdminInactiveMemberData"] });
    },
  });

  const handleRestoreAccount = () => {
    if (checkedAccountIds.length === 0) {
      return openModal("유저를 선택해주세요");
    }

    openModal(
      `${checkedAccountIds.length}명의 유저를 복구하시겠습니까?`,
      async () => {
        await Promise.all(
          checkedAccountIds.map((id) => {
            restoreAccount(id);
          })
        );
        closeModal();
        setCheckedAccountIds([]);
        setIsCheckedAll(false);

        alert("유저를 복구했습니다.");
      }
    );
  };

  return (
    <div className="h-[calc(100vh-50px)] bg-gradient-to-t from-white/0 via-[#BFCDB7]/30 to-white/0">
      <div className="min-h-[calc(100vh-80px)] mx-[30px] mb-[30px] px-[30px] pt-[30px] flex flex-col  bg-white/60">
        <div className="pl-[20px] mb-[30px]">
          <span className="text-[22px] font-bold text-main-green">
            회원 계정 정보
          </span>
        </div>
        <div className="flex justify-between mb-[30px]">
          <div className="flex gap-[10px]">
            <AdminButton
              text="활성 계정"
              type={userMenu === "active" ? "green" : "white"}
              onClick={() => handleButtonClick("active")}
            />
            <AdminButton
              text="비활성 계정"
              type={userMenu === "inactive" ? "green" : "white"}
              onClick={() => handleButtonClick("inactive")}
            />
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex gap-[10px]"
          >
            <input
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="w-[250px] h-[27px] border border-header-green rounded-[5px] focus:outline-none flex px-[10px] items-center text-[14px]"
              placeholder="계정 이름 검색"
            />
            <Button
              text="검색"
              logo={SearchIcon}
              size="sm"
              css="h-[27px] text-[14px] text-main-beige01 bg-header-green"
              onClick={handleSearch}
            />
          </form>
          <div className="flex gap-[5px] w-[80px] justify-end">
            {userMenu === "inactive" && (
              <button className="cursor-pointer" onClick={handleRestoreAccount}>
                <img src={ResotreIcon} alt="계정 복구 버튼" />
              </button>
            )}
            {userMenu === "active" && (
              <button className="cursor-pointer" onClick={handleDeleteClick}>
                <img src={DeleteIcon} alt="계정 삭제 버튼" />
              </button>
            )}
            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
                <AlertModal
                  text={modalText}
                  onClose={closeModal}
                  onConfirm={confirmAction}
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-[10px] flex-grow mb-[30px]">
          {/* 제목 부분 */}
          <div className="grid grid-cols-[5%_5%_30%_25%_25%_10%] h-[36px] w-full text-main-green text-[14px] border-b border-b-header-green">
            <div className="flex justify-center items-center">
              <button onClick={toggleCheckBox} className="cursor-pointer">
                <img
                  src={isCheckedAll ? CheckBox : UnCheckBox}
                  alt="체크박스"
                />
              </button>
            </div>
            <div className="flex justify-center items-center">
              <span>No.</span>
            </div>
            <div className="flex justify-center items-center">
              <span>이메일</span>
            </div>
            <div className="flex justify-center items-center">
              <span>이름</span>
            </div>
            <div className="flex justify-center items-center">
              <span>등록일</span>
            </div>
            <div className="flex justify-center items-center">
              <span>수정</span>
            </div>
          </div>
          {(paginatedUsers || []).map((user, index) => (
            <AccountList
              key={user.memberId}
              user={user}
              index={(currentPage - 1) * itemsPerPage + index}
              checkedAccountIds={checkedAccountIds}
              setCheckedAccountIds={setCheckedAccountIds}
            />
          ))}
        </div>
        <div className="flex justify-center items-center mt-auto mb-[30px]">
          <Pagination totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      </div>
    </div>
  );
};

export default AdminAccount;
