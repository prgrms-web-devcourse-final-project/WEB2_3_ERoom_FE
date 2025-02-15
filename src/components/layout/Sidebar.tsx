import { useState } from "react";
import { Link, useLocation } from "react-router";
import outProjectIcon from "../../assets/icons/outProjectDetail.svg";
import sidebarAllicon from "../../assets/icons/sidebarAllicon.svg";
import sidebarManagerIcon from "../../assets/icons/sidebarManagerIcon.svg";
import sidebarMeetIcon from "../../assets/icons/sidebarMeetIcon.svg";
import { twMerge } from "tailwind-merge";
import sideLeftArrow from "../../assets/icons/sideLeftArrow.svg";
import sideRightArrow from "../../assets/icons/sideRightArrow.svg";

const SideMenuList = [
  { title: "전체 업무", icon: sidebarAllicon, src: "all" },
  { title: "담당자", icon: sidebarManagerIcon, src: "manager" },
  { title: "미팅룸", icon: sidebarMeetIcon, src: "meeting" },
];

interface SidebarProps {
  sidebarToggle: boolean;
  setSidebarToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ sidebarToggle, setSidebarToggle }: SidebarProps) => {
  const { pathname } = useLocation();

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
