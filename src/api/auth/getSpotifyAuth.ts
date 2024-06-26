import axios from "axios";
import { API_URL_BASE } from "../../constants";

interface AccessTokenReponse {
  tokenSaved: boolean;
}
// TODO: make axios instance class with { withCredentials: true } (needed for http only cookies)

// todo: add interface for response data
// Initiates the OAuth Access Token exchange on the API backend with provided Auth Code
// https://developer.spotify.com/documentation/web-api/tutorials/code-flow
const exchangeSpotifyAuthToken = async (
  code: string,
): Promise<AccessTokenReponse> => {
  const searchParams = new URLSearchParams();
  searchParams.append("code", code);
  const response = await axios.post(
    `${API_URL_BASE}/spotify-auth?` + searchParams.toString(),
    { withCredentials: true },
  );
  return response.data;
};

export default exchangeSpotifyAuthToken;
