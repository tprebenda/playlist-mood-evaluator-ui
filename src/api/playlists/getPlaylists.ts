import { axiosInstance } from "../axiosInstance";

export interface PlaylistsResponse {
  name: string;
  id: string;
}

export const getPlaylists = async (): Promise<PlaylistsResponse[]> => {
  const response = await axiosInstance.get("/playlists");
  return response.data;
};
