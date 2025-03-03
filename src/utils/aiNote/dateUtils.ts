export const formatToAMPM = (
  isoString: string | undefined
): string | undefined => {
  if (!isoString) return "";
  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월 (1월 = 0이므로 +1)
  const day = String(date.getDate()).padStart(2, "0"); // 일
  const hours = date.getHours(); // 24시간 형식
  const minutes = String(date.getMinutes()).padStart(2, "0"); // 분

  const ampm = hours >= 12 ? "PM" : "AM"; // 오전/오후 판별
  const formattedHour = hours % 12 || 12; // 12시간 형식 변환 (0시는 12로 표시)

  return `${year}-${month}-${day} ${ampm} ${String(formattedHour).padStart(
    2,
    "0"
  )}:${minutes}`;
};
