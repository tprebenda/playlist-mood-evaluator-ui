import { useEffect, useState } from "react";
import exchangeSpotifyAuthToken from "../api/auth/getSpotifyAuth";
import { STATE_KEY } from "../helpers/auth/authHelpers";

/*
UseSpotifyAuth: contains logic for Spotify OAuth2.0 Code Flow
  - Checks browser URL for auth code in URL params, and initiates token exchange by making
    request to API backend
Returns:
  - logout(): for clearing
*/
const UseSpotifyAuth = () => {
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
        return;
      }
      setAuthenticated(true);
    };

    if (authenticated) return;
    const args = new URLSearchParams(window.location.search);
    const error = args.get("error");
    if (error) {
      throw new Error(error);
    }
    // If we find a code in URL, we're in a callback, do a token exchange
    const code = args.get("code");
    if (code) {
      // Confirm state matches before requesting access token
      const state = args.get("state");
      const storedState = localStorage.getItem(STATE_KEY);
      if (!state || state !== storedState) {
        throw new Error(
          "Returned state from Auth request does not match locally-generated state...",
        );
      }
      authenticateViaSpotify(code);
    }
  }, [authenticated]);

  return { authenticated, logout };
};

export default UseSpotifyAuth;
