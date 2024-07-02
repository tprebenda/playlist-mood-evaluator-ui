import { axiosInstance } from "../axiosInstance";

interface AccessTokenReponse {
  tokenSaved: boolean;
}

// Initiates the OAuth Access Token exchange on the API backend with provided Auth Code
// https://developer.spotify.com/documentation/web-api/tutorials/code-flow
const exchangeSpotifyAuthToken = async (
  code: string,
): Promise<AccessTokenReponse> => {
  const searchParams = new URLSearchParams();
  searchParams.append("code", code);
  const response = await axiosInstance.post(
    "/spotify-auth?" + searchParams.toString(),
  );
  if (response.status !== 204) {
    // TODO: return whole response object instead of response.data, handle errors in component instead?
    throw new Error("Login attempt failed, please try again...");
  }
  return response.data;
};

export default exchangeSpotifyAuthToken;
