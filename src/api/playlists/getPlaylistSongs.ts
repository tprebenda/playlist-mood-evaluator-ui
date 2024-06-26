import { axiosInstance } from "../axiosInstance";

// TODO:
// ADD BACKEND ROUTE
// add interface for response data
// add error handling for failed requests (401 unauthorized) - call refresh token and retry
const getPlaylistTitles = async (playlistName: string) => {
  const response = await axiosInstance.get(`/playlist/${playlistName}/titles`);

  return response.data;
};

export default getPlaylistTitles;
