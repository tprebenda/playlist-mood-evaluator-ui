import axios from "axios";
import { API_URL_BASE } from "../../constants";

interface AccessTokenReponse {
  tokenSaved: boolean;
}

// This will initiate the User Auth for the web API backend
// todo: add interface for response data
const exchangeSpotifyAuthToken = async (
  code: string,
): Promise<AccessTokenReponse> => {
  const searchParams = new URLSearchParams();
  searchParams.append("code", code);
  const response = await axios.post(
    `${API_URL_BASE}/spotify-token?` + searchParams.toString(),
  );
  return response.data;
};

export default exchangeSpotifyAuthToken;
