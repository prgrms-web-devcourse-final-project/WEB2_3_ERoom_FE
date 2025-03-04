import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import alarmIcon from "../../assets/icons/alarm.svg";
import AlarmModal from "../modals/AlarmModal";
import headerIcon from "../../assets/icons/headerLogo.svg";
import { useAuthStore } from "../../store/authStore";

const Header = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const isAuthenticated = useAuthStore((state) => state.accessToken);
  // console.log(isAuthenticated);

  // console.log(isLogin);

  const [_, setIsOn] = useState<"Project" | "Meeting" | "">("");

  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname === "/project-room") {
      setIsOn("Project");
    } else if (pathname === "/meeting-room") {
      setIsOn("Meeting");
    } else {
      setIsOn("");
    }
  }, [pathname]);

  const [isAlarmOpen, setIsAlarmOpen] = useState(false);
  //알람 모달 열기, 닫기
  const handleAlarmModal = () => {
    setIsAlarmOpen((prev) => !prev);
  };

  const modalRef = useRef<HTMLDivElement>(null);
  const alarmRef = useRef<HTMLLIElement>(null);
  // 모달 외부 클릭 시 알람모달 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        alarmRef.current &&
        !alarmRef.current.contains(event.target as Node)
      ) {
        setIsAlarmOpen(false);
      }
    };
    if (isAlarmOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAlarmOpen]);

  return (
    <>
      <header className="h-[50px] bg-white flex items-center px-5 justify-between">
        {/* 로고 */}
        <div>
          {/* <h1 className="text-[25px] font-bold" onClick={() => navigate("/")}>
            E:room
          </h1> */}
          <img
            src={headerIcon}
            alt="헤더 아이콘"
            className="cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        {/* 버튼모음 */}
        <ul className="flex font-bold gap-3 text-[#657166]">
          {isAuthenticated ? (
            /* 로그인 상태 */
            <>
              {/* 알람버튼 */}
              <li
                ref={alarmRef}
                className="cursor-pointer flex justify-center items-center"
                onClick={handleAlarmModal}
              >
                <img src={alarmIcon} alt="알람 아이콘" />
              </li>

              {/* 마이프로젝트 버튼 */}
              <li className="cursor-pointer">
                {/* 유저정보api 나온 후 url 수정 필요 */}
                <Link to={`/project-room`}>마이프로젝트</Link>
              </li>

              {/* 알람 모달 */}
              {isAlarmOpen && (
                <div
                  ref={modalRef}
                  className="absolute top-[50px] transform -translate-x-1/2 z-50"
                >
                  <AlarmModal onClose={handleAlarmModal} />
                </div>
              )}

              {/* 마이페이지 버튼 */}
              <li>
                <Link to={"/mypage"}>마이페이지</Link>
              </li>

              {/* 로그아웃 버튼 */}
              <li
                className="cursor-pointer text-[#FF6854]"
                onClick={() => {
                  logout();
                  useAuthStore.persist.clearStorage();
                  navigate("/");
                }}
              >
                로그아웃
              </li>
            </>
          ) : (
            /* 로그아웃 상태 */
            <>
              {/* 로그인 버튼 */}
              <li>
                <Link to="/signin">로그인</Link>
              </li>
            </>
          )}
        </ul>
      </header>
    </>
  );
};

export default Header;
