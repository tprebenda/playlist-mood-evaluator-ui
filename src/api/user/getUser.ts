import axios from "axios";
import { API_URL_BASE } from "../../constants";

interface UserProfileResponse {
  display_name: string;
}

// TODO:
// add interface for response data
// add error handling for failed requests (401 unauthorized) - call refresh token and retry
const getUser = async (): Promise<UserProfileResponse> => {
  const response = await axios.get(`${API_URL_BASE}/user`, {
    withCredentials: true,
  });
  return response.data;
};

export default getUser;
