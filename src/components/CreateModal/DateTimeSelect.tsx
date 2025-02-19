import { RefObject, useEffect, useRef, useState } from "react";

interface DateTimeSelectProps {
  selectedDate: {
    year: string;
    month: string;
    day: string;
    hour: string;
    minute: string;
    ampm: string;
  };
  setSelectedDate: React.Dispatch<
    React.SetStateAction<{
      year: string;
      month: string;
      day: string;
      hour: string;
      minute: string;
      ampm: string;
    }>
  >;
  title: "시작" | "종료";
}

const DateTimeSelect = ({
  selectedDate,
  setSelectedDate,
  title,
}: DateTimeSelectProps) => {
  const now = new Date();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // 각 드롭다운별 ref 생성
  const dropdownRefs = {
    year: useRef<HTMLUListElement | null>(null),
    month: useRef<HTMLUListElement | null>(null),
    day: useRef<HTMLUListElement | null>(null),
    hour: useRef<HTMLUListElement | null>(null),
    minute: useRef<HTMLUListElement | null>(null),
    ampm: useRef<HTMLUListElement | null>(null),
  };

  const toggleDropdown = (type: string) => {
    setOpenDropdown((prev) => (prev === type ? null : type));
  };

  const selectOption = (type: string, value: number | string) => {
    const newValue = String(value).padStart(2, "0");
    setSelectedDate((prev) => ({
      ...prev,
      [type]: newValue,

      // month 변경 시, 기존 day가 해당 월의 최대 일수를 초과하면 조정
      day:
        type === "month" &&
        Number(prev.day) > getMaxDaysInMonth(prev.year, Number(newValue))
          ? String(getMaxDaysInMonth(prev.year, Number(newValue))).padStart(
              2,
              "0"
            )
          : type === "day"
          ? newValue // `type === "day"`이면 `newValue` 반영
          : String(prev.day).padStart(2, "0"),
    }));
    setOpenDropdown(null);
  };

  const getMaxDaysInMonth = (year: string, month: number) => {
    return new Date(Number(year), month, 0).getDate();
  };

  const generateOptions = (start: number, end: number, unit?: string) =>
    Array.from({ length: end - start + 1 }, (_, i) =>
      String(start + i).padStart(2, "0")
    ).map((num) => (
      <li
        key={num}
        data-value={num}
        className="h-[40px] flex items-center justify-center hover:bg-main-green02 hover:text-main-beige01 cursor-pointer z-40"
        onClick={() => selectOption(openDropdown as string, num)}
      >
        {num} {unit}
      </li>
    ));

  // 드롭다운 열릴 때 현재 선택된 항목으로 스크롤 이동
  useEffect(() => {
    if (
      openDropdown &&
      (dropdownRefs as Record<string, RefObject<HTMLUListElement | null>>)[
        openDropdown
      ]?.current
    ) {
      const selectedValue =
        selectedDate[openDropdown as keyof typeof selectedDate];
      const selectedItem = (
        dropdownRefs as Record<string, RefObject<HTMLUListElement | null>>
      )[openDropdown]?.current?.querySelector(
        `[data-value="${selectedValue}"]`
      );

      if (selectedItem) {
        selectedItem.scrollIntoView({ block: "center", behavior: "auto" });
      }
    }
  }, [openDropdown]);

  return (
    <div className="flex flex-col gap-[5px]">
      <span className="text-main-green font-medium text-[12px]">{title}</span>
      <div className="flex w-full h-[40px] flex justify-between bg-gradient-to-t from-[#CDD5CE] to-white/40">
        <div className="flex gap-[2px]">
          {/* 연도 선택 */}
          <div className="relative drop-shadow-xl">
            <div
              className="border border-main-green01 rounded-[5px] w-full h-full px-[10px] flex items-center text-[14px] font-bold text-main-green bg-gradient-to-t from-[#E1E6E2] to-white/40 cursor-pointer"
              onClick={() => toggleDropdown("year")}
            >
              {selectedDate.year}
            </div>
            {openDropdown === "year" && (
              <ul
                ref={dropdownRefs.year}
                className="absolute mt-1 w-full border border-main-green01 rounded-[5px] text-[14px] font-bold text-main-green bg-gradient-to-t from-[#E1E6E2] to-white cursor-pointer max-h-40 overflow-y-auto scrollbar-none z-40"
              >
                {generateOptions(now.getFullYear() - 1, now.getFullYear() + 10)}
              </ul>
            )}
          </div>

          {/* 월 선택 */}
          <div className="relative drop-shadow-xl">
            <div
              className="border border-main-green01 rounded-[5px] w-full h-full px-[10px] flex items-center text-[14px] font-bold text-main-green bg-gradient-to-t from-[#E1E6E2] to-white/40 cursor-pointer"
              onClick={() => toggleDropdown("month")}
            >
              {selectedDate.month}
            </div>
            {openDropdown === "month" && (
              <ul
                ref={dropdownRefs.month}
                className="absolute mt-1 w-full border border-main-green01 rounded-[5px] text-[14px] font-bold text-main-green bg-gradient-to-t from-[#E1E6E2] to-white cursor-pointer  max-h-40 overflow-y-auto scrollbar-none z-40"
              >
                {generateOptions(1, 12)}
              </ul>
            )}
          </div>

          {/* 일 선택 */}
          <div className="relative drop-shadow-xl">
            <div
              className="border border-main-green01 rounded-[5px] w-full h-full px-[10px] flex items-center text-[14px] font-bold text-main-green bg-gradient-to-t from-[#E1E6E2] to-white/40 cursor-pointer"
              onClick={() => toggleDropdown("day")}
            >
              {selectedDate.day}
            </div>
            {openDropdown === "day" && (
              <ul
                ref={dropdownRefs.day}
                className="absolute mt-1 w-full border border-main-green01 rounded-[5px] text-[14px] font-bold text-main-green bg-gradient-to-t from-[#E1E6E2] to-white cursor-pointer  max-h-40 overflow-y-auto scrollbar-none z-40"
              >
                {generateOptions(
                  1,
                  getMaxDaysInMonth(
                    selectedDate.year,
                    Number(selectedDate.month)
                  )
                )}
              </ul>
            )}
          </div>
        </div>

        <div className="flex gap-[2px]">
          {/* AM/PM 선택 */}
          <div className="relative drop-shadow-xl">
            <div
              className="border border-main-green01 rounded-[5px] w-full h-full px-[5px] flex items-center text-[14px] font-bold text-main-green bg-gradient-to-t from-[#E1E6E2] to-white/40 cursor-pointer"
              onClick={() => toggleDropdown("ampm")}
            >
              {selectedDate.ampm}
            </div>
            {openDropdown === "ampm" && (
              <ul
                ref={dropdownRefs.ampm}
                className="absolute mt-1 w-full border border-main-green01 rounded-[5px] text-[14px] font-bold text-main-green bg-gradient-to-t from-[#E1E6E2] to-white cursor-pointer  max-h-40 overflow-y-auto scrollbar-none z-40"
              >
                <li
                  className="h-[40px] flex items-center justify-center hover:bg-main-green02 hover:text-main-beige01 cursor-pointer z-40"
                  onClick={() => selectOption("ampm", "AM")}
                >
                  AM
                </li>
                <li
                  className="h-[40px] flex items-center justify-center hover:bg-main-green02 hover:text-main-beige01 cursor-pointer z-40"
                  onClick={() => selectOption("ampm", "PM")}
                >
                  PM
                </li>
              </ul>
            )}
          </div>

          {/* 시간 선택 */}
          <div className="relative drop-shadow-xl">
            <div
              className="border border-main-green01 rounded-[5px] w-full h-full px-[8px] flex items-center text-[14px] font-bold text-main-green bg-gradient-to-t from-[#E1E6E2] to-white/40 cursor-pointer"
              onClick={() => toggleDropdown("hour")}
            >
              {selectedDate.hour}
            </div>
            {openDropdown === "hour" && (
              <ul
                ref={dropdownRefs.hour}
                className="absolute mt-1 w-full border border-main-green01 rounded-[5px] text-[14px] font-bold text-main-green bg-gradient-to-t from-[#E1E6E2] to-white cursor-pointer  max-h-40 overflow-y-auto scrollbar-none z-40"
              >
                {generateOptions(1, 12)}
              </ul>
            )}
          </div>

          {/* 분 선택 */}
          <div className="relative drop-shadow-xl">
            <div
              className="border border-main-green01 rounded-[5px] w-full h-full px-[7.5px] flex items-center text-[14px] font-bold text-main-green bg-gradient-to-t from-[#E1E6E2] to-white/40 cursor-pointer"
              onClick={() => toggleDropdown("minute")}
            >
              {selectedDate.minute}
            </div>
            {openDropdown === "minute" && (
              <ul
                ref={dropdownRefs.minute}
                className="absolute mt-1 w-full border border-main-green01 rounded-[5px] text-[14px] font-bold text-main-green bg-gradient-to-t from-[#E1E6E2] to-white cursor-pointer  max-h-40 overflow-y-auto scrollbar-none z-40"
              >
                {generateOptions(0, 59)}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateTimeSelect;
