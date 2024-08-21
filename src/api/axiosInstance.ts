import axios from "axios";

export const API_URL_BASE =
  window.location.hostname === "127.0.0.1"
    ? "http://127.0.0.1:8000"
    : "https://api.playlistmoodevaluator.com";

export const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: API_URL_BASE,
});
