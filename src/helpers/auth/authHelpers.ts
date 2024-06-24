// Used for Spotify OAuth Code flow:
// https://developer.spotify.com/documentation/web-api/tutorials/code-flow
const CLIENT_ID = "5b9ee404632b45f6a6d6cc35824554a6";

// user-read-private user-read-email: required to get userId
// playlist-read-private playlist-read-collaborative: required to view playlists
const SCOPE =
  "playlist-read-private playlist-read-collaborative user-read-private user-read-email";
const REDIRECT_URI = "http://localhost:3000/callback";
const OAUTH_AUTHORIZE_URL = "https://accounts.spotify.com/authorize";
const STATE_KEY_LENGTH = 16;
const CODE_VERIFIER_LENGTH = 64;

// Sends user to Spotify Auth endpoint to initiate Spotify OAuth2.0 authorization code flow
// Generates code challenge and sends to backend for official token exchange. This avoids
// token maintenance on the frontend, improving security.
// https://developer.spotify.com/documentation/web-api/tutorials/code-flow
export const initiateOAuthFlow = async () => {
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

// Utility functions related to Spotify Authentication
const generateRandomString = (length: number) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

const sha256 = async (plain: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
};

const base64encode = (input: ArrayBuffer) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};
