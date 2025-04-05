import { useAuthStore } from "../../store/authStore";

const MeetingRoomMessage = ({ messages }: { messages: MessageType[] }) => {
  //메시지 id 중복되는지 확인용
  // useEffect(() => {
  //   const ids = messages.map((msg) => msg.messageId);
  //   // console.log("메시지 ID 리스트:", ids);
  // }, [messages]);

  //메시지 sentAt에서 시간만 추출
  const formatTime = (sentAt: string) => {
    return sentAt.split("T")[1].split(":").slice(0, 2).join(":");
  };

  //메시지 sentAt에서 날짜만 추출
  const formatDate = (sentAt: string) => {
    const dateArr = sentAt.split("T")[0].split("-");
    const year = dateArr[0];
    const month = String(Number(dateArr[1]));
    const day = String(Number(dateArr[2]));
    return `${year}년 ${month}월 ${day}일`;
  };

  const userName = useAuthStore((state) => state.member?.username);

  return (
    <div>
      {messages.map((message, index) => {
        // 현재 메시지의 날짜 가져오기
        const currentDate = formatDate(message.sentAt);
        // 이전 메시지의 날짜 (첫 번째 메시지인 경우 null)
        const previousDate =
          index > 0 ? formatDate(messages[index - 1].sentAt) : null;
        // 날짜가 변경되었는지 확인
        const isNewDate = currentDate !== previousDate;

        return (
          <div key={message.messageId}>
            {isNewDate && (
              <div className="flex justify-center my-[10px]">
                <span className="text-[12px] bg-gray02 px-[10px] py-[5px] rounded-md">
                  {currentDate}
                </span>
              </div>
            )}
            {message.senderName === userName ? (
              // 추후 senderId가 로그인한 사용자 id인지로 체크
              // 사용자가 보낸 채팅일 경우 채팅만 표시 bg-main-beige
              <div
                key={message.messageId}
                className="flex flex-col items-end mx-[10px] pl-[50px] my-[10px] gap-[5px]"
              >
                <div className="flex items-end gap-[3px]">
                  <span className="text-[12px]">
                    {formatTime(message.sentAt) === undefined
                      ? "필드 없음"
                      : formatTime(message.sentAt) === null
                      ? "null"
                      : formatTime(message.sentAt)}
                  </span>
                  <div className="w-fit h-auto min-h-[33px] bg-main-beige rounded-[5px] px-[10px] py-[8px] max-w-[60vw] ">
                    <span className="text-[14px] whitespace-pre-wrap break-words overflow-hidden ">
                      {message.message}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              //  사용자가 아닐 경우 프로필 사진과 이름 표시
              <div
                key={message.messageId}
                className="flex flex-col mx-[10px] pr-[50px] my-[10px] gap-[5px]"
              >
                <div className="flex items-center gap-[10px]">
                  <img
                    src={
                      message.senderProfile ??
                      "https://cdn.pixabay.com/photo/2024/08/26/23/38/maranhao-sheets-9000410_1280.jpg"
                    }
                    alt="샘플프로필이미지"
                    className="w-[30px] h-[30px] rounded-full border border-main-green"
                  />
                  <span className="text-[14px]">
                    {/* {message.senderName} */}
                    {message.senderName}
                  </span>
                </div>
                {/* 팀원이 보낸 채팅 내용 bg-main-green02 */}
                <div className="flex justify-start items-end gap-[5px]">
                  <div className="w-auto h-auto min-h-[33px] bg-main-green02 rounded-[5px] px-[10px] py-[8px] max-w-[60vw] self-start">
                    <span className="text-[14px] whitespace-pre-wrap break-words">
                      {/* {message.message} */}
                      {message.message}
                    </span>
                  </div>
                  <span className="text-[12px]">
                    {formatTime(message.sentAt) === undefined
                      ? "필드 없음"
                      : formatTime(message.sentAt) === null
                      ? "null"
                      : formatTime(message.sentAt)}
                  </span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MeetingRoomMessage;
