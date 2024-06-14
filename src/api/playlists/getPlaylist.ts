import axios from "axios";

const _API_URL = "http://127.0.0.1:8000";

// TODO:
// MOVE SOMEWHERE ELSE (RESTRUCTURE FILE TREE?)?
// USE PYDANTIC MODELS?
// add error handling for failed requests (401 unauthorized) - call refresh token and retry
const getPlaylists = async (accessToken: string, userId: string) => {
  const response = await axios.get(`${_API_URL}/playlists`, {
    params: { auth_token: accessToken, user_id: userId },
  });
  return response.data;
};

export default getPlaylists;
