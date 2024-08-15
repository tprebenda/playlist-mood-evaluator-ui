import { axiosInstance } from "../axiosInstance";

interface UserProfileResponse {
  display_name: string;
}

const getUser = async (): Promise<UserProfileResponse> => {
  const response = await axiosInstance.get("/user");
  return response.data;
};

export default getUser;
