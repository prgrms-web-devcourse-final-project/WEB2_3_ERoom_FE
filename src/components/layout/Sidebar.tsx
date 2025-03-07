import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router";
import outProjectIcon from "../../assets/icons/outProjectDetail.svg";
import sidebarAllicon from "../../assets/icons/sidebarAllicon.svg";
import sidebarManagerIcon from "../../assets/icons/sidebarManagerIcon.svg";
import sidebarMeetIcon from "../../assets/icons/sidebarMeetIcon.svg";
import { twMerge } from "tailwind-merge";
import sideLeftArrow from "../../assets/icons/sideLeftArrow.svg";
import sideRightArrow from "../../assets/icons/sideRightArrow.svg";
import accountIcon from "../../assets/icons/dashboard/accountIcon.svg";
import dashboardIcon from "../../assets/icons/dashboard/dashboardIcon.svg";
import projectIcon from "../../assets/icons/dashboard/projectIcon.svg";
import tagIcon from "../../assets/icons/dashboard/tagIcon.svg";
import taskIcon from "../../assets/icons/dashboard/taskIcon.svg";
import ManagerCheckBox from "./ManagerCheckBox";
import { useSideManagerStore } from "../../store/sideMemberStore";

const SIDE_MENU_LIST = [
  // 프로젝트룸
  { title: "전체 업무", icon: sidebarAllicon, src: "all" },
  { title: "담당자", icon: sidebarManagerIcon, src: "manager" },
  { title: "미팅룸", icon: sidebarMeetIcon, src: "meeting" },
];

const ADMIN_SIDE_MENU_LIST = [
  { title: "대시보드", icon: dashboardIcon, src: "dashboard" },
  { title: "계정 관리", icon: accountIcon, src: "account" },
  { title: "프로젝트 관리", icon: projectIcon, src: "project" },
  { title: "업무 관리", icon: taskIcon, src: "task" },
  { title: "태그 관리", icon: tagIcon, src: "tag" },
];

interface SidebarProps {
  sidebarToggle: boolean;
  setSidebarToggle: React.Dispatch<React.SetStateAction<boolean>>;
  managers: {
    memberId: number;
    username: string;
    profile: string;
    email?: string;
  }[];
}

const Sidebar = ({
  sidebarToggle,
  setSidebarToggle,
  managers,
}: SidebarProps) => {
  const { pathname } = useLocation();
  const [sidebarTab] = useSearchParams();

  // console.log("managers", managers);

  /* 관리자페이지 사이드 메뉴 */
  const [adminSideMenu, setAdminSideMenu] = useState(sidebarTab.get("tab"));

  /* 프로젝트룸 사이드 메뉴 */
  const [projectRoomMenu, setProjectRoomMenu] = useState(
    sidebarTab.get("category")
  );

  const checkedManagers = useSideManagerStore((state) => state.checkedManagers);
  const handleAllClick = useSideManagerStore((state) => state.handleAllClick);
  const handleUnAllClick = useSideManagerStore(
    (state) => state.handleUnAllClick
  );
  const handleManagerClick = useSideManagerStore(
    (state) => state.handleManagerClick
  );

  // 담당자 정렬 상태
  const [sortedManagers, setSortedManagers] = useState<members[]>([]);

  useEffect(() => {
    // managers 배열을 정렬하여 상태에 저장
    const sorted = [...managers].sort((a, b) => {
      if (a.username < b.username) {
        return -1;
      }
      if (a.username > b.username) {
        return 1;
      }
      return 0;
    });
    setSortedManagers(sorted);
  }, [managers]);

  useEffect(() => {
    if (managers.length > 0 && projectRoomMenu === "manager") {
      // 초기 체크박스 전체선택
      const allManagerName = managers.map((manager) => manager.username);
      handleAllClick(allManagerName);
    }
  }, [projectRoomMenu, managers]);

  const handleAllCheck = (isChecked: boolean) => {
    if (isChecked) {
      const allManagerNames = managers.map((m) => m.username);
      handleAllClick(allManagerNames);
    } else {
      handleUnAllClick();
    }
  };

  // 개별 체크박스 핸들러
  const handleManagerCheck = (name: string) => {
    handleManagerClick(name);
  };

  useEffect(() => {
    if (pathname.startsWith("/admin")) {
      if (!sidebarTab.get("tab")) setAdminSideMenu("dashboard");
      else setAdminSideMenu(sidebarTab.get("tab"));
    } else if (pathname.startsWith("/project-room")) {
      if (!sidebarTab.get("category")) setProjectRoomMenu("all");
      else setProjectRoomMenu(sidebarTab.get("category"));
    }
  }, [sidebarTab]);

  if (pathname.startsWith("/project-room")) {
    // 프로젝트룸 사이드바
    return (
      <div className="w-[140px] bg-white min-h-[calc(100vh-50px)] flex-none">
        <ul className="flex flex-col items-center gap-6 pt-10 w-full">
          {/* 업무페이지 나가기 버튼 */}
          <li>
            <Link to="/project-room" className="flex flex-col items-center">
              <img src={outProjectIcon} alt="프로젝트 나가기 버튼" />
              <p className="font-bold text-main-green01">My프로젝트</p>
            </Link>
          </li>
          {SIDE_MENU_LIST.map((menu, idx) => {
            return (
              <li key={idx} className="w-full">
                <div
                  className="font-bold w-full h-[35px] flex flex-col items-center cursor-pointer
                "
                >
                  <Link
                    to={`${pathname}?category=${menu.src}`}
                    className={twMerge(
                      `flex items-center px-5 gap-2 w-full h-full
                    ${projectRoomMenu === menu.src ? "bg-main-green03" : ""}`
                    )}
                  >
                    <img src={menu.icon} alt="사이드바 메뉴 아이콘" />
                    <p className="text-header-green">{menu.title}</p>
                  </Link>
                </div>

                {/* 담당자 */}
                {menu.src === "manager" && menu.src === projectRoomMenu && (
                  <div className="pl-5 pt-2">
                    {/* 전체 */}
                    <ManagerCheckBox
                      checkboxId="all"
                      checkboxName="all"
                      labelName="전체"
                      checked={checkedManagers.length === managers.length}
                      onChange={(e) => handleAllCheck(e.target.checked)}
                    />

                    {/* 담당자별 */}
                    {sortedManagers.map((member) => (
                      <ManagerCheckBox
                        key={member.memberId}
                        checkboxName={member.username}
                        checkboxId={`${member.memberId}`}
                        labelName={member.username}
                        checked={checkedManagers.includes(member.username)}
                        onChange={() => {
                          handleManagerCheck(member.username);
                        }}
                      />
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  } else if (pathname.startsWith("/admin")) {
    return (
      // 관리자페이지 사이드바
      <div
        className="w-[140px] bg-white min-h-[calc(100vh-50px)] flex-none
        font-bold flex flex-col items-center pt-5 text-main-green01"
      >
        <p className="pb-7 border-b border-header-green w-[100px] text-center ">
          관리자 메뉴
        </p>

        <ul className="flex flex-col gap-5 mt-7 text-[15px]">
          {ADMIN_SIDE_MENU_LIST.map((adminMenu, idx) => {
            return (
              <li
                key={idx}
                className={twMerge(
                  `bg-white w-full h-[35px] ${
                    adminSideMenu === adminMenu.src && "bg-main-green03"
                  }`
                )}
                onClick={() => setAdminSideMenu(adminMenu.src)}
              >
                <Link
                  to={`${pathname}?tab=${adminMenu.src}`}
                  className="flex gap-2 w-full h-full items-center px-2"
                >
                  <img
                    src={adminMenu.icon}
                    alt="관리자 메뉴 아이콘"
                    className="w-5 h-5"
                  />
                  <p>{adminMenu.title}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    // 메인페이지 사이드바
    <div
      className={twMerge(
        `w-[140px] flex-none bg-white ${
          sidebarToggle ? "w-[50px]" : ""
        } transition-all`
      )}
      style={{ height: "calc(100vh - 50px)" }}
    >
      <ul className="flex justify-center pt-5">
        <li
          className="font-bold cursor-pointer w-full flex justify-center items-center"
          onClick={() => setSidebarToggle((prev) => !prev)}
        >
          {sidebarToggle ? (
            <img src={sideRightArrow} />
          ) : (
            <img src={sideLeftArrow} />
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
