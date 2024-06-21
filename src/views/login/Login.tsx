import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { green } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import SpotifyLogoIcon from "../../common/SpotifyLogoIcon";
import UseSpotifyAuth from "../../hooks/useSpotifyAuth";

const welcomeMessage =
  "Hello!\nThe Playlist Mood Evaluator app will require access " +
  "to your Spotify playlists to view song titles. This requires you to " +
  "authenticate your Spotify account.\nPlease sign in to Spotify here:";

export default function Login() {
  // Provides method for initiatiating Auth Flow with Spotify OAuth server
  // Also checks browser URL for Auth callback code, which is sent to our backend API to perform
  // the token exchange (no token maintenance on frontend)
  const { initiateOAuthFlow } = UseSpotifyAuth();

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
          <Button size="small" onClick={initiateOAuthFlow}>
            <SpotifyLogoIcon />
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
