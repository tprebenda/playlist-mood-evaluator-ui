import axios from "axios";
import { API_URL_BASE } from "../../constants";

// TODO:
// add interface for response data
// add error handling for failed requests (401 unauthorized) - call refresh token and retry
const getPlaylistTitles = async (playlistName: string) => {
  const response = await axios.get(
    `${API_URL_BASE}/playlist/${playlistName}/titles`,
  );
  return response.data;
};

export default getPlaylistTitles;
