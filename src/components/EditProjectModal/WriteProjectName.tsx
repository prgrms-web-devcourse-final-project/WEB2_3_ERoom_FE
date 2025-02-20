import { useState } from "react";
import cancelButton from "../../assets/button/cancelButton.svg";

const WriteProjectName = () => {
  // 인풋값 상태 관리
  const [inputValue, setInputValue] = useState("");
  // 엔터 후 값 저장
  const [submittedValue, setSubmittedValue] = useState<string | null>(null);

  // 인풋 값 상태 업데이트
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // 엔터 키 입력 시 값 저장
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // 엔터 키가 눌리면 제출된 값으로 저장
      setSubmittedValue(inputValue);
      // 인풋창 초기화
      setInputValue("");
    }
  };

  return (
    <div className="w-full">
      {/* 프로젝트명 */}
      <p className="w-full font-bold">프로젝트명</p>

      {/* input창 */}
      <input
        className="w-full py-[5px]
        border-[1px] border-gray01 rounded-[5px] text-center
        font-bold text-[14px]"
        placeholder="프로젝트명을 작성해주세요."
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      ></input>

      {/* 작성내용 */}
      {submittedValue && (
        <div
          className="flex justify-between text-logo-green text-[14px]
          p-[5px] font-bold"
        >
          <p>{submittedValue}</p>
          <img
            src={cancelButton}
            onClick={() => setSubmittedValue(null)}
            className="cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};

export default WriteProjectName;
