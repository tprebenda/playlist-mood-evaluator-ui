import { axiosInstance } from "../axiosInstance";

// Initiates the OAuth Access Token exchange on the API backend with provided Auth Code
// https://developer.spotify.com/documentation/web-api/tutorials/code-flow
const exchangeSpotifyAuthToken = async (code: string): Promise<void> => {
  const searchParams = new URLSearchParams();
  searchParams.append("code", code);
  const response = await axiosInstance.post(
    "/spotify-auth?" + searchParams.toString(),
  );
  // if (response.status == 401) {
  //   call /refresh-token endpoint to reinitialize session on backend
  //   call this function again (recursive)? Or should I automatically refresh on the backend?
  // }
  if (response.status !== 204) {
    // TODO: return whole response object instead of response.data, handle errors in component instead?
    throw new Error("Login attempt failed, please try again...");
  }
};

export default exchangeSpotifyAuthToken;
