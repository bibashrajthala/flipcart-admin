import axios from "axios";
import { BASE_URL } from "../constants/axios.config";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  //   headers:{
  //     "Authorizaiton":""
  //   }
});

export default axiosInstance;
