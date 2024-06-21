import axios from "axios";
import { API_URL_BASE } from "../../constants";

interface AccessTokenReponse {
  tokenSaved: boolean;
}

// This will initiate the User Auth for the web API backend
const initiateUserAuthForApi = async (
  code: string,
): Promise<AccessTokenReponse> => {
  const searchParams = new URLSearchParams();
  searchParams.append("code", code);
  const response = await axios.get(
    `${API_URL_BASE}/callback?` + searchParams.toString(),
  );
  return response.data;
};

export default initiateUserAuthForApi;
