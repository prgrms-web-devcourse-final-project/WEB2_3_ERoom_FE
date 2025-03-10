import { useEffect } from "react";
import { useRedirectStore } from "../store/useRedirectStore";
import { useNavigate } from "react-router";

const useRedirect = () => {
  const navigate = useNavigate();
  const { shouldRedirect, setRedirect } = useRedirectStore();

  useEffect(() => {
    if (shouldRedirect) {
      navigate("/not-found", { replace: true });
      setRedirect(false); // ✅ 리다이렉트 후 상태 초기화
    }
  }, [shouldRedirect, navigate, setRedirect]);
};

export default useRedirect;
