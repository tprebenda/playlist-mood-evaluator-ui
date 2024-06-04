import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// TODO: move login component from App.tsx to here!
// Then invoke useSpotifyAuth for the actual queries (invoked in handleClick())
// Then return to home page? (Wrap <App /> in this auth component???)
const SpotifyAuth = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [isLoggedin, setIsLoggedin] = useState(false);

  const handleClick = () => {};

  useEffect(() => {
    // TODO: use cookies instead of local storage?
    let token = window.localStorage.getItem("token");
    if (!token) {
      // Ex: ?code=NApCCg..BkWtQ&state=34fFs29kd09
      const windowLocationSearch = window.location.search;
      if (windowLocationSearch.indexOf("?code=") > -1) {
        const redirectParams = windowLocationSearch.split("?code=")[1];
        const authCode = redirectParams.split("&")[0];
        const state = redirectParams.split("&")[1].split("state=")[1];

        token = "TODO";
        window.location.hash = "";
        window.localStorage.setItem("token", token);
        setToken(token);
      } else {
        console.warn(
          `NO CODE PRESENT IN OAUTH2.0 REDIRECT URI: ${window.location.href}`
        );
      }
    }
  }, []);

  useEffect(() => {
    if (token) {
      navigate("/TODO");
    }
  }, [token, navigate]);
};

export default SpotifyAuth;
