import { useState } from "react";
import { Link, useLocation } from "react-router";
import outProjectIcon from "../../assets/icons/outProjectDetail.svg";
import sidebarAllicon from "../../assets/icons/sidebarAllicon.svg";
import sidebarManagerIcon from "../../assets/icons/sidebarManagerIcon.svg";
import sidebarMeetIcon from "../../assets/icons/sidebarMeetIcon.svg";
import { twMerge } from "tailwind-merge";
import sideLeftArrow from "../../assets/icons/sideLeftArrow.svg";
import sideRightArrow from "../../assets/icons/sideRightArrow.svg";
import accountIcon from "../../assets/icons/dashboard/accountIcon.svg";
import dashboardIcon from "../../assets/icons/dashboard/dashboardIcon.svg";
import payIcon from "../../assets/icons/dashboard/payIcon.svg";
import projectIcon from "../../assets/icons/dashboard/projectIcon.svg";
import tagIcon from "../../assets/icons/dashboard/tagIcon.svg";
import taskIcon from "../../assets/icons/dashboard/taskIcon.svg";

const SideMenuList = [
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
  { title: "결제 내역 관리", icon: payIcon, src: "pay" },
  { title: "태그 관리", icon: tagIcon, src: "tag" },
];

interface SidebarProps {
  sidebarToggle: boolean;
  setSidebarToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ sidebarToggle, setSidebarToggle }: SidebarProps) => {
  const { pathname } = useLocation();

  const [adminSideMenu, setAdminSideMenu] = useState("대시보드");

  if (pathname.startsWith("/projectRoom")) {
    return (
      <div
        className="w-[130px] bg-white"
        style={{ height: "calc(100vh - 50px)" }}
      >
        <ul className="flex flex-col items-center gap-6 pt-10">
          <li>
            <Link to="/projectRoom" className="flex flex-col items-center">
              <img src={outProjectIcon} alt="프로젝트 나가기 버튼" />
              <p className="font-bold text-main-green01">My프로젝트</p>
            </Link>
          </li>
          {SideMenuList.map((menu, idx) => {
            return (
              <li
                key={idx}
                className="font-bold w-full h-[30px] flex px-4 items-center cursor-pointer"
              >
                <Link
                  to={`${pathname}?category=${menu.src}`}
                  className={twMerge(`flex items-center gap-2`)}
                >
                  <img src={menu.icon} alt="사이드바 메뉴 아이콘" />
                  <p className="text-header-green">{menu.title}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  } else if (pathname.startsWith("/admin")) {
    return (
      <div className="w-[130px] bg-white min-h-[calc(100vh-50px)] font-bold flex flex-col items-center pt-5 text-main-green01">
        <p className="pb-7 border-b border-header-green w-[110px] text-center ">
          관리자 메뉴
        </p>

        <ul className="flex flex-col gap-5 mt-7 text-[15px]">
          {ADMIN_SIDE_MENU_LIST.map((adminMenu, idx) => {
            return (
              <li
                key={idx}
                className={twMerge(
                  `bg-white w-full h-[35px] ${
                    adminSideMenu === adminMenu.title && "bg-main-green03"
                  }`
                )}
                onClick={() => setAdminSideMenu(adminMenu.title)}
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
    <div
      className={twMerge(
        `w-[130px] bg-white ${sidebarToggle ? "w-[50px]" : ""} transition-all`
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
