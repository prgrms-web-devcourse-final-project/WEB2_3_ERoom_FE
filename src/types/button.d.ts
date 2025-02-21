interface ButtonProps {
  text: string;
  size: "md" | "lg" | "sm";
  to?: string;
  css?: string;
  logo?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

interface AdminButtonProps {
  text: string;
  type: "green" | "white";
  to?: string;
  css?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

interface ParticipantIconProps {
  css?: string;
}
