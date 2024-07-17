import { axiosInstance } from "../axiosInstance";

interface MoodResponse {
  mood: string;
  top_features: Array<string>;
  top_tracks: Array<Object>;
}

// TODO:
// add error handling for failed requests (401 unauthorized) - call refresh token and retry
const getPlaylistMood = async (playlistId: string): Promise<MoodResponse> => {
  const response = await axiosInstance.get(`/mood/${playlistId}`);
  return response.data;
};

export default getPlaylistMood;
