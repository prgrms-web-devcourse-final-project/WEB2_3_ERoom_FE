import axios from "axios";

const getAccessToken = async (code: string) => {
  const CLIENT_ID = import.meta.env.VITE_GOOGLE_ID;
  const REDIRECT_URI = "http://localhost:5173/signin";
  const CLIENT_SECRET = import.meta.env.VITE_GOOGLE_SECRET;

  const response = await axios.post(
    "https://oauth2.googleapis.com/token",
    {
      code: code, // 인증 코드
      client_id: CLIENT_ID, // 구글 클라이언트 ID
      client_secret: CLIENT_SECRET, // 구글 클라이언트 시크릿
      redirect_uri: REDIRECT_URI, // 리디렉션 URI
      grant_type: "authorization_code", // 인증 코드로 토큰을 요청하는 방식
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return response.data; // 응답에서 액세스 토큰을 받아옴
};
export default getAccessToken;
