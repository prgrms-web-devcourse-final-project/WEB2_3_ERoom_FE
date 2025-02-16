import OutProjectIcon from "../../assets/icons/outProjectDetail.svg";
import MeetingRoomProjectBox from "../../components/MeetingRoom/MeetingRoomProjectBox";

const MeetingRoom = () => {
  return (
    <div
      className="flex w-full p-[50px] gap-[20px] bg-white bg-gradient-to-t from-white/0 via-[#BFCDB7]/30 to-white/0"
      style={{ maxHeight: "calc(100vh - 50px)" }}
    >
      <div className="flex-[0.37] h-[682px] flex flex-col gap-[30px] px-[30px] bg-white/60">
        <div className="ml-[10px]">
          <div className="inline-flex flex-col items-center">
            <img
              src={OutProjectIcon}
              alt="프로젝트 나가기"
              className="w-[24px] h-[24px]"
            />
            <span className="text-main-green01 font-bold">My 프로젝트</span>
          </div>
        </div>
        <div className="w-full h-full flex flex-col">
          <MeetingRoomProjectBox />
        </div>
      </div>
      <div className="flex-[0.63] h-[682px] bg-white/60">미팅룸</div>
    </div>
  );
};

export default MeetingRoom;
