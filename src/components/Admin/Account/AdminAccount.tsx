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
import { testAPI } from "../../../api/test";

const AdminAccount = () => {
  // 더미 데이터
  const dummyUsers: AccountListProps[] = Array.from(
    { length: 200 },
    (_, i) => ({
      id: i + 1,
      email: `user${i + 1}@example.com`,
      name: `사용자${i + 1}`,
      registeredDate: `2025.02.${String(i + 1).padStart(2, "0")}`,
      profileImage: "https://via.placeholder.com/50",
      organization: `데브코스 프론트엔드 ${(i % 3) + 1}기`,
      isSubscribed: i % 2 === 0,
      isActive: i % 3 !== 0,
    })
  );

  const [users, setUsers] = useState(dummyUsers);

  const handleUpdateSubscription = (id: number, isSubscribed: boolean) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, isSubscribed } : user
      )
    );
  };

  //추후 유저 정보 업데이트 API 나오면 연동 추가
  const handleUpdateUser = (
    id: number,
    updatedUser: Partial<AccountListProps>
  ) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, ...updatedUser } : user
      )
    );
  };

  //활성계정, 비활성계정 페이지 이동과 버튼 UI변경

  const [userMenu, setUserMenu] = useState("active");

  const handleButtonClick = (type: "active" | "inactive") => {
    setUserMenu(type);
  };
  const filteredUsers = users.filter((user) =>
    userMenu === "active" ? user.isActive : !user.isActive
  );

  //페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // 한 페이지에 보여줄 항목 개수
  const totalPages = Math.ceil(users.length / itemsPerPage);

  // 현재 페이지에 해당하는 데이터만 필터링
  const paginatedUsers = filteredUsers.slice(
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
              <button>
                <img src={ResotreIcon} alt="계정 복구 버튼" />
              </button>
            )}
            {userMenu === "active" && (
              <button>
                <img src={DeleteIcon} alt="계정 삭제 버튼" />
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-[10px] flex-grow mb-[30px]">
          {/* 제목 부분 */}
          <div className="grid grid-cols-[5%_5%_30%_25%_25%_10%] h-[36px] w-full text-main-green text-[14px] border-b border-b-header-green">
            <div className="flex justify-center items-center">
              <button onClick={toggleCheckBox}>
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
              <span>구독</span>
            </div>
          </div>
          {paginatedUsers.map((user, index) => (
            <AccountList
              key={user.id}
              user={user}
              index={(currentPage - 1) * itemsPerPage + index}
              onUpdateSubscription={handleUpdateSubscription}
              onUpdateUser={handleUpdateUser}
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
