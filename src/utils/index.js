import { toast } from "react-hot-toast";

export const STATE = {
  SUCCESS: "SUCCESS",
  LOADING: "LOADING",
  IDLE: "IDLE",
  ERROR: "ERROR",
};

export const alertSuccess = (message) => {
  toast.success(message);
};

export const alertError = (message) => {
  toast.error(message);
};
