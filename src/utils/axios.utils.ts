import axios from "axios";
import { BASE_URL } from "../constants/axios.config";

const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default axiosInstance;
