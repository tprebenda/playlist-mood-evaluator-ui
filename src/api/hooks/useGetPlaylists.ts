import { useQuery } from "@tanstack/react-query";
import { PlaylistsResponse } from "../../common";
import { axiosInstance } from "../axiosInstance";

export const getPlaylists = async (): Promise<PlaylistsResponse[]> => {
  const response = await axiosInstance.get("/playlists");
  return response.data;
};

const useGetPlaylists = () => {
  return useQuery<PlaylistsResponse[]>({
    queryKey: ["playlists"],
    queryFn: getPlaylists,
  });
};

export default useGetPlaylists;
