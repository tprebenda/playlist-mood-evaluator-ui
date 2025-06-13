import { useEffect, useRef } from "react";
import { useErrorBoundary } from "react-error-boundary";
import CircularProgressBar from "../../common/circularProgressBar/CircularProgressBar";
import { STATE_KEY } from "../../helpers/auth/authHelpers";
import { useAuthMutation } from "../mutations/useAuthMutation";

export function OAuthCallback() {
  const { showBoundary } = useErrorBoundary();
  const { mutateAsync: exchangeToken } = useAuthMutation();
  const hasRun = useRef(false);

  useEffect(() => {
    const handleTokenExchange = async () => {
      // Prevent double API call from React 18 Strict Mode (dev only)
      if (hasRun.current) return;
      hasRun.current = true;

      const params = new URLSearchParams(window.location.search);
      const error = params.get("error");
      if (error) {
        showBoundary(new Error(error));
        return;
      }

      const code = params.get("code");
      const returnedState = params.get("state");
      const expectedState = localStorage.getItem(STATE_KEY);

      if (!code || returnedState !== expectedState) {
        showBoundary(
          new Error("Invalid state, or missing code. Canceling auth...")
        );
        return;
      }

      await exchangeToken(code);
    };

    handleTokenExchange(); // ✅ only fires once
  }, [exchangeToken, showBoundary]);

  return <CircularProgressBar text="Authenticating user..." />;
}
