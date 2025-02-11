import { axiosInstance } from "../axiosInstance";

export interface Track {
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

export interface MoodResponse {
  mood: string;
  top_features: Array<string>;
  top_tracks: Array<Track>;
}

export const getPlaylistMood = async (
  playlistId: string,
): Promise<MoodResponse> => {
  const response = await axiosInstance.get(`/mood/${playlistId}`);
  return response.data;
};
