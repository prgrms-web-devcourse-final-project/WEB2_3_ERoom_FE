import axios from "axios";
import { useEffect } from "react";
import useKakaoLogin from "../hooks/useKakaoLogin";
import socials from "../constants/socialLogin";
import Loading from "../components/common/Loading";

export default function KakaoRedirect() {
  const { setUser } = useKakaoLogin(true);

  useEffect(() => {
    const getUser = async () => {
      const code = new URL(document.location.toString()).searchParams.get(
        "code"
      );
      console.log("카카오 인증 코드:", code);
      const res = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        {
          grant_type: "authorization_code",
          client_id: socials.KAKAO_REST_API_KEY,
          redirect_uri: socials.KAKAO_REDIRECT_URI,
          code,
        },
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      );

      console.log("토큰 응답:", res.data);
      console.log("REST API Key:", socials.KAKAO_REST_API_KEY);
      console.log("Redirect URI:", socials.KAKAO_REDIRECT_URI);
      const { data: user } = await axios.get(
        `https://kapi.kakao.com/v2/user/me`,
        {
          headers: {
            Authorization: `Bearer ${res.data.access_token}`,
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      );

      console.log("사용자 정보:", user);
      console.log("사용자 정보:", user.kakao_account);
      setUser({
        email: `${user.id}@k.kakao.net`,
        password: user.connected_at,
      });
    };
    getUser();
  }, []);

  return <Loading />;
}
