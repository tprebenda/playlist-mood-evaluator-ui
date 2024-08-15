import Box from "@mui/material/Box";
import AppLogo from "../../common/appLogo/AppLogo";
import { spaceNightSkyWallpaper } from "../../assets/wallpapers";
import BackgroundImage from "../../common/backgroundImage/BackgroundImage";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate, useRouteError } from "react-router-dom";
import { AxiosError, isAxiosError } from "axios";
import { useEffect, useState } from "react";

const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (!isAxiosError(error)) {
      console.error(error);
      setErrorMessage(`Error from unknown origin: ${error}`);
      return;
    }
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(axiosError.response);
      const message =
        axiosError.response.status === 401
          ? "Spotify access token expired."
          : `${axiosError.response.status}: ${axiosError.response.statusText}}`;
      setErrorMessage(message);
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
      setErrorMessage(`Error from unknown origin: ${error}`);
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
            Sorry! The app crashed due to the following error:
          </Typography>
          <Typography gutterBottom>"{errorMessage}"</Typography>
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
