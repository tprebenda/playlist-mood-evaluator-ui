import axios from "axios";

// export const API_URL_BASE = "http://127.0.0.1:8000"; // LOCAL DEV
export const API_URL_BASE = "https://api.playlistmoodevaluator.com";

export const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: API_URL_BASE,
});
