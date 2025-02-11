import { axiosInstance } from "../axiosInstance";

interface UserProfileResponse {
  display_name: string;
}

// TODO: currently not in use, because Spotify rejected my extension request for "user-read-private" and
// "user-read-email"
const getUser = async (): Promise<UserProfileResponse> => {
  const response = await axiosInstance.get("/user");
  return response.data;
};

export default getUser;
