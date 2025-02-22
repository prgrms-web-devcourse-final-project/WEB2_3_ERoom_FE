import { RefObject, useEffect, useRef, useState } from "react";

const DateTimeSelect = ({
  selectedDate,
  setSelectedDate,
  title,
}: DateTimeSelectProps) => {
  useEffect(() => {
    selectedDate;
  }, []);

  const now = new Date();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // 24시간제 시간 (0~23)
  const hours24 = now.getHours();
  // 12시간제 변환 (0시는 12로 변환)
  const nowHours12 = hours24 % 12 || 12;
  // AM/PM 판별
  const nowAmPm = hours24 >= 12 ? "PM" : "AM";
  const nowMinute = now.getMinutes();

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

    if (!selectedDate || !setSelectedDate) return;

    setSelectedDate((prev) => {
      const updatedDay =
        type === "day"
          ? newValue
          : type === "month" &&
            Number(prev.day) > getMaxDaysInMonth(prev.year, Number(newValue))
          ? String(getMaxDaysInMonth(prev.year, Number(newValue))).padStart(
              2,
              "0"
            )
          : prev.day ?? "01"; // prev.day가 undefined면 기본값 "01" 설정

      return {
        ...prev,
        [type]: newValue,
        day: updatedDay,
      };
    });

    setTimeout(() => setOpenDropdown(null), 0);
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
        className="h-[40px] flex items-center justify-center hover:bg-main-green02 hover:text-main-beige01 cursor-pointer"
        onClick={() => selectOption(openDropdown as string, num)}
      >
        {num} {unit}
      </li>
    ));

  // 드롭다운 열릴 때 현재 선택된 항목으로 스크롤 이동
  useEffect(() => {
    if (!selectedDate || !setSelectedDate) return;

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

  console.log(selectedDate);

  return (
    <div className="flex flex-col gap-[5px]">
      {/* 시작/종료 */}
      <span className="text-main-green font-medium text-[12px]">{title}</span>

      {/* 기간설정 */}
      <div className="flex w-full h-[40px] justify-between bg-gradient-to-t from-[#CDD5CE] to-white/40">
        {/* 연월일 */}
        <div className="flex gap-[2px]">
          {/* 연도 선택 */}
          <div className="w-[50px] relative overflow-visible drop-shadow-xl">
            <div
              className="border border-main-green01 rounded-[5px] w-full h-full px-[10px] flex items-center justify-center
              text-[14px] font-bold text-main-green bg-gradient-to-t from-[#E1E6E2] to-white/40 cursor-pointer"
              onClick={() => toggleDropdown("year")}
            >
              {/* {selectedDate?.year || now.getFullYear()} */}
              {selectedDate?.year}
            </div>

            {/* 드롭다운 */}
            {openDropdown === "year" && (
              <ul
                ref={dropdownRefs.year}
                className="absolute mt-1 w-full border border-main-green01 rounded-[5px] text-[14px] font-bold text-main-green 
                bg-gradient-to-t from-[#E1E6E2] to-white cursor-pointer max-h-40 overflow-y-auto scrollbar-none"
              >
                {generateOptions(now.getFullYear() - 1, now.getFullYear() + 10)}
              </ul>
            )}
          </div>

          {/* 월 선택 */}
          <div className="w-[36px] relative drop-shadow-xl">
            <div
              className="border border-main-green01 rounded-[5px] w-full h-full px-[10px] flex items-center justify-center
              text-[14px] font-bold text-main-green bg-gradient-to-t from-[#E1E6E2] to-white/40 cursor-pointer"
              onClick={() => toggleDropdown("month")}
            >
              {/* {selectedDate?.month ||
                String(now.getMonth() + 1).padStart(2, "0")} */}
              {selectedDate?.month}
            </div>
            {openDropdown === "month" && (
              <ul
                ref={dropdownRefs.month}
                className="absolute mt-1 w-full border border-main-green01 rounded-[5px] text-[14px] font-bold text-main-green 
                bg-gradient-to-t from-[#E1E6E2] to-white cursor-pointer  max-h-40 overflow-y-auto scrollbar-none "
              >
                {generateOptions(1, 12)}
              </ul>
            )}
          </div>

          {/* 일 선택 */}
          <div className="w-[36px] relative drop-shadow-xl">
            <div
              className="border border-main-green01 rounded-[5px] w-full h-full px-[10px] flex items-center justify-center
              text-[14px] font-bold text-main-green bg-gradient-to-t from-[#E1E6E2] to-white/40 cursor-pointer"
              onClick={() => toggleDropdown("day")}
            >
              {/* {selectedDate?.day || String(now.getDate()).padStart(2, "0")} */}
              {selectedDate?.day}
            </div>
            {openDropdown === "day" && (
              <ul
                ref={dropdownRefs.day}
                className="absolute mt-1 w-full border border-main-green01 rounded-[5px] text-[14px] font-bold text-main-green 
                bg-gradient-to-t from-[#E1E6E2] to-white cursor-pointer  max-h-40 overflow-y-auto scrollbar-none "
              >
                {generateOptions(
                  1,
                  getMaxDaysInMonth(
                    selectedDate
                      ? selectedDate.year
                      : String(now.getFullYear()),
                    Number(
                      selectedDate
                        ? selectedDate?.month
                        : String(now.getMonth() + 1)
                    )
                  )
                )}
              </ul>
            )}
          </div>
        </div>

        {/* 시간 */}
        <div className="flex gap-[2px]">
          {/* AM/PM 선택 */}
          <div className="w-[36px] relative drop-shadow-xl">
            <div
              className="border border-main-green01 rounded-[5px] w-full h-full px-[5px] flex items-center justify-center
              text-[14px] font-bold text-main-green bg-gradient-to-t from-[#E1E6E2] to-white/40 cursor-pointer"
              onClick={() => toggleDropdown("ampm")}
            >
              {/* {selectedDate?.ampm || nowAmPm} */}
              {selectedDate.ampm}
            </div>
            {openDropdown === "ampm" && (
              <ul
                ref={dropdownRefs.ampm}
                className="absolute mt-1 w-full border border-main-green01 rounded-[5px] text-[14px] font-bold text-main-green 
                bg-gradient-to-t from-[#E1E6E2] to-white cursor-pointer  max-h-40 overflow-y-auto scrollbar-none "
              >
                <li
                  className="h-[40px] flex items-center justify-center hover:bg-main-green02 hover:text-main-beige01 cursor-pointer "
                  onClick={() => selectOption("ampm", "AM")}
                >
                  AM
                </li>
                <li
                  className="h-[40px] flex items-center justify-center hover:bg-main-green02 hover:text-main-beige01 cursor-pointer "
                  onClick={() => selectOption("ampm", "PM")}
                >
                  PM
                </li>
              </ul>
            )}
          </div>

          {/* 시간 선택 */}
          <div className="w-[36px] relative drop-shadow-xl">
            <div
              className="border border-main-green01 rounded-[5px] w-full h-full px-[8px] flex items-center justify-center
              text-[14px] font-bold text-main-green bg-gradient-to-t from-[#E1E6E2] to-white/40 cursor-pointer"
              onClick={() => toggleDropdown("hour")}
            >
              {/* {selectedDate?.hour || title === "시작"
                ? String(nowHours12).padStart(2, "0")
                : String(nowHours12 + 1).padStart(2, "0")} */}
              {selectedDate?.hour}
            </div>
            {openDropdown === "hour" && (
              <ul
                ref={dropdownRefs.hour}
                className="absolute mt-1 w-full border border-main-green01 rounded-[5px] text-[14px] font-bold text-main-green 
                bg-gradient-to-t from-[#E1E6E2] to-white cursor-pointer  max-h-40 overflow-y-auto scrollbar-none "
              >
                {generateOptions(1, 12)}
              </ul>
            )}
          </div>

          {/* 분 선택 */}
          <div className="w-[36px] relative drop-shadow-xl">
            <div
              className="border border-main-green01 rounded-[5px] w-full h-full px-[7.5px] flex items-center justify-center
              text-[14px] font-bold text-main-green bg-gradient-to-t from-[#E1E6E2] to-white/40 cursor-pointer"
              onClick={() => toggleDropdown("minute")}
            >
              {/* {selectedDate?.minute || String(nowMinute).padStart(2, "0")} */}
              {selectedDate?.minute}
            </div>
            {openDropdown === "minute" && (
              <ul
                ref={dropdownRefs.minute}
                className="absolute mt-1 w-full border border-main-green01 rounded-[5px] text-[14px] font-bold text-main-green 
                bg-gradient-to-t from-[#E1E6E2] to-white cursor-pointer  max-h-40 overflow-y-auto scrollbar-none "
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
