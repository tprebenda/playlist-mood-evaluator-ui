import axios from "axios";

// Helper functions, copied from Spotify docs:
// https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow
const CLIENT_ID = "5b9ee404632b45f6a6d6cc35824554a6";
const SCOPE =
  "playlist-read-private,playist-read-collaborative,user-library-read";

const REDIRECT_URI = "http://localhost:3000/callback";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const STATE_KEY_LENGTH = 16;

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

// Generates code challenge for Spotify OAuth2.0 code flow with PKCE
// Take directly from official Spotify docs:
// https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow
export const requestUserAuth = async () => {
  const codeVerifier = generateRandomString(64);
  window.localStorage.setItem("code_verifier", codeVerifier);

  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);
  const state = generateRandomString(STATE_KEY_LENGTH);

  const params = {
    response_type: "code",
    client_id: CLIENT_ID,
    // scope: SCOPE,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    redirect_uri: REDIRECT_URI,
    state: state,
  };

  const spotifyUserAuthUrl = new URL(AUTH_ENDPOINT);
  spotifyUserAuthUrl.search = new URLSearchParams(params).toString();
  window.location.href = spotifyUserAuthUrl.toString();
};

export const getToken = async (code: string) => {
  const codeVerifier = localStorage.getItem('code_verifier');
  if (!codeVerifier) {
    console.warn('No code verifier found in local storage...')
    return "";
  }
  
  const headers = {
      'Content-Type':'application/x-www-form-urlencoded',
      // 'Authorization': `Basic <base64 encoded client_id:client_secret>`
    }
  const params =  {
    client_id: CLIENT_ID,
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: REDIRECT_URI,
    code_verifier: codeVerifier,
  };
  const response = await axios.post(TOKEN_ENDPOINT, params, {
    headers: headers
  });
  return response.data;
}
// TODO: https://github.com/spotify/web-api-examples/blob/master/authorization/authorization_code_pkce/public/app.js#L116
// 
// async function refreshToken() {
//   const response = await fetch(tokenEndpoint, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     body: new URLSearchParams({
//       client_id: clientId,
//       grant_type: 'refresh_token',
//       refresh_token: currentToken.refresh_token
//     }),
//   });

//   return await response.json();
// }