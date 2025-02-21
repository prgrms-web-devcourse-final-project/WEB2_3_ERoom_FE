interface AlarmModalProps {
  onClose: () => void;
}

interface AlarmBoxProps {
  project: string;
  task?: string;
  theme: "message" | "newTask" | "newProject" | "endProject";
  css?: string;
  onRemove?: () => void;
}
