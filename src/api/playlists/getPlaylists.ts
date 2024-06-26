import { axiosInstance } from "../axiosInstance";

// TODO:
// add interface for response data
// add error handling for failed requests (401 unauthorized) - call refresh token and retry
const getPlaylists = async () => {
  const response = await axiosInstance.get("/playlists");
  return response.data;
};

export default getPlaylists;
