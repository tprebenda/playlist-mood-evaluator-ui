import { axiosInstance } from "../axiosInstance";

// TODO:
// add interface for response data
// add error handling for failed requests (401 unauthorized) - call refresh token and retry
const getPlaylistMood = async (playlistId: string) => {
  const response = await axiosInstance.get(`/mood/${playlistId}`);
  return response.data;
};

export default getPlaylistMood;
