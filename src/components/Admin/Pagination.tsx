import React, { useState } from "react";
import nextPageBtnOn from "../../assets/icons/next_page_on.svg";
import nextPageBtnOff from "../../assets/icons/next_page_off.svg";
import prePageBtnOn from "../../assets/icons/pre_page_on.svg";
import prePageBtnOff from "../../assets/icons/pre_page_off.svg";
import startPageBtnOn from "../../assets/icons/start_page_on.svg";
import startPageBtnOff from "../../assets/icons/start_page_off.svg";
import endPageBtnOn from "../../assets/icons/end_page_on.svg";
import endPageBtnOff from "../../assets/icons/end_page_off.svg";

interface PaginationProps {
  totalPages: number;
  onPageChange: (selectedPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  onPageChange,
}) => {
  const pagesPerGroup = 10; // 한 번에 표시할 페이지 수
  const [currentPage, setCurrentPage] = useState(1);
  const [currentGroupStart, setCurrentGroupStart] = useState(1); // 현재 그룹의 시작 페이지

  // 현재 그룹의 끝 페이지 계산
  const currentGroupEnd = Math.min(
    currentGroupStart + pagesPerGroup - 1,
    totalPages
  );

  // 페이지 변경 핸들러
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    onPageChange(newPage);
  };

  // 다음 그룹으로 이동
  const handleNextGroup = () => {
    if (currentGroupEnd < totalPages) {
      const nextStart = currentGroupStart + pagesPerGroup;
      setCurrentGroupStart(nextStart);
      handlePageChange(nextStart);
    }
  };

  // 이전 그룹으로 이동
  const handlePrevGroup = () => {
    if (currentGroupStart > 1) {
      const prevStart = currentGroupStart - pagesPerGroup;
      setCurrentGroupStart(prevStart);
      handlePageChange(prevStart);
    }
  };

  // 처음 페이지로 이동
  const handleFirstPage = () => {
    setCurrentGroupStart(1);
    handlePageChange(1);
  };

  // 마지막 페이지로 이동
  const handleLastPage = () => {
    const lastGroupStart =
      Math.floor((totalPages - 1) / pagesPerGroup) * pagesPerGroup + 1;
    setCurrentGroupStart(lastGroupStart);
    handlePageChange(totalPages);
  };

  return (
    <div className="flex">
      {/* 첫 페이지 버튼 */}
      <button
        onClick={handleFirstPage}
        disabled={currentGroupStart === 1}
        className="cursor-pointer"
      >
        <img
          src={currentGroupStart === 1 ? startPageBtnOff : startPageBtnOn}
          alt="처음 페이지로 이동"
        />
      </button>

      {/* 이전 그룹 버튼 */}
      <button
        onClick={handlePrevGroup}
        disabled={currentGroupStart === 1}
        className="cursor-pointer"
      >
        <img
          src={currentGroupStart === 1 ? prePageBtnOff : prePageBtnOn}
          alt="이전 10페이지로 이동"
        />
      </button>

      {/* 페이지 번호 목록 */}
      <div className="flex">
        {Array.from(
          { length: currentGroupEnd - currentGroupStart + 1 },
          (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(currentGroupStart + i)}
              className={`cursor-pointer flex items-center justify-center w-[25px] h-[25px] ${
                currentPage === currentGroupStart + i
                  ? "!bg-header-green !text-main-beige01"
                  : "text-header-green bg-transparent"
              }`}
            >
              {currentGroupStart + i}
            </button>
          )
        )}
      </div>

      {/* 다음 그룹 버튼 */}
      <button
        onClick={handleNextGroup}
        disabled={currentGroupEnd >= totalPages}
        className="cursor-pointer"
      >
        <img
          src={currentGroupEnd >= totalPages ? nextPageBtnOff : nextPageBtnOn}
          alt="다음 10페이지로 이동"
        />
      </button>

      {/* 마지막 페이지 버튼 */}
      <button
        onClick={handleLastPage}
        disabled={currentGroupEnd >= totalPages}
        className="cursor-pointer"
      >
        <img
          src={currentGroupEnd >= totalPages ? endPageBtnOff : endPageBtnOn}
          alt="마지막 페이지로 이동"
        />
      </button>
    </div>
  );
};

export default Pagination;
