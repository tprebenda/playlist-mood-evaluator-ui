import { axiosInstance } from "../axiosInstance";

// Logs out of user session on the backend
const logoutUserSession = async (): Promise<void> => {
  await axiosInstance.post("/logout");
};

export default logoutUserSession;
