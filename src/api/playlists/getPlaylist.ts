import axios from "axios";
import { API_URL_BASE } from "../../constants";

// TODO:
// add interface for response data
// add error handling for failed requests (401 unauthorized) - call refresh token and retry
const getPlaylists = async () => {
  const response = await axios.get(`${API_URL_BASE}/playlists`, {
    withCredentials: true,
  });
  return response.data;
};

export default getPlaylists;
