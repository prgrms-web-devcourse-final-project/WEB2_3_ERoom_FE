import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import alarmIcon from "../../assets/icons/alarm.svg";
import AlarmModal from "../modals/AlarmModal";
import headerIcon from "../../assets/icons/headerLogo.svg";
import { useAuthStore } from "../../store/authStore";
import useWebSocketStore from "../../store/useWebSocketStore";
import DefaultImg from "../../assets/defaultImg.svg";
import { api } from "../../api/api";
import { showToast } from "../../utils/toastConfig";

const Header = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  // console.log(isAuthenticated);

  // console.log(isLogin);
  const profile = useAuthStore((state) => state.member?.profile);
  const userName = useAuthStore((state) => state.member?.username);

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

  const accessToken = useAuthStore((state) => state.accessToken);
  const memberId = useAuthStore((state) => state.member?.id);
  const {
    visibleAlarms, // 현재 표시되는 알람 리스트 (웹소켓+API 통합)
    removeAlarm, // 특정 알람 읽음 처리 (웹소켓+API 통합)
    clearAlarms, // 전체 알람 읽음 처리 (웹소켓+API 통합)
    connectWebSocket,
    syncAlarmsWithAPI, // API에서 최신 알람 불러오기
  } = useWebSocketStore();
  const [isAlarmOpen, setIsAlarmOpen] = useState(false);

  //웹소켓 연결
  useEffect(() => {
    if (accessToken && memberId) {
      connectWebSocket(accessToken, memberId);
      syncAlarmsWithAPI(memberId);
    }
  }, [accessToken, memberId, connectWebSocket, syncAlarmsWithAPI]);

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

  //알람 핑 표시
  const hasUnreadAlarms = visibleAlarms.length > 0;

  // 로그아웃
  const handleLogOut = async () => {
    try {
      const response = await api.post("/api/auth/logout");
      console.log(response);

      if (response.status === 200) {
        logout();
        useAuthStore.persist.clearStorage();
        navigate("/signin");
      } else {
        showToast("error", "로그아웃에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 모바일 햄버거 버튼 클릭
  const [mobileMoreBtnClick, setMobileMoreBtnClick] = useState(false);

  const handleMobileMoreBtnClick = () => {
    setMobileMoreBtnClick((prev) => !prev);
  };

  return (
    <header className="h-[50px] bg-white flex items-center px-5 justify-between">
      {/* 로고 */}
      <div>
        <img
          src={headerIcon}
          alt="헤더 아이콘"
          className="cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>

      {/* 버튼모음 */}
      <div className="max-sm:hidden">
        <ul className="flex items-center font-bold gap-5 text-[#657166] ">
          {isAuthenticated ? (
            /* 로그인 상태 */
            <>
              {/* 알람버튼 */}
              <li
                ref={alarmRef}
                className=" cursor-pointer flex justify-center items-center "
                onClick={handleAlarmModal}
              >
                <div className="relative">
                  <img src={alarmIcon} alt="알람 아이콘" />
                  {hasUnreadAlarms && (
                    <span className="absolute top-[-1.3px] right-[-1.5px] flex size-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-header-red opacity-75"></span>
                      <span className="relative inline-flex size-2 rounded-full bg-header-red"></span>
                    </span>
                  )}
                </div>
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
                  <AlarmModal
                    onClose={handleAlarmModal}
                    allAlarms={visibleAlarms}
                    readAllAlarms={() => clearAlarms(memberId!)}
                    onRemove={removeAlarm}
                  />
                </div>
              )}

              {/* 마이페이지 버튼 */}
              <li>
                <Link to={"/mypage"}>
                  <div className="flex items-center gap-[5px]">
                    <img
                      src={profile || DefaultImg}
                      alt="프로필이미지"
                      className="w-[32px] h-[32px] rounded-[5px] border border-[#1F281E] "
                    />
                    <span>{userName}</span>
                  </div>
                </Link>
              </li>

              {/* 로그아웃 버튼 */}
              <li
                className="cursor-pointer text-[#FF6854]"
                onClick={handleLogOut}
              >
                로그아웃
              </li>
            </>
          ) : (
            /* 로그아웃 상태 */
            <li>
              <Link to="/signin">로그인</Link>
            </li>
          )}
        </ul>
      </div>

      {/* 모바일 */}
      <div className="sm:hidden ">
        <div className="cursor-pointer" onClick={handleMobileMoreBtnClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>

        <div
          className={`fixed inset-0 bg-white/95 h-dvh w-dvw z-50 p-5 flex items-center transition-all ${
            mobileMoreBtnClick
              ? "opacity-100 scale-100 visible"
              : "opacity-0 scale-90 invisible"
          } `}
        >
          {/* 닫기 버튼 */}
          <div
            className="absolute top-3 right-3 cursor-pointer"
            onClick={handleMobileMoreBtnClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-9"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* 메뉴 */}
          <ul className="flex flex-col w-full font-bold gap-20 text-[#657166] ">
            {isAuthenticated ? (
              /* 로그인 상태 */
              <>
                {/* 마이페이지 버튼 */}
                <li className="text-[35px]">
                  <Link to={"/mypage"}>
                    <div className="flex items-center gap-[5px]">
                      <img
                        src={profile || DefaultImg}
                        alt="프로필이미지"
                        className="w-[50px] h-[50px] rounded-[5px] border border-[#1F281E] "
                      />
                      <span>{userName}</span>
                    </div>
                  </Link>
                </li>

                {/* 마이프로젝트 버튼 */}
                <li className="cursor-pointer text-[35px]">
                  {/* 유저정보api 나온 후 url 수정 필요 */}
                  <Link to={`/project-room`}>마이프로젝트</Link>
                </li>

                {/* 알람 모달 */}
                {/* {isAlarmOpen && (
                    <div
                      ref={modalRef}
                      className="absolute top-[50px] transform -translate-x-1/2 z-50"
                    >
                      <AlarmModal
                        onClose={handleAlarmModal}
                        allAlarms={visibleAlarms}
                        readAllAlarms={() => clearAlarms(memberId!)}
                        onRemove={removeAlarm}
                      />
                    </div>
                  )} */}

                {/* 로그아웃 버튼 */}
                <li
                  className="cursor-pointer text-[#FF6854] text-[30px]"
                  onClick={handleLogOut}
                >
                  로그아웃
                </li>
              </>
            ) : (
              /* 로그아웃 상태 */
              <li>
                <Link to="/signin">로그인</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
