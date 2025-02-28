import { useEffect } from "react";

const MeetingRoomMessage = ({ messages }: { messages: MessageType[] }) => {
  //메시지 id 중복되는지 확인용
  useEffect(() => {
    const ids = messages.map((msg) => msg.messageId);
    console.log("메시지 ID 리스트:", ids);
  }, [messages]);

  return (
    <>
      {messages.map((message) =>
        message.senderName === "member3" ? (
          // 추후 senderId가 로그인한 사용자 id인지로 체크
          // 사용자가 보낸 채팅일 경우 채팅만 표시 bg-main-beige
          <div
            key={message.messageId}
            className="flex flex-col items-end mx-[10px] pl-[50px] my-[10px] gap-[5px]"
          >
            <div className="flex items-end gap-[3px]">
              <span className="text-[12px]">
                {message.sentAt === undefined
                  ? "필드 없음"
                  : message.sentAt === null
                  ? "null"
                  : message.sentAt}
              </span>
              <div className="w-fit h-auto min-h-[33px] bg-main-beige rounded-[5px] px-[10px] py-[8px] max-w-[60vw] ">
                <span className="text-[14px] whitespace-pre-wrap break-keep overflow-hidden ">
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
                className="w-[30px] h-[30px] rounded-full"
              />
              <span className="text-[14px]">
                {/* {message.senderName} */}
                {message.senderName}
              </span>
            </div>
            {/* 팀원이 보낸 채팅 내용 bg-main-green02 */}
            <div className="flex justify-start items-end gap-[5px]">
              <div className="w-auto h-auto min-h-[33px] bg-main-green02 rounded-[5px] px-[10px] py-[8px] max-w-[60vw] self-start">
                <span className="text-[14px] whitespace-pre-wrap">
                  {/* {message.message} */}
                  {message.message}
                </span>
              </div>
              <span className="text-[12px]">
                {message.sentAt === undefined
                  ? "필드 없음"
                  : message.sentAt === null
                  ? "null"
                  : message.sentAt}
              </span>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default MeetingRoomMessage;
