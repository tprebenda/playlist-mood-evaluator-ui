import { useEffect } from "react";
import { AccessTokenResponse } from "../interface";
import {
  generateRandomString,
  sha256,
  base64encode,
} from "../helpers/auth/authHelpers";
import { useNavigate } from "react-router-dom";
import initiateUserAuthForApi from "../api/login/getLogin";

// Used for Spotify OAuth flow
// https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow
const CLIENT_ID = "5b9ee404632b45f6a6d6cc35824554a6";

// user-read-private user-read-email: required to get userId
// playlist-read-private playlist-read-collaborative: required to view playlists
const SCOPE =
  "playlist-read-private playlist-read-collaborative user-read-private user-read-email";

const REDIRECT_URI = "http://localhost:3000/login/callback";
const OAUTH_AUTHORIZE_URL = "https://accounts.spotify.com/authorize";
const STATE_KEY_LENGTH = 16;

// Contains logic for Spotify OAuth2.0 with PCKE, returning:
// - requestUserAuth()
const UseSpotifyAuth = () => {
  const navigate = useNavigate();

  // Generates code challenge for Spotify OAuth2.0 authorization code flow
  // https://developer.spotify.com/documentation/web-api/tutorials/code-flow
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

    const spotifyUserAuthUrl = new URL(OAUTH_AUTHORIZE_URL);
    spotifyUserAuthUrl.search = new URLSearchParams(params).toString();
    // Don't use navigate() from react router, since it is not designed for external navigation
    window.location.href = spotifyUserAuthUrl.toString();
  };

  // Main logic for authenticating
  useEffect(() => {
    const initiateAccessTokenExchange = async (code: string) => {
      const accessTokenRequest = await initiateUserAuthForApi(code);
      if (!accessTokenRequest["tokenSaved"]) {
        console.warn("Access token was not found");
      }
    };

    const args = new URLSearchParams(window.location.search);
    const error = args.get("error");
    if (error) {
      console.warn(error);
    }

    const code = args.get("code");
    // If we find a code, we're in a callback, do a token exchange
    if (code) {
      initiateAccessTokenExchange(code);
      navigate("/home");
    }
  }, [navigate]);

  return { requestUserAuth };
};

export default UseSpotifyAuth;
