import axios from "axios";

const API_URL_BASE = "http://127.0.0.1:8000";

export const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: API_URL_BASE,
});
