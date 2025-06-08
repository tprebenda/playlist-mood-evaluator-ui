import { useState, useEffect, useRef } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";
import CircularProgressBar from "../../common/circularProgressBar/CircularProgressBar";
import { STATE_KEY } from "../../helpers/auth/authHelpers";
import exchangeSpotifyAuthToken from "../../api/auth/loginUser";
import { useAuth } from "../hooks/useAuth";

export function OAuthCallback() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const { showBoundary } = useErrorBoundary();
  const codeSent = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get("error");
    if (error) {
      showBoundary(new Error(error));
    }

    let code = params.get("code");
    // Check state key to prevent CSRF attacks
    const returnedState = params.get("state");
    const expectedState = localStorage.getItem(STATE_KEY);
    if (!code || returnedState !== expectedState) {
      showBoundary(
        new Error("Invalid state, or missing code. Canceling auth...")
      );
      return;
    }

    if (!codeSent.current) {
      // useRef to ensure the effect only triggers once (despite React Strict mode)
      codeSent.current = true;
      (async () => {
        try {
          await exchangeSpotifyAuthToken(code!);
          setIsAuthenticated(true);
          navigate("/home", { replace: true });
        } catch (e: any) {
          showBoundary(e);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [navigate, setIsAuthenticated, showBoundary]);

  if (loading) return <CircularProgressBar text="Authenticating user..." />;
  return null; // Error UI handled by boundary
}
