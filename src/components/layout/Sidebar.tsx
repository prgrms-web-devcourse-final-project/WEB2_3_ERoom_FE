import { useEffect, useState } from "react";
import { useLocation } from "react-router";

const SideMenuList = [
  { title: "전체 업무", icon: "" },
  { title: "담당자", icon: "" },
  { title: "미팅룸", icon: "" },
];

const Sidebar = () => {
  const { pathname } = useLocation();

  const [path, setPath] = useState(pathname);

  useEffect(() => {
    setPath(pathname);
  }, [pathname]);

  return (
    <div
      className="w-[130px] bg-white"
      style={{ height: "calc(100vh - 50px)" }}
    >
      {path.startsWith("/projectRoom") ? (
        <ul className="flex flex-col items-center gap-6 pt-10">
          {SideMenuList.map((menu, idx) => {
            return (
              <li
                key={idx}
                className="font-bold w-full h-[30px] flex px-4 items-center cursor-pointer"
              >
                {menu.title}
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
