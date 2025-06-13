import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useErrorBoundary } from "react-error-boundary";

const exchangeSpotifyAuthToken = async (code: string): Promise<void> => {
  const searchParams = new URLSearchParams();
  searchParams.append("code", code);
  await axiosInstance.post("/spotify-auth?" + searchParams.toString());
};

export const useAuthMutation = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const { showBoundary } = useErrorBoundary();

  return useMutation({
    mutationFn: exchangeSpotifyAuthToken,
    onSuccess: async () => {
      setIsAuthenticated(true);
      navigate("/home", { replace: true });
    },
    onError: (error) => {
      showBoundary(error);
    },
  });
};
