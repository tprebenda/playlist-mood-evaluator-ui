import { axiosInstance } from "../axiosInstance";

interface Track {
  id: string;
  name: string;
  album: string;
  artists: string;
  danceability: number;
  energy: number;
  speechiness: number;
  acousticness: number;
  instrumentalness: number;
  valence: number;
}

interface MoodResponse {
  mood: string;
  top_features: Array<string>;
  top_tracks: Array<Track>;
}

const getPlaylistMood = async (playlistId: string): Promise<MoodResponse> => {
  const response = await axiosInstance.get(`/mood/${playlistId}`);
  return response.data;
};

export default getPlaylistMood;
