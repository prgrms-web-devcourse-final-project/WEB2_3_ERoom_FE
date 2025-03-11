interface selectedDateType {
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
}

interface DateTimeSelectProps {
  selectedDate: {
    year: string;
    month: string;
    day: string;
    hour: string;
    minute: string;
  };
  setSelectedDate: React.Dispatch<
    React.SetStateAction<{
      year: string;
      month: string;
      day: string;
      hour: string;
      minute: string;
    }>
  >;
  title?: "시작" | "종료";
}
