import axios from "axios";

const getUserInfo = async (accessToken: string) => {
  const userInfoResponse = await axios.get(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`, // 액세스 토큰을 Authorization 헤더로 전달
      },
    }
  );
  return userInfoResponse.data; // 사용자 정보 반환
};
export default getUserInfo;
