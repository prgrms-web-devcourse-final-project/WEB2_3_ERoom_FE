import { useState } from "react";
import { Link } from "react-router";

const Header = () => {
  const [isLogin, setIsLogin] = useState(true);

  // 임시 로그인, 로그아웃 버튼
  const handleLogin = () => {
    setIsLogin((prev) => !prev);
  };
  return (
    <>
      <header className="h-[50px] bg-[#d6d6d6] flex items-center px-5 justify-between">
        <div>
          <h1 className="text-[25px] font-bold">로고</h1>
        </div>

        <ul className="flex font-bold gap-5">
          <li>
            <Link to={"/projectRoom"}>프로젝트룸</Link>
          </li>
          <li>
            <Link to={"/meetingRoom"}>미팅룸</Link>
          </li>
        </ul>

        <ul className="flex font-bold gap-3">
          <li className="cursor-pointer">다크모드</li>
          {isLogin ? (
            <>
              <li className="cursor-pointer">알람</li>
              <li>
                <Link to={"/"}>마이페이지</Link>
              </li>
              <li onClick={handleLogin} className="cursor-pointer">
                로그아웃
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to={"/"} onClick={handleLogin}>
                  로그인
                </Link>
              </li>
              <li>
                <Link to="/">회원가입</Link>
              </li>
            </>
          )}
        </ul>
      </header>
    </>
  );
};

export default Header;
