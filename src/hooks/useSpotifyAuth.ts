import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import exchangeSpotifyAuthToken from "../api/auth/getSpotifyAuth";

// UseSpotifyAuth: contains logic for Spotify OAuth2.0 Code Flow
// - Checks browser URL for auth codes in URL params, and initiates token exchange by making
//    request to API backend
// Returns:
// - logout(): for clearing
const UseSpotifyAuth = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  const logout = () => {
    setAuthenticated(false);
  };

  // Used for retrieving 'code' sent from Spotify OAuth server in URL
  // Sends to API backend for token exchange
  useEffect(() => {
    const authenticateViaSpotify = async (code: string) => {
      const tokenResponse = await exchangeSpotifyAuthToken(code);
      if (!tokenResponse["tokenSaved"]) {
        console.warn("Access token exchange failed, NOT authenticated...");
        navigate("/login");
      }
      setAuthenticated(true);
      // get JWT token from tokenResponse
      // STORE IN HTTP-ONLY COOKIE: only sent to server, not displayed in javascript (secure)
      // axios.interceptors.request.use((config) => {
      //   const authToken = localStorage.getItem("authToken");
      // (use null if not present)
      // const authTokenHeader = authToken ? `Bearer ${authToken}` : null;
      // config.headers.Authorization = authTokenHeader;
      //   return config;
      // });
    };

    if (authenticated) return;

    const args = new URLSearchParams(window.location.search);
    const error = args.get("error");
    if (error) {
      console.warn(error);
    }
    // If we find a code in URL, we're in a callback, do a token exchange
    const code = args.get("code");
    if (code) {
      authenticateViaSpotify(code);
    } else {
      // force login if trying to reach /home without being authenticated and without code from URL
      navigate("/login");
    }
  }, [navigate, authenticated]);

  return { logout };
};

export default UseSpotifyAuth;
