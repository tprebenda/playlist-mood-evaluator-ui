// Used for Spotify OAuth Code flow:
// https://developer.spotify.com/documentation/web-api/tutorials/code-flow
const CLIENT_ID = "5b9ee404632b45f6a6d6cc35824554a6";

// user-read-private user-read-email: required to get userId
// playlist-read-private playlist-read-collaborative: required to view playlists
const SCOPE =
  "playlist-read-private playlist-read-collaborative user-read-private user-read-email";
const REDIRECT_URI =
  window.location.hostname === "127.0.0.1"
    ? "http://127.0.0.1:3000/callback"
    : "https://playlistmoodevaluator.com/callback";
const OAUTH_AUTHORIZE_URL = "https://accounts.spotify.com/authorize";
const STATE_LENGTH = 16;
export const STATE_KEY = "auth-request-state";

// Sends user to Spotify Auth endpoint to initiate Spotify OAuth2.0 authorization code flow
// Generates code challenge and sends to backend for official token exchange. This avoids
// token maintenance on the frontend, improving security.
// https://developer.spotify.com/documentation/web-api/tutorials/code-flow
export const initiateOAuthFlow = () => {
  const state = generateRandomString(STATE_LENGTH);
  localStorage.setItem(STATE_KEY, state);

  const params = {
    response_type: "code",
    client_id: CLIENT_ID,
    scope: SCOPE,
    redirect_uri: REDIRECT_URI,
    state: state,
    show_dialog: "true",
  };

  const spotifyUserAuthUrl = new URL(OAUTH_AUTHORIZE_URL);
  spotifyUserAuthUrl.search = new URLSearchParams(params).toString();
  // Don't use navigate() from react router, since it is not designed for external navigation
  window.location.href = spotifyUserAuthUrl.toString();
};

// Utility functions related to Spotify Authentication
const generateRandomString = (length: number = STATE_LENGTH) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

// Opens popup to manually logout of Spotify
// https://stackoverflow.com/a/50738483/11972470
export const logoutOfSpotify = () => {
  // Opens popup to show user was logged out
  const spotifyLogoutUrl = "https://accounts.spotify.com/en/logout";
  const spotifyLogoutWindow = window.open(
    spotifyLogoutUrl,
    "Spotify Logout",
    "width=700,height=500,top=40,left=40",
  );
  setTimeout(() => spotifyLogoutWindow?.close(), 2000);
};

// Throws error if Spotify Auth endpoint returns one, otherwise returns "code" argument
export const getAuthCodeFromArgs = (args: URLSearchParams) => {
  const error = args.get("error");
  if (error) {
    throw new Error(error);
  }
  return args.get("code");
};
