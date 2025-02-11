import { MoodResponse, Track } from "../api/playlists/getPlaylistMood";
import { PlaylistsResponse } from "../api/playlists/getPlaylists";

export type TrackDetails = Track;

export interface LoadingStatus {
  isLoading: boolean;
  text: string;
}

export const notLoading: LoadingStatus = {
  isLoading: false,
  text: "",
};

export const loadingUserData: LoadingStatus = {
  isLoading: true,
  text: "Retrieving user playlist data from Spotify...",
};

export const getLoadingStatusForPlaylist = (
  playlistName: string,
): LoadingStatus => ({
  isLoading: true,
  text: `Generating mood using the songs from your playlist: '${playlistName}'...`,
});

export type UserPlaylist = PlaylistsResponse;

export type PlaylistMoodDetails = MoodResponse;
