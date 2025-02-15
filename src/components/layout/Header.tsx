import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import alarmIcon from "../../assets/icons/alarm.svg";
import AlarmModal from "../modals/AlarmModal";

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
  const handleAlramModal = () => {
    setIsAlarmOpen((prev) => !prev);
  };

  return (
    <>
      <header className="h-[50px] bg-white flex items-center px-5 justify-between">
        <div>
          <h1 className="text-[25px] font-bold" onClick={() => navigate("/")}>
            E:room
          </h1>
        </div>

        <ul
          className="flex font-bold gap-5 bg-[#e8e8e8] h-[30px]
        text-[#6e8370] rounded-[30px] text-[14px] border border-[#afafaf]"
        >
          <li
            className={`w-[80px] flex justify-center items-center rounded-[30px] px-1
              ${
                isOn === "Project" &&
                "bg-[#6e8370] text-[#FFF6E9] inset-shadow-sm"
              }`}
          >
            <Link to={"/projectRoom"}>프로젝트룸</Link>
          </li>
          <li
            className={`w-[60px] flex justify-center items-center rounded-[30px] px-1
              ${
                isOn === "Meeting" &&
                "bg-[#6e8370] text-[#FFF6E9] inset-shadow-sm"
              }`}
          >
            <Link to={"/meetingRoom"}>미팅룸</Link>
          </li>
        </ul>

        <ul className="flex font-bold gap-3 text-[#657166]">
          <li className="cursor-pointer">다크모드</li>
          {isLogin ? (
            <>
              <li
                className="cursor-pointer flex justify-center items-center"
                onClick={handleAlramModal}
              >
                <img src={alarmIcon} alt="알람 아이콘" />
              </li>
              {isAlarmOpen && (
                <div className="absolute top-[50px] transform -translate-x-1/2">
                  <AlarmModal />
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
