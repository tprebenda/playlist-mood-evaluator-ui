import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      await axiosInstance.post("/logout");
    },
  });
};
