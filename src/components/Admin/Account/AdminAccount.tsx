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
  deleteAdminAccount,
  getInActiveMemberList,
  getMemberList,
} from "../../../api/admin";
import { queryClient } from "../../../main";

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

  useEffect(() => {
    if (AllMemberData && inActiveMemberData) {
      if (userMenu === "active") {
        setMemberData(AllMemberData);
      } else {
        setMemberData(inActiveMemberData);
      }
    }
  }, [userMenu, AllMemberData, inActiveMemberData]);

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

  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckBox = () => {
    setIsChecked((prev) => !prev);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [userMenu]);

  // 관리자 계정 비활성(삭제)
  const [deleteAccountId, setDeleteAccountId] = useState<number | null>(null);

  const { mutate } = useMutation({
    mutationFn: (memberId: number) => deleteAdminAccount(memberId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["AdminAllMemberData"] }),
  });

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
          <div className="flex gap-[10px]">
            <input
              className="w-[250px] h-[27px] border border-header-green rounded-[5px] focus:outline-none flex px-[10px] items-center text-[14px]"
              placeholder="계정 이름 검색"
            />
            <Button
              text="검색"
              logo={SearchIcon}
              size="sm"
              css="h-[27px] text-[14px] text-main-beige01 bg-header-green"
            />
          </div>
          <div className="flex gap-[5px] w-[80px] justify-end">
            {userMenu === "inactive" && (
              <button className="cursor-pointer">
                <img src={ResotreIcon} alt="계정 복구 버튼" />
              </button>
            )}
            {userMenu === "active" && (
              <button
                className="cursor-pointer"
                onClick={() => {
                  if (!deleteAccountId) {
                    return alert("유저를 선택해주세요");
                  }
                  mutate(deleteAccountId);
                  alert("유저가 삭제되었습니다");
                }}
              >
                <img src={DeleteIcon} alt="계정 삭제 버튼" />
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-[10px] flex-grow mb-[30px]">
          {/* 제목 부분 */}
          <div className="grid grid-cols-[5%_5%_30%_25%_25%_10%] h-[36px] w-full text-main-green text-[14px] border-b border-b-header-green">
            <div className="flex justify-center items-center">
              <button onClick={toggleCheckBox} className="cursor-pointer">
                <img src={isChecked ? CheckBox : UnCheckBox} alt="체크박스" />
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
          {paginatedUsers?.map((user, index) => (
            <AccountList
              key={user.memberId}
              user={user}
              index={(currentPage - 1) * itemsPerPage + index}
              setDeleteAccountId={setDeleteAccountId}
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
