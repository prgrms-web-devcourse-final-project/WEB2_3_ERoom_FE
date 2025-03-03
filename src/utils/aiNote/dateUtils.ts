import dayjs from "dayjs";

export const formatToAMPM = (
  isoString: string | undefined
): string | undefined => {
  if (!isoString) return "";
  return dayjs(isoString).format("YYYY-MM-DD A hh:mm");
};

export const formatSelectedDate = (date: selectedDateType): string => {
  const hour =
    date.ampm === "PM" && date.hour !== "12"
      ? String(Number(date.hour) + 12) // 오후이면 12 더하기
      : date.ampm === "AM" && date.hour === "12"
      ? "00" // 오전 12시는 00시로 변환
      : date.hour;

  return dayjs(
    `${date.year}-${date.month}-${date.day}T${hour}:${date.minute}`
  ).format("YYYY-MM-DD A hh:mm");
};
