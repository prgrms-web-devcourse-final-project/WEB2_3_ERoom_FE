import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import alarmIcon from "../../assets/icons/alarm.svg";
import AlarmModal from "../modals/AlarmModal";
import headerIcon from "../../assets/icons/headerLogo.svg";

const Header = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  // 임시 로그인, 로그아웃 버튼
  const handleLogin = () => {
    setIsLogin((prev) => !prev);
  };

  const [isOn, setIsOn] = useState<"Project" | "Meeting" | "">("");

  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname === "/projectRoom") {
      setIsOn("Project");
    } else if (pathname === "/meetingRoom") {
      setIsOn("Meeting");
    } else {
      setIsOn("");
    }
  }, [pathname]);

  const [isAlarmOpen, setIsAlarmOpen] = useState(false);
  const handleAlarmModal = () => {
    setIsAlarmOpen((prev) => !prev);
  };

  return (
    <>
      <header className="h-[50px] bg-white flex items-center px-5 justify-between">
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

        <ul className="flex font-bold gap-3 text-[#657166]">
          {isLogin ? (
            <>
              <li
                className="cursor-pointer flex justify-center items-center"
                onClick={handleAlarmModal}
              >
                <img src={alarmIcon} alt="알람 아이콘" />
              </li>
              <li className="cursor-pointer">
                {/* 유저정보api 나온 후 url 수정 필요 */}
                <Link to={`/projectRoom`}>마이프로젝트</Link>
              </li>
              {isAlarmOpen && (
                <div className="absolute top-[50px] transform -translate-x-1/2">
                  <AlarmModal onClose={handleAlarmModal} />
                </div>
              )}
              <li>
                <Link to={"/myPage"}>마이페이지</Link>
              </li>
              <li
                onClick={handleLogin}
                className="cursor-pointer text-[#FF6854]"
              >
                로그아웃
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to={"/signIn"} onClick={handleLogin}>
                  로그인
                </Link>
              </li>
              <li>
                <Link to="/signUp">회원가입</Link>
              </li>
            </>
          )}
        </ul>
      </header>
    </>
  );
};

export default Header;
