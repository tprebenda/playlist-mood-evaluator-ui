import { axiosInstance } from "../axiosInstance";

// TODO:
// add error handling for failed requests (401 unauthorized) - call refresh token and retry
// Logs out of user session on the backend
const logoutUserSession = async (): Promise<void> => {
  const response = await axiosInstance.post("/logout");
  if (response.status !== 204) {
    // TODO: return whole response object instead of response.data, handle errors in component instead?
    throw new Error("Logout failed...");
  }
};

export default logoutUserSession;
