import AdminButton from "../common/AdminButton";
import Button from "../common/Button";
import SearchIcon from "../../assets/icons/search.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import AccountList from "./AccountList";
import { useState } from "react";

interface AccountListProps {
  id: number;
  email: string;
  name: string;
  registeredDate: string;
  profileImage: string;
  organization: string;
  isSubscribed: boolean;
}

const Account = () => {
  const dummyUsers = [
    {
      id: 1,
      email: "user1@example.com",
      name: "김철수",
      registeredDate: "2025.02.01",
      profileImage: "https://via.placeholder.com/50",
      organization: "데브코스 프론트엔드 2기",
      isSubscribed: true,
    },
    {
      id: 2,
      email: "user2@example.com",
      name: "이영희",
      registeredDate: "2025.02.02",
      profileImage: "https://via.placeholder.com/50",
      organization: "데브코스 백엔드 1기",
      isSubscribed: false,
    },
    {
      id: 3,
      email: "user3@example.com",
      name: "박지훈",
      registeredDate: "2025.02.03",
      profileImage: "https://via.placeholder.com/50",
      organization: "데브코스 프론트엔드 2기",
      isSubscribed: true,
    },
    {
      id: 4,
      email: "user4@example.com",
      name: "최민수",
      registeredDate: "2025.02.04",
      profileImage: "https://via.placeholder.com/50",
      organization: "데브코스 프론트엔드 1기",
      isSubscribed: false,
    },
    {
      id: 5,
      email: "user5@example.com",
      name: "정하나",
      registeredDate: "2025.02.05",
      profileImage: "https://via.placeholder.com/50",
      organization: "데브코스 백엔드 1기",
      isSubscribed: true,
    },
    {
      id: 6,
      email: "user6@example.com",
      name: "강동원",
      registeredDate: "2025.02.06",
      profileImage: "https://via.placeholder.com/50",
      organization: "데브코스 프론트엔드 3기",
      isSubscribed: false,
    },
    {
      id: 7,
      email: "user7@example.com",
      name: "서지수",
      registeredDate: "2025.02.07",
      profileImage: "https://via.placeholder.com/50",
      organization: "데브코스 백엔드 2기",
      isSubscribed: true,
    },
    {
      id: 8,
      email: "user8@example.com",
      name: "한경훈",
      registeredDate: "2025.02.08",
      profileImage: "https://via.placeholder.com/50",
      organization: "데브코스 데이터 분석",
      isSubscribed: true,
    },
    {
      id: 9,
      email: "user9@example.com",
      name: "문가영",
      registeredDate: "2025.02.09",
      profileImage: "https://via.placeholder.com/50",
      organization: "데브코스 AI 1기",
      isSubscribed: false,
    },
    {
      id: 10,
      email: "user10@example.com",
      name: "손민호",
      registeredDate: "2025.02.10",
      profileImage: "https://via.placeholder.com/50",
      organization: "데브코스 프론트엔드 2기",
      isSubscribed: true,
    },
  ];

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

  return (
    <div>
      <div className="mx-[30px] mb-[30px] p-[30px] bg-white flex flex-col gap-[30px]">
        <div className="pl-[20px] bg-white/60">
          <span className="text-[22px] font-bold text-main-green">
            회원 계정 정보
          </span>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-[10px]">
            <AdminButton text="활성 계정" type="green" />
            <AdminButton text="비활성 계정" type="white" />
          </div>
          <div className="flex gap-[10px]">
            <input className="w-[250px] h-[27px] border border-header-green rounded-[5px]" />
            <Button
              text="검색"
              logo={SearchIcon}
              size="sm"
              css="h-[27px] text-[14px] text-main-beige01 bg-header-green"
            />
          </div>
          <button>
            <img src={DeleteIcon} />
          </button>
        </div>
        <div className="flex flex-col gap-[10px]">
          {/* 제목 부분 */}
          <div className="grid grid-cols-[5%_5%_30%_25%_25%_10%] h-[36px] w-full text-main-green text-[14px] border-b border-b-header-green">
            <div className="flex justify-center items-center">
              <input type="checkbox" />
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
          {users.map((user, index) => (
            <AccountList
              key={user.id}
              user={user}
              index={index}
              onUpdateSubscription={handleUpdateSubscription}
              onUpdateUser={handleUpdateUser}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Account;
