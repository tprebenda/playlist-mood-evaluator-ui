import { useQuery } from "@tanstack/react-query";
import { MoodResponse } from "../../common";
import { axiosInstance } from "../axiosInstance";

export const getPlaylistMood = async (
  playlistId: string,
): Promise<MoodResponse> => {
  const response = await axiosInstance.get(`/mood/${playlistId}`);
  return response.data;
};

const useGetPlaylistMood = (playlistId: string) => {
  return useQuery<MoodResponse>({
    queryKey: ["playlist-mood", playlistId],
    queryFn: () => getPlaylistMood(playlistId),
  });
};

export default useGetPlaylistMood;
