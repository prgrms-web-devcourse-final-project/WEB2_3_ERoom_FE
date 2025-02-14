import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import outProjectIcon from "../../assets/icons/outProjectDetail.svg";
import sidebarAllicon from "../../assets/icons/sidebarAllicon.svg";
import sidebarManagerIcon from "../../assets/icons/sidebarManagerIcon.svg";
import sidebarMeetIcon from "../../assets/icons/sidebarMeetIcon.svg";
import { twMerge } from "tailwind-merge";

const SideMenuList = [
  { title: "전체 업무", icon: sidebarAllicon, src: "all" },
  { title: "담당자", icon: sidebarManagerIcon, src: "manager" },
  { title: "미팅룸", icon: sidebarMeetIcon, src: "meeting" },
];

const Sidebar = () => {
  const { pathname } = useLocation();

  // const [path, setPath] = useState(pathname);

  // useEffect(() => {
  //   setPath(pathname);
  // }, [pathname]);
  useEffect(() => {
    console.log(pathname);
  });
  return (
    <div
      className="w-[130px] bg-white border"
      style={{ height: "calc(100vh - 50px)" }}
    >
      {pathname.startsWith("/projectRoom") ? (
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
      ) : (
        <ul className="flex justify-center pt-10">
          <li className="font-bold">펴기</li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
