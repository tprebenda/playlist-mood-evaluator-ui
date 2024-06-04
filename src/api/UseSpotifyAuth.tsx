import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Spotify Docs: https://developer.spotify.com/documentation/web-api/tutorials/code-flow
const SPOTIFY_USER_AUTH_URL = "https://accounts.spotify.com/authorize?";
const CLIENT_ID = "5b9ee404632b45f6a6d6cc35824554a6";
const REDIRECT_URI = "http://localhost:3000/callback";
const STATE_KEY_LENGTH = 16;

// Used for generating random string for state: https://stackoverflow.com/a/27747377
const dec2hex = (dec: number) => {
  return dec.toString(16).padStart(2, "0");
};

// https://stackoverflow.com/a/27747377
const generateStateKey = (len: number = STATE_KEY_LENGTH) => {
  const arr = new Uint8Array((len || 40) / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join("");
};

const getUserAuth = () => {
  const state = generateStateKey();
  let userAuthRequestUrl = new URL(SPOTIFY_USER_AUTH_URL);
  userAuthRequestUrl.searchParams.append("response_type", "code");
  userAuthRequestUrl.searchParams.append("client_id", CLIENT_ID);
  userAuthRequestUrl.searchParams.append("redirect_uri", REDIRECT_URI);
  userAuthRequestUrl.searchParams.append("state", state);
  return axios.get(userAuthRequestUrl.toString());
};

// Component for authentication against Spotify OAuth2.0
const UseSpotifyAuth = () => {
  const result = useQuery({
    queryKey: ["spotifyAccount"],
    queryFn: getUserAuth,
  });
};

export default UseSpotifyAuth;
