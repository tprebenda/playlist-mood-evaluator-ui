import { useEffect } from "react";
import {
  generateRandomString,
  sha256,
  base64encode,
} from "../helpers/auth/authHelpers";
import { useNavigate } from "react-router-dom";
import exchangeSpotifyAuthToken from "../api/auth/getSpotifyAuth";

// Used for Spotify OAuth Code flow:
// https://developer.spotify.com/documentation/web-api/tutorials/code-flow
const CLIENT_ID = "5b9ee404632b45f6a6d6cc35824554a6";

// user-read-private user-read-email: required to get userId
// playlist-read-private playlist-read-collaborative: required to view playlists
const SCOPE =
  "playlist-read-private playlist-read-collaborative user-read-private user-read-email";
const REDIRECT_URI = "http://localhost:3000/login/callback";
const OAUTH_AUTHORIZE_URL = "https://accounts.spotify.com/authorize";
const STATE_KEY_LENGTH = 16;
const CODE_VERIFIER_LENGTH = 64;

// UseSpotifyAuth: contains logic for Spotify OAuth2.0 Code Flow
// - Checks browser URL for auth codes in URL params, and initiates token exchange by making
//    request to API backend
// - initiateOAuthFlow(): sets browser window URL to Spotify OAuth request URL
const UseSpotifyAuth = () => {
  const navigate = useNavigate();

  // Generates code challenge for Spotify OAuth2.0 authorization code flow
  // https://developer.spotify.com/documentation/web-api/tutorials/code-flow
  // The actual token exchange occurs server-side, to completely avoid token maintenance on the
  // frontend (see useEffect hook below)
  const initiateOAuthFlow = async () => {
    const codeVerifier = generateRandomString(CODE_VERIFIER_LENGTH);
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

    const spotifyUserAuthUrl = new URL(OAUTH_AUTHORIZE_URL);
    spotifyUserAuthUrl.search = new URLSearchParams(params).toString();
    // Don't use navigate() from react router, since it is not designed for external navigation
    window.location.href = spotifyUserAuthUrl.toString();
  };

  // Used for retrieving 'code' sent from Spotify OAuth server in URL
  // Sends to API backend for token exchange
  useEffect(() => {
    const initiateAccessTokenExchange = async (code: string) => {
      const accessTokenRequest = await exchangeSpotifyAuthToken(code);
      if (!accessTokenRequest["tokenSaved"]) {
        console.warn("Access token exchange failed, NOT authenticated...");
        navigate("/login");
      }
    };

    const args = new URLSearchParams(window.location.search);
    const error = args.get("error");
    if (error) {
      console.warn(error);
    }

    // If we find a code in URL, we're in a callback, do a token exchange
    const code = args.get("code");
    if (code) {
      initiateAccessTokenExchange(code);
      navigate("/home");
    }
  }, [navigate]);

  return { initiateOAuthFlow };
};

export default UseSpotifyAuth;
