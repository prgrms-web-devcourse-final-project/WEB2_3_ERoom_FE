interface selectedDateType {
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
  ampm: string;
}

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
  title?: "시작" | "종료";
}
