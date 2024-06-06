import { useEffect, useState } from "react";
import { TokenResponse } from "../interface";
import { getToken } from "../helpers/auth/authHelpers";
import { useNavigate } from "react-router-dom";

// TODO: move login component from App.tsx to here!
// Then invoke useSpotifyAuth for the actual queries (invoked in handleClick())
// Then return to home page? (Wrap <App /> in this auth component???)
const UseSpotifyAuth = () => {
  const navigate = useNavigate();
  const access_token = localStorage.getItem('access_token');
  const [accessToken, setAccessToken] = useState(access_token || "");

  const saveToken = (response: TokenResponse) => {
    const { access_token, refresh_token, expires_in } = response;
    localStorage.setItem("access_token", access_token || "");
    localStorage.setItem("refresh_token", refresh_token || "");
    localStorage.setItem("expires_in", expires_in.toString());
  
    const now = new Date();
    const expiry = new Date(now.getTime() + expires_in * 1000);
    localStorage.setItem("expires", expiry.toString());
  }
  

  useEffect(() => {
    const retrieveAuthToken = async(code: string) => {
      const authToken: TokenResponse = await getToken(code);
      saveToken(authToken);
      setAccessToken(authToken.access_token);
    };

    const args = new URLSearchParams(window.location.search);
    const error = args.get('error');
    if (error) {
      console.warn(error)
    }

    const code = args.get('code');
    // If we find a code, we're in a callback, do a token exchange
    if (code) {
      retrieveAuthToken(code);
      navigate("/login")
    }
  }, [navigate]);

  // TODO: return refreshToken()
  // https://github.com/spotify/web-api-examples/blob/master/authorization/authorization_code_pkce/public/app.js#L116
  return { accessToken };
};

export default UseSpotifyAuth;