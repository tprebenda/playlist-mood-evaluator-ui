import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import exchangeSpotifyAuthToken from "../api/auth/getSpotifyAuth";
import { logoutOfSpotify, STATE_KEY } from "../helpers/auth/authHelpers";
import initiateOAuthFlow from "../helpers/auth/authHelpers";

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  // Used for retrieving 'code' sent from Spotify OAuth server in URL
  // Sends to API backend for token exchange
  useEffect(() => {
    const authenticateViaSpotify = async (code: string) => {
      const tokenResponse = await exchangeSpotifyAuthToken(code);
      if (!tokenResponse["tokenSaved"]) {
        console.warn("Access token exchange failed, NOT authenticated...");
        return;
      }
      setIsAuthenticated(true);
      navigate("/home");
    };

    if (isAuthenticated) return;
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
          "Returned state from Auth request does not match locally-generated state..."
        );
      }
      authenticateViaSpotify(code);
    }
  }, [isAuthenticated, navigate]);

  // redirects to Spotify Auth page, to generate code for Auth Code flow. The useEffect hook
  // (above) will catch the callback and complete the login
  const login = () => {
    initiateOAuthFlow();
  };

  // Logs out the user from Spotify
  const logout = useCallback(() => {
    setIsAuthenticated(false);
    // TODO: hit backend /logout endpoint
    logoutOfSpotify();
    navigate("/login", { replace: true });
  }, [navigate]);

  const value = useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
    }),
    [isAuthenticated, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext) as AuthContextType;
};
