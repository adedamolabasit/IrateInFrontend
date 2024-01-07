import axios from "axios";
import { BASEURL } from "./utils";

const axiosApiInstance = axios.create({
  baseURL: BASEURL.http
});

axiosApiInstance.interceptors.request.use(
  async (config) => {
    const value = await localStorage.getItem("user");
    if (value) {
      const { token } = JSON.parse(value);
      config.headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      };
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axiosApiInstance;
