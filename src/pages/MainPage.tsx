import TodaySchedule from "../components/MainPage/TodaySchedule";
import { twMerge } from "tailwind-merge";
import Calendar from "../components/MainPage/Calendar";
import { useAuthStore } from "../store/authStore";
import { useEffect, useState } from "react";
import getAccessToken from "../utils/signInGoogle/getAccessToken";
import getUserInfo from "../utils/signInGoogle/getUserInfo";

const MainPage = () => {
  const login = useAuthStore((state) => state.login);
  const user = useAuthStore((state) => state.user);

  /* 구글 로그인(미완성) */
  // const [searchParams, setSearchParams] = useState(window.location.search);

  // // URL이 변경되었을 때 searchParams 업데이트
  // useEffect(() => {
  //   setSearchParams(window.location.search); // 페이지가 리디렉션되면서 쿼리 파라미터가 변경되므로 이를 감지하여 업데이트
  // }, [window.location.search]); // URL 변경 시마다 실행

  // // 쿼리 파라미터에서 "code"가 있는지 확인하고, 있으면 처리
  // useEffect(() => {
  //   const queryParams = new URLSearchParams(searchParams);
  //   console.log("queryParams:", queryParams.toString());
  //   if (queryParams.has("code")) {
  //     handleGoogleCallback(queryParams); // "code"가 있다면 구글 로그인 처리
  //   }
  // }, [searchParams]); // searchParams가 변경될 때마다 실행

  // // 구글 로그인 후 액세스 토큰을 사용하여 사용자 정보 가져오기
  // const handleGoogleCallback = async (queryParams: URLSearchParams) => {
  //   const code = queryParams.get("code");
  //   console.log("인증 코드:", code);

  //   if (code) {
  //     try {
  //       // 인증 코드로 액세스 토큰 받기
  //       const tokenResponse = await getAccessToken(code);
  //       console.log("액세스 토큰:", tokenResponse.access_token);

  //       // 액세스 토큰으로 사용자 정보 가져오기
  //       const userInfo = await getUserInfo(tokenResponse.access_token);
  //       console.log("구글 사용자 정보:", userInfo);

  //       // 사용자 정보를 상태에 저장하거나 로그인 처리
  //       login({ username: userInfo.name });
  //     } catch (error: any) {
  //       console.error("구글 로그인 실패:", error);
  //       if (error.response) {
  //         console.error("Error Response:", error.response);
  //       } else {
  //         console.error("Error Message:", error.message);
  //       }
  //     }
  //   }
  // };

  return (
    <div
      className={twMerge(
        `bg-gradient-to-t from-white/0 via-[#BFCDB7]/30 to-white/0
        px-5 py-5 flex gap-2 h-[calc(100vh-50px)]`
      )}
    >
      {user ? (
        <>
          {/* 캘린더 */}
          <div className="flex-1 pl-[50px] pr-[40px]">
            <div className="h-[calc(100vh-90px)] border rounded-[10px] border-main-green02 px-5 py-5 bg-white">
              <Calendar />
            </div>
          </div>

          {/* 오늘의 일정 */}
          <TodaySchedule />
        </>
      ) : (
        <>
          <div>로그인 되지 않은 상태의 메인 페이지</div>
        </>
      )}
    </div>
  );
};

export default MainPage;
