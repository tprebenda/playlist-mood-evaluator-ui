import { axiosInstance } from "../axiosInstance";

interface UserProfileResponse {
  display_name: string;
}

// TODO:
// add error handling for failed requests (401 unauthorized) - call refresh token and retry
const getUser = async (): Promise<UserProfileResponse> => {
  const response = await axiosInstance.get("/user");
  return response.data;
};

export default getUser;
