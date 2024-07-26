import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { green } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SpotifyLogoIcon from "../../common/SpotifyLogoIcon";
import { useAuth } from "../../hooks/useAuth";
import Box from "@mui/material/Box";
import AppLogo from "../../common/appLogo/AppLogo";

const welcomeMessage =
  "Hello!\nThe Playlist Mood Evaluator app will require access " +
  "to your Spotify playlists to view song titles. This requires you to " +
  "authenticate your Spotify account.\nPlease sign in to Spotify by clicking the icon below:";

export default function Login() {
  const { login } = useAuth();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <AppLogo />
      <Card sx={{ maxWidth: 500 }}>
        <CardContent
          sx={{
            marginBottom: "-15px",
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mb={0.5}
          >
            <Typography
              gutterBottom
              variant="h5"
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
          </Box>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button size="small" onClick={login}>
            <SpotifyLogoIcon />
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
