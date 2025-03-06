import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import alarmIcon from "../../assets/icons/alarm.svg";
import AlarmModal from "../modals/AlarmModal";
import headerIcon from "../../assets/icons/headerLogo.svg";
import { useAuthStore } from "../../store/authStore";
import useWebSocketStore from "../../store/useWebSocketStore";

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

  // // 미팅룸에 있을 땐 해당 미팅룸 알람은 읽음처리
  // const { search } = useLocation();
  // const { id } = useParams();
  // const queryParams = new URLSearchParams(search);
  // const category = queryParams.get("category");
  // const { mutate: readAlarm } = useReadAlarm();

  // useEffect(() => {
  //   if (category === "meeting" && id) {
  //     console.log(`현재 프로젝트 ID: ${id}, 카테고리: ${category}`);

  //     const matchingAlarms = allAlarms.filter((alarm) => {
  //       const referenceIdParts = alarm.referenceId
  //         .split(",")
  //         .map((part: string) => part.trim());
  //       const extractedReferenceId = referenceIdParts[1] || "";
  //       return extractedReferenceId === id && !alarm.read;
  //     });

  //     console.log("읽음 처리할 알람", matchingAlarms);

  //     //해당 알람들 읽음 처리
  //     matchingAlarms.forEach((alarm) => {
  //       readAlarm(alarm.id, {
  //         onSuccess: () => {
  //           refetch();
  //         },
  //       });
  //     });
  //   }
  // }, [category, id, unreadAlarms, notifications, readAlarm]);

  //알람 핑 표시
  const hasUnreadAlarms = visibleAlarms.length > 0;

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
                className=" cursor-pointer flex justify-center items-center "
                onClick={handleAlarmModal}
              >
                <div className="relative">
                  <img src={alarmIcon} alt="알람 아이콘" />
                  {hasUnreadAlarms && (
                    <span className="absolute top-[-1.3px] right-[-1.5px] flex size-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-main-green02 opacity-75"></span>
                      <span className="relative inline-flex size-2 rounded-full bg-main-green02"></span>
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
