import { toast, ToastOptions, Zoom } from "react-toastify";

export const defaultToastOptions: ToastOptions = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: false,
  pauseOnHover: false,
  draggable: true,
  transition: Zoom,
};

export const showToast = (
  type: "success" | "error" | "info" | "warning",
  message: string
) => {
  toast[type](message, defaultToastOptions);
};
