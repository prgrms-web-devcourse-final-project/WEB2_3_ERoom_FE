const MeetingRoomProjectBox = () => {
  return (
    <div className="flex">
      {/* 프로젝트 넘버 */}
      <div
        className="bg-white border border-[#CAD2CB] w-full h-[70px] flex 
          gap-5 items-center font-bold "
      >
        <div className="flex items-center w-full">
          <div className="w-[80px] px-[11.5px]">
            <span className="text-[50px] text-main-green02 font-notoTC mt-0">
              10
            </span>
          </div>
          <div className="flex-grow flex justify-between px-[20px]">
            <div className="self-center">
              <span className="font-bold">프로젝트 명</span>
            </div>
            <div className="flex flex-col items-end text-header-red">
              <span className="font-bold text-[14px]">새로운 메시지</span>
              <span className="font-bold text-[14px]">+99</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingRoomProjectBox;
