import axios from "axios";


const axiosApiInstance = axios.create({
  baseURL: process.env.REACT_BASE_API_URL || "http://127.0.0.1:8000/api/v1"
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
