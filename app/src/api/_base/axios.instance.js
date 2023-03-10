import axios from "axios";
import { API_TCC } from "../../constants";

export const axiosInstance = axios.create({
  baseURL: API_TCC,
  withCredentials: true,
  timeout: 15000,
});
