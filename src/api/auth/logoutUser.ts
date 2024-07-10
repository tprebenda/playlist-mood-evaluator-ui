import { axiosInstance } from "../axiosInstance";

// Logs out of user session on the backend
const logoutUserSession = async (): Promise<void> => {
  const response = await axiosInstance.post("/logout");
  if (response.status !== 204) {
    // TODO: return whole response object instead of response.data, handle errors in component instead?
    throw new Error("Logout failed...");
  }
};

export default logoutUserSession;
