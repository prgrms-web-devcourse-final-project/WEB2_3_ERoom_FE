import { useEffect, useState } from "react";
import Button from "../common/Button";
import Lottie from "lottie-react";
import LoadingAnimation from "../../assets/animations/loading_note.json";

const CreateAINoteModal = ({ onClose }: { onClose: () => void }) => {
  //추후 AI가 생성한 회의록 내용을 초기값으로 지정
  const [isAINote, setIsAINote] = useState("AI회의록 내용");

  const [isLoading, setIsLoading] = useState(false);

  const handleAINote = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsAINote(e.target.value);
  };

  // 임시 로딩 효과
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }, []);

  return (
    <>
      {isLoading ? (
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
              <span className="font-bold text-[16px] text-black">
                회의록 제목
              </span>
            </div>
            <div className="flex items-center gap-[20px]">
              <span className="font-bold text-[16px] text-black">회의기간</span>
              <span className="text-[14px] text-black">
                2025.02.13. AM 09:00 ~ 2025.02.13. AM 11:15
              </span>
            </div>
            <div className="flex items-center gap-[20px]">
              <span className="font-bold text-[16px] text-black">참여인원</span>
              <div className="flex items-center gap-[10px]">
                <span className="text-[14px] text-black">박선형</span>
                <span className="text-[14px] text-black">한규혁</span>
                <span className="text-[14px] text-black">성송원</span>
              </div>
            </div>
            <div className="flex flex-col gap-[10px]">
              <span className="font-bold text-[16px] text-black">회의내용</span>
              <div className="w-[900px] h-[300px] pt-[10px] px-[10px] border overflow-y-auto">
                <textarea
                  value={isAINote}
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
                    css="w-[128px] h-[29px] border border-main-green01 bg-white text-main-green01 font-bold"
                  />
                  <Button
                    text="취소"
                    size="md"
                    css="w-[128px] h-[29px] border border-logo-gree1 bg-logo-green text-main-beige01 font-bold"
                    onClick={onClose}
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
