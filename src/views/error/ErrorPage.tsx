import Box from "@mui/material/Box";
import AppLogo from "../../common/appLogo/AppLogo";
import { spaceNightSkyWallpaper } from "../../assets/wallpapers";
import BackgroundImage from "../../common/backgroundImage/BackgroundImage";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate, useRouteError } from "react-router-dom";
import { AxiosError, isAxiosError } from "axios";
import { useEffect, useState } from "react";

// Todo: REMOVE??
const UNREGISTERED_USER_ERROR = JSON.stringify({
  detail: "User not registered",
});
const UNREGISTERED_USER_MESSAGE = `[09/25/2024]: The app is still awaiting approval from Spotify for \
a quota extension, so users must be manually registered at this time. Please email 'tprebenda@gmail.com' \
with your Spotify account email and I will add you so you can test my app!`;

const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (!isAxiosError(error)) {
      console.error(error);
      if (error instanceof Error && error.message === "access_denied") {
        setErrorMessage(`Auth request cancelled by user.`);
      } else {
        setErrorMessage(`Error from unknown origin: ${error}`);
      }
      return;
    }
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(axiosError.response);

      if (
        JSON.stringify(axiosError.response.data) === UNREGISTERED_USER_ERROR
      ) {
        setErrorMessage(UNREGISTERED_USER_MESSAGE);
      } else if (axiosError.response.status === 401) {
        setErrorMessage("Spotify access token expired, please login again.");
      } else {
        setErrorMessage(
          `${axiosError.response.status}: ${axiosError.response.statusText}`
        );
      }
    } else if (axiosError.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.error(axiosError.request);
      const message = `${axiosError.request.status}: ${axiosError.request.statusText || "No response from Evaluator API"}`;
      setErrorMessage(message);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error", axiosError.message);
      setErrorMessage(`Error while generating Auth request: ${error}`);
    }
  }, [error]);

  return (
    <BackgroundImage imageUrl={spaceNightSkyWallpaper}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="20%"
        sx={{
          background: "black",
          borderRadius: "10%",
          border: "solid 1px",
        }}
      >
        <AppLogo />
        <Box width="70%" whiteSpace="pre-wrap" textAlign="center" mb={5}>
          <Typography gutterBottom>
            Sorry! The app shut down due to the following error:
          </Typography>
          <Typography gutterBottom color="green">
            "{errorMessage}"
          </Typography>
          <Typography gutterBottom mb={2}>
            Please log in again by clicking the button below:
          </Typography>
          <Button
            variant="outlined"
            style={{ color: "green" }}
            onClick={() => navigate("/login", { replace: true })}
          >
            Log In
          </Button>
        </Box>
      </Box>
    </BackgroundImage>
  );
};

export default ErrorPage;
