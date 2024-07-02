import { axiosInstance } from "../axiosInstance";

export interface PlaylistsResponse {
  name: string;
  id: string;
}

// TODO:
// add error handling for failed requests (401 unauthorized) - call refresh token and retry
export const getPlaylists = async (): Promise<PlaylistsResponse[]> => {
  const response = await axiosInstance.get("/playlists");
  return response.data;
};
