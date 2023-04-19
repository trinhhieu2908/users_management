import axios from "axios";

const axiosConfig = axios.create({
  baseURL:
    "https://interview-incom-default-rtdb.firebaseio.com/",
  headers: {
    "content-type": "application/json",
  },
});
axiosConfig.interceptors.request.use(async (config) => {
  return config;
});
axiosConfig.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      throw error.response.data;
    }
    return error;
  }
);
export default axiosConfig;
