import guestMainBg from "../../assets/guestMainBg.webp";

const GuestMain = () => {
  return (
    <div className="">
      <div
        className="w-screen h-[calc(100vh-50px)] bg-no-repeat bg-center bg-cover relative
        flex items-center"
        style={{ backgroundImage: `url(${guestMainBg})` }}
      >
        <div
          className="h-full w-full bg-gradient-to-t from-white/100 to-white/0
        absolute bottom-0"
        ></div>

        {/* 메인 멘트 */}
        <div className="w-[600px] ml-[110px] z-10 animate-fadeUp">
          <p className="2c2c2c font-semibold text-[20px]">
            스마트 워크 스페이스
          </p>
          <h1 className="font-bold text-[47px] text-[#3C534E]">
            일정 관리부터 미팅까지
            <br /> 효율적인 팀워크를 경험해보세요
          </h1>
        </div>
      </div>
    </div>
  );
};

export default GuestMain;
