import { twMerge } from "tailwind-merge";

const WriteProjectName = ({
  value,
  // name,
  newProjectNameValue,
  setNewProjectNameValue,
  pageError,
  setPageError,
}: WriteProjectNameType) => {
  // 엔터 후 값 저장
  // const [submittedValue, setSubmittedValue] = useState<string | null>(
  //   name || null
  // );

  // 인풋 값 상태 업데이트
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setNewProjectNameValue) {
      setNewProjectNameValue(e.target.value);
    }

    if (setPageError) {
      if (!e.target.value.trim().length) setPageError(true);
      else setPageError(false);
    }
  };

  // 엔터 키 입력 시 값 저장
  // const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter") {
  //     // 엔터 키가 눌리면 제출된 값으로 저장
  //     if (newProjectNameValue) {
  //       setSubmittedValue(newProjectNameValue);
  //     }
  //     // 인풋창 초기화
  //     if (setNewProjectNameValue) setNewProjectNameValue("");
  //   }
  // };

  // 저장 버튼 클릭 시 처리
  // const handleSaveClick = () => {
  //   if (newProjectNameValue) {
  //     setSubmittedValue(newProjectNameValue);
  //     if (setNewProjectNameValue) setNewProjectNameValue("");
  //   }
  // };

  // console.log(newProjectNameValue);
  // console.log(submittedValue);

  return (
    <div className="w-full">
      {/* 프로젝트명 / 업무명 */}
      <p className="w-full font-bold">{`${value}명`}</p>
      {pageError && (
        <p className="text-[13px] text-header-red-hover">
          프로젝트 이름을 입력해주세요
        </p>
      )}

      <div className="flex gap-[5px]">
        {/* input창 */}
        <input
          className={twMerge(`w-full py-[5px]
        border-[1px] border-gray01 rounded-[5px] text-center
        font-bold text-[14px] text-logo-green placeholder-gray01 ${
          pageError ? "border-header-red-hover outline-header-red-hover" : ""
        }`)}
          placeholder={`${value}명을 작성해주세요.`}
          value={newProjectNameValue}
          onChange={handleInputChange}
          // onKeyDown={handleKeyPress}
        />

        {/* 저장버튼 */}
        {/* <img
          src={save2}
          className="w-[32px] cursor-pointer"
          onClick={handleSaveClick}
        /> */}
      </div>

      {/* 작성내용 */}
      {/* {submittedValue && (
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
      )} */}
    </div>
  );
};

export default WriteProjectName;
