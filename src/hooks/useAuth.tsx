import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import exchangeSpotifyAuthToken from "../api/auth/getSpotifyAuth";
import {
  initiateOAuthFlow,
  logoutOfSpotify,
  getAuthCodeFromArgs,
  STATE_KEY,
} from "../helpers/auth/authHelpers";

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider wrapper that handles OAuth with Spotify and generates access token on the backend
// Component reference: https://blog.logrocket.com/authentication-react-router-v6/
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  // used to ensure useEffect (below) doesn't run twice due to React Strict mode
  // https://taig.medium.com/prevent-react-from-triggering-useeffect-twice-307a475714d7
  const initialized = useRef(false);

  // Used for retrieving 'code' sent from Spotify OAuth server in URL
  // Sends to API backend for token exchange
  useEffect(() => {
    const authenticateViaSpotify = async (code: string) => {
      await exchangeSpotifyAuthToken(code);
      setIsAuthenticated(true);
      navigate("/home");
    };

    // Don't check for callback if unauthenticated, or if component has already rendered
    if (isAuthenticated || initialized.current) return;

    // if we're in a callback, retrieve the auth code and send to backend for token exchange
    const args = new URLSearchParams(window.location.search);
    const code = getAuthCodeFromArgs(args);
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
    return () => {
      initialized.current = true;
    };
  }, [isAuthenticated, navigate]);

  // redirects to Spotify Auth page, to generate code for Auth Code flow. The useEffect hook
  // (above) will catch the callback and complete the login
  const login = () => {
    initiateOAuthFlow();
  };

  // Logs out the user of Spotify and from local session
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
