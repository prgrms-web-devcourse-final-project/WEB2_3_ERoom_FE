const MeetingRoomProjectBox = () => {
  return (
    <div className="flex">
      {/* 프로젝트 넘버 */}
      <div className="w-[80px] flex ">
        <span className="text-[50px] text-main-green02 font-notoTC mt-0">
          10
        </span>
      </div>
      <div
        className="bg-white border border-[#CAD2CB] w-full h-[70px] flex 
          gap-5 items-center px-5 font-bold "
      >
        <div className="flex justify-between items-center w-full px-5">
          {/* 프로젝트 명, 미팅룸 명 */}
          <div className="flex flex-col gap-[10px]">
            <span className="font-bold">프로젝트 명</span>
            <span className="font-bold text-[18px]">미팅룸 명</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-bold text-[14px]">새로운 메시지</span>
            <span className="font-bold text-[14px]">+99</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingRoomProjectBox;
