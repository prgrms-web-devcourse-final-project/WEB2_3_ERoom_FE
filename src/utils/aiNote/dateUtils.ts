import dayjs from "dayjs";

export const formatTo24Hour = (
  isoString: string | undefined
): string | undefined => {
  if (!isoString) return "";
  return dayjs(isoString).format("YYYY-MM-DD HH:mm"); // 24시간 형식
};

export const formatSelectedDate = (date: selectedDateType): string => {
  return dayjs(
    `${date.year}-${date.month}-${date.day}T${date.hour}:${date.minute}`
  ).format("YYYY-MM-DD HH:mm"); // 24시간 형식
};
