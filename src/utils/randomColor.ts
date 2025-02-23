import { CALENDAR_COLORS } from "../constants/calendarColors";

export const randomColor = (colorType: "calendar" | "task") => {
  const getRandomIdx = Math.floor(Math.random() * 10);

  if (colorType === "calendar") {
    const color = CALENDAR_COLORS[getRandomIdx];
    return color;
  }
};
