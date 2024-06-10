import { useEffect, useState } from "react";
import { AccessTokenResponse } from "../interface";
import {
  generateRandomString,
  sha256,
  base64encode,
} from "../helpers/auth/authHelpers";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Used for Spotify OAuth flow
// https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow
const CLIENT_ID = "5b9ee404632b45f6a6d6cc35824554a6";
const SCOPE =
  "playlist-read-private playlist-read-collaborative user-library-read";

const REDIRECT_URI = "http://localhost:3000/login/callback";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const STATE_KEY_LENGTH = 16;
const HEADERS = {
  "Content-Type": "application/x-www-form-urlencoded",
};
const DUD_TOKEN: AccessTokenResponse = {
  access_token: "",
  token_type: "",
  expires_in: 0,
};
// Contains logic for Spotify OAuth2.0 with PCKE, returning:
// - access_token
// - requestUserAuth()
const UseSpotifyAuth = () => {
  const navigate = useNavigate();
  // Pull from local storage if present
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token") || "",
  );

  // Loads access token info into local storage for later usage
  // TODO: STOP USING LOCAL STORAGE (SECURITY RISK)?
  // https://stackoverflow.com/a/57826596/11972470
  const saveToken = (response: AccessTokenResponse) => {
    const { access_token, refresh_token, expires_in } = response;
    localStorage.setItem("accessToken", access_token || "");
    localStorage.setItem("refreshToken", refresh_token || "");
    localStorage.setItem("expiresIn", expires_in.toString());

    const now = new Date();
    const expiry = new Date(now.getTime() + expires_in * 1000);
    localStorage.setItem("expires", expiry.toString());
  };

  // Generates code challenge for Spotify OAuth2.0 code flow with PKCE
  // Take directly from official Spotify docs:
  // https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow
  const requestUserAuth = async () => {
    const codeVerifier = generateRandomString(64);
    window.localStorage.setItem("codeVerifier", codeVerifier);

    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);
    const state = generateRandomString(STATE_KEY_LENGTH);

    const params = {
      response_type: "code",
      client_id: CLIENT_ID,
      scope: SCOPE,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
      redirect_uri: REDIRECT_URI,
      state: state,
    };

    const spotifyUserAuthUrl = new URL(AUTH_ENDPOINT);
    spotifyUserAuthUrl.search = new URLSearchParams(params).toString();
    // Don't use navigate() from react router, since it is not designed for external navigation
    window.location.href = spotifyUserAuthUrl.toString();
  };

  const getToken = async (code: string): Promise<AccessTokenResponse> => {
    const codeVerifier = localStorage.getItem("codeVerifier");
    if (!codeVerifier) {
      console.warn("No code verifier found in local storage...");
      return DUD_TOKEN;
    }

    const params = {
      client_id: CLIENT_ID,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: REDIRECT_URI,
      code_verifier: codeVerifier,
    };
    const response = await axios.post(TOKEN_ENDPOINT, params, {
      headers: HEADERS,
    });
    return response.data;
  };

  // TODO: do I need this?
  // async function refreshToken() {
  //   const refreshToken = localStorage.getItem("refreshToken");
  //   if (!refreshToken) {
  //     console.warn("NO REFRESH TOKEN FOUND IN LOCAL STORAGE");
  //     return DUD_TOKEN;
  //   }

  //   const params = {
  //     client_id: CLIENT_ID,
  //     grant_type: "refresh_token",
  //     refresh_token: refreshToken,
  //   };
  //   const response = await axios.post(TOKEN_ENDPOINT, params, {
  //     headers: HEADERS,
  //   });
  //   return response.data;
  // }

  // Main logic for authenticating
  useEffect(() => {
    const retrieveAuthToken = async (code: string) => {
      const authToken = await getToken(code);
      saveToken(authToken);
      setAccessToken(authToken.access_token);
    };

    const args = new URLSearchParams(window.location.search);
    const error = args.get("error");
    if (error) {
      console.warn(error);
    }

    const code = args.get("code");
    // If we find a code, we're in a callback, do a token exchange
    if (code) {
      retrieveAuthToken(code);
      // TODO: handle failure in retrieving token instead of just navigating to /home ?
      navigate("/home");
    }
  }, [navigate]);

  // TODO: return refreshToken()
  // https://github.com/spotify/web-api-examples/blob/master/authorization/authorization_code_pkce/public/app.js#L116
  return { accessToken, requestUserAuth };
};

export default UseSpotifyAuth;
