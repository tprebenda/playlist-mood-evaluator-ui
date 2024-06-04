import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { green } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import SpotifyLogoIcon from "./common/SpotifyLogoIcon";

const welcomeMessage =
  "Hello!\nThe Spotify Mood Playlist Evaluator app will require access \
to your Spotify playlists to view song titles. This requires you to \
authenticate your Spotify account.\nPlease sign in to Spotify here:";

// TODO: remove?
export const authEndpoint = "https://accounts.spotify.com/authorize";

export default function OAuthCard() {
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
          <Button size="small">
            <SpotifyLogoIcon />
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
