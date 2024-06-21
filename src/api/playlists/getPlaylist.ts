import axios from "axios";
import { API_URL_BASE } from "../../constants";

// TODO:
// use pydantic?
// add error handling for failed requests (401 unauthorized) - call refresh token and retry
const getPlaylists = async () => {
  const response = await axios.get(`${API_URL_BASE}/playlists`);
  return response.data;
};

export default getPlaylists;
