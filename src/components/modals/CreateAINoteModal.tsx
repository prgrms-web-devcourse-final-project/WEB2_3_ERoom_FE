import { useEffect, useRef, useState } from "react";
import Button from "../common/Button";
import Lottie from "lottie-react";
import LoadingAnimation from "../../assets/animations/AINote_loading.json";
import { useMutation } from "@tanstack/react-query";
import { deleteAINote, editAINote } from "../../api/meetingroom";
import { formatSelectedDate } from "../../utils/aiNote/dateUtils";

const CreateAINoteModal = ({
  onClose,
  AINote,
  title,
  isPending,
  selectedStartDate,
  selectedEndDate,
  refetchAINoteList,
  AINoteList,
}: {
  onClose: () => void;
  AINote: CreateAIMessage | undefined;
  title: string;
  isPending: boolean;
  selectedStartDate: selectedDateType;
  selectedEndDate: selectedDateType;
  refetchAINoteList: () => void;
  AINoteList: AINoteListType[] | null;
}) => {
  //회의 내용
  const chatContent = AINote?.content;

  // 참석 멤버
  const chatMember = AINote?.members;

  const chatStartTime = formatSelectedDate(selectedStartDate);
  const chatEndTime = formatSelectedDate(selectedEndDate);

  //AI가 생성한 회의록 내용을 초기값으로 지정
  const [confirmAINote, setconfirmAINote] = useState<string | undefined>("");

  useEffect(() => {
    if (AINote) {
      setconfirmAINote(chatContent);
    }
  }, [AINote]);

  const handleAINote = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setconfirmAINote(e.target.value);
  };

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus(); // textarea에 포커스 설정
      const length = textAreaRef.current.value.length; // 텍스트 길이
      textAreaRef.current.setSelectionRange(length, length); // 커서를 끝으로 이동
    }
  }, [AINote]);

  // AI 회의록 생성 후 최신 reportId를 가져오기 위해 refetch 실행
  useEffect(() => {
    if (AINote) {
      refetchAINoteList();
    }
  }, [AINote]);

  // AI회의록 리스트의 가장 마지막 요소 id를 현재 생성된 AINote의 reportId로 추출
  const reportId =
    AINoteList && AINoteList.length > 0
      ? AINoteList[AINoteList.length - 1].id
      : null;

  //AI 회의록 등록(수정 반영해)
  const { mutateAsync: fetchEditAINote } = useMutation<
    void,
    Error,
    { reportId: number; content: string | undefined }
  >({
    mutationFn: async ({ reportId, content }) =>
      await editAINote(reportId, content),
    onSuccess: () => {
      // console.log("회의록이 수정되었습니다.");
    },
    onError: (error) => {
      console.error("회의록 수정 실패:", error);
    },
  });

  //회의록 초기값 저장(AI회의록에서 추가 수정 없으면 수정 API 호출 막음)
  const [initialAINote, setInitialAINote] = useState<string | undefined>("");

  useEffect(() => {
    if (AINote) {
      setInitialAINote(chatContent);
    }
  }, [AINote]);

  const handleRegisterAINote = async () => {
    if (reportId === null || confirmAINote === "") {
      console.error("유효한 reportId가 없거나 회의록 내용이 비어 있습니다.");
      return;
    }

    // 값이 변경되지 않았다면 API 요청을 하지 않음
    if (confirmAINote === initialAINote) {
      // console.log("변경된 내용이 없어 수정 요청을 보내지 않습니다.");
      onClose();
      return;
    }
    // console.log("등록 요청 reportId:", reportId);
    // console.log("등록 요청 content:", confirmAINote);

    try {
      await fetchEditAINote({ reportId, content: confirmAINote });
      onClose();
    } catch (error) {
      console.error("회의록 등록 실패:", error);
    }
  };

  //AI 회의록 등록 취소(삭제)
  const { mutateAsync: fetchDeleteAINote } = useMutation<void, Error, number>({
    mutationFn: async (reportId: number) => deleteAINote(reportId),
    onSuccess: () => {
      // console.log("회의록이 삭제되었습니다.");
    },
    onError: (error) => {
      console.error("회의록 삭제 실패:", error);
    },
  });

  // 삭제 상태 관리 (무한루프 보완)
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAINote = async () => {
    if (isDeleting) return; // 중복 실행 방지
    if (reportId === null) {
      console.error("유효한 reportId가 없습니다.");
      return;
    }

    setIsDeleting(true); //  삭제 중 상태 업데이트

    try {
      await fetchDeleteAINote(reportId);
    } catch (error) {
      console.error("회의록 삭제 실패:", error);
    } finally {
      setIsDeleting(false); //  삭제 완료 후 상태 초기화
      onClose(); // 삭제 완료 후 모달 닫기 실행
    }
  };

  return (
    <>
      {isPending ? (
        <div>
          <Lottie
            animationData={LoadingAnimation}
            loop={true}
            className="w-80 h-80"
          />
        </div>
      ) : (
        <div className="w-[1000px] h-[613px] bg-white flex flex-col py-[30px] px-[50px]">
          <div className="flex flex-col gap-[20px]">
            <div className="flex justify-center">
              <span className="font-bold text-[16px] text-black">{title}</span>
            </div>
            <div className="flex items-center gap-[20px]">
              <span className="font-bold text-[16px] text-black">회의기간</span>
              <span className="text-[14px] text-black">
                {chatStartTime} ~ {chatEndTime}
              </span>
            </div>
            <div className="flex items-center gap-[20px]">
              <span className="font-bold text-[16px] text-black">참여인원</span>
              <div className="flex items-center gap-[10px]">
                {Array.isArray(chatMember) &&
                  chatMember.length > 0 &&
                  chatMember?.map((member, index) => (
                    <span key={index} className="text-[14px] text-black">
                      {member}
                    </span>
                  ))}
              </div>
            </div>
            <div className="flex flex-col gap-[10px]">
              <span className="font-bold text-[16px] text-black">회의내용</span>
              <div className="w-[900px] h-[300px] pt-[10px] px-[10px] border overflow-y-auto">
                <textarea
                  ref={textAreaRef}
                  value={confirmAINote}
                  onChange={handleAINote}
                  className="w-full h-full resize-none focus:outline-none"
                ></textarea>
              </div>
              <div className=" h-auto flex flex-col justify-center">
                <span className="text-center font-bold text-[16px] text-black">
                  AI가 작성한 희의록입니다.
                  <br /> 등록하시겠습니까?
                </span>
                <div className="flex justify-center gap-[20px] mt-[15px]">
                  <Button
                    text="등록"
                    size="md"
                    onClick={() => handleRegisterAINote()}
                    css="w-[128px] h-[29px] border border-main-green01 bg-white text-main-green01 font-bold"
                  />
                  <Button
                    text="취소"
                    size="md"
                    onClick={() => handleDeleteAINote()}
                    css="w-[128px] h-[29px] border border-logo-gree1 bg-logo-green text-main-beige01 font-bold"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateAINoteModal;
