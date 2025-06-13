export interface TrackDetails {
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
  top_features: string[];
  top_tracks: TrackDetails[];
}

export const getLoadingStatusForPlaylist = (playlistName: string): string =>
  `Generating mood using the songs from your playlist: '${playlistName}'...`;

export const LOADING_USER_DATA =
  "Retrieving user playlist data from Spotify...";

export const GAP_TO_BORDER = { xxl: 7, xl: 4, xs: 3 };

export interface PlaylistsResponse {
  name: string;
  id: string;
}

export type UserPlaylist = PlaylistsResponse;
