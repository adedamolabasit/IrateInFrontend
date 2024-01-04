import axios from "axios";
const axiosApiInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/chat"
});

axiosApiInstance.interceptors.request.use(
  async (config) => {
    const value = await localStorage.getItem("user");
    console.log(value.token,"kkds")
    if (value) {
      const { auth, token } = JSON.parse(value);
      config.headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        // ...config.headers,
      };
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axiosApiInstance;
