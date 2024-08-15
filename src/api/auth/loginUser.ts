import { axiosInstance } from "../axiosInstance";

// Initiates the OAuth Access Token exchange on the API backend with provided Auth Code
// https://developer.spotify.com/documentation/web-api/tutorials/code-flow
const exchangeSpotifyAuthToken = async (code: string): Promise<void> => {
  const searchParams = new URLSearchParams();
  searchParams.append("code", code);
  await axiosInstance.post("/spotify-auth?" + searchParams.toString());
};

export default exchangeSpotifyAuthToken;
