import axios from "axios";

const _API_URL = "http://127.0.0.1:8000";

interface UserProfileResponse {
  display_name: string;
  id: string;
}

// TODO:
// add error handling for failed requests (401 unauthorized) - call refresh token and retry
const getUser = async (accessToken: string): Promise<UserProfileResponse> => {
  const response = await axios.get(`${_API_URL}/whoami`, {
    params: { auth_token: accessToken },
  });
  console.log(response.data);
  return response.data;
};

export default getUser;
