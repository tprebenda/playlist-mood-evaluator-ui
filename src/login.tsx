import { useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { green } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import SpotifyLogoIcon from "./common/SpotifyLogoIcon";

import { requestUserAuth } from "./helpers/auth/authHelpers";
import UseSpotifyAuth from "./hooks/useSpotifyAuth";
import { useNavigate } from "react-router-dom";

const welcomeMessage =
  "Hello!\nThe Spotify Mood Playlist Evaluator app will require access " +
  "to your Spotify playlists to view song titles. This requires you to " +
  "authenticate your Spotify account.\nPlease sign in to Spotify here:";

// TODO: move to components
export default function OAuthCard() {
  const navigate = useNavigate();
  const { accessToken } = UseSpotifyAuth();

  useEffect(() => {
    if (accessToken) {
      navigate("/home");
    }
  }, [accessToken, navigate]);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      alignContent="center"
      minHeight="100vh"
    >
      <Card sx={{ maxWidth: 400 }}>
        <CardContent
          sx={{
            marginBottom: "-15px",
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            color={green[800]}
            fontFamily={"sans-serif"}
          >
            Authenticate with Spotify
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ whiteSpace: "pre-line" }}
          >
            {welcomeMessage}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex" }}>
          <Button size="small" onClick={() => requestUserAuth()}>
            <SpotifyLogoIcon />
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
