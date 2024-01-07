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

export const BASEURL = {
  http:"http://127.0.0.1:8000/api/v1",
  socket:"ws://127.0.0.1:8000/ws"
}