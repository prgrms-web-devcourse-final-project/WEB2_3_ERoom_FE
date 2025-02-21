import { useNavigate } from "react-router";
import exitMeetingRoom from "../../assets/icons/exitMeetingRoom.svg";
import MeetingRoomChatBox from "../../components/MeetingRoom/MeetingRoomChatBox";
import MeetingRoomProjectBox from "../../components/MeetingRoom/MeetingRoomProjectBox";

const MeetingRoom = () => {
  const navigate = useNavigate(); // 네비게이션 함수 생성

  // 미팅룸 나가기 버튼 클릭 시 실행될 함수
  const handleExitMeetingRoom = () => {
    navigate("/project-room"); // 홈 페이지 또는 원하는 경로로 이동
  };

  return (
    <div className="flex w-full h-[calc(100vh-50px)] p-[50px] gap-[20px] bg-white bg-gradient-to-t from-white/0 via-[#BFCDB7]/30 to-white/0">
      <div className="flex-[0.37] mb-[30px] flex flex-col gap-[30px] px-[30px] bg-white/60">
        {/* 미팅룸 나가기 버튼 */}
        <div className="ml-[10px]">
          <div
            className="inline-flex flex-col items-center cursor-pointer"
            onClick={handleExitMeetingRoom}
          >
            {/* 나가기 이미지 */}
            <img
              src={exitMeetingRoom}
              alt="미팅룸 나가기"
              className="w-[24px] h-[24px]"
            />

            {/* 나가기 문구 */}
            <p className="text-header-red font-bold">미팅룸 나가기</p>
          </div>
        </div>

        {/* 미팅룸 배열 */}
        <div className="w-full h-full flex flex-col gap-[20px] overflow-y-auto scrollbar-none">
          <MeetingRoomProjectBox />
          <MeetingRoomProjectBox />
          <MeetingRoomProjectBox />
          <MeetingRoomProjectBox />
          <MeetingRoomProjectBox />
          <MeetingRoomProjectBox />
          <MeetingRoomProjectBox />
          <MeetingRoomProjectBox />
          <MeetingRoomProjectBox />
          <MeetingRoomProjectBox />
        </div>
      </div>
      <div className="flex-[0.63] mb-[30px] bg-white/60">
        <MeetingRoomChatBox />
      </div>
    </div>
  );
};

export default MeetingRoom;
