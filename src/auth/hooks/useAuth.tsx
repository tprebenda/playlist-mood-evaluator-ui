import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  initiateOAuthFlow,
  triggerSpotifyLogout,
} from "../../helpers/auth/authHelpers";
import { useLogout } from "../../api/hooks/useLogout";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  login: () => void;
  endUserSession: () => Promise<void>;
  logoutOfSpotify: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const { mutateAsync: logout } = useLogout();

  const login = () => {
    // kicks off the Spotify OAuth redirect
    initiateOAuthFlow();
  };

  const endUserSession = useCallback(async () => {
    await logout();
    setIsAuthenticated(false);
    navigate("/login", { replace: true });
  }, [navigate, logout]);

  const logoutOfSpotify = useCallback(() => {
    triggerSpotifyLogout();
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
