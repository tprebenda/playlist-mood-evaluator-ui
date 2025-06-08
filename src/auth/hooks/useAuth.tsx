import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import logoutUserSession from "../../api/auth/logoutUser";
import {
  initiateOAuthFlow,
  triggerSpotifyLogout,
} from "../../helpers/auth/authHelpers";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  login: () => void;
  endUserSession: () => Promise<void>;
  logoutOfSpotify: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const login = () => {
    initiateOAuthFlow(); // kicks off the Spotify OAuth redirect
  };

  const endUserSession = useCallback(async () => {
    await logoutUserSession();
    sessionStorage.clear();
    setIsAuthenticated(false);
    navigate("/login", { replace: true });
  }, [navigate]);

  const logoutOfSpotify = useCallback(async () => {
    triggerSpotifyLogout();
    sessionStorage.clear();
    setIsAuthenticated(false);
    navigate("/login", { replace: true });
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        login,
        endUserSession,
        logoutOfSpotify,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
