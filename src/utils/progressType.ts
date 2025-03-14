export const progressType = (name: string) => {
  if (name === "진행 중") return "IN_PROGRESS";
  else if (name === "진행 예정") return "BEFORE_START";
  else if (name === "진행 완료") return "COMPLETED";
  else return "HOLD";
};
