import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-main-beige02 h-[calc(100vh-50px)] flex 
                      flex-col items-center justify-center"
    >
      <p className="text-[50px] font-bold text-main-green">404 ERROR</p>
      <p className="text-[20px] text-main-green01">
        페이지를 찾을 수 없습니다.
      </p>
      <button
        className="w-[200px] h-[35px] border border-main-green text-main-green mt-3 rounded-[5px]
                  cursor-pointer hover:opacity-70"
        onClick={() => navigate("/")}
      >
        홈으로 가기
      </button>
    </div>
  );
};

export default NotFound;
