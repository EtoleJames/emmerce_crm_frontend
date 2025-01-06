import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://emmercecrmbackend-production.up.railway.app/", //  backend URL
  timeout: 5000,
});

export default axiosInstance;
