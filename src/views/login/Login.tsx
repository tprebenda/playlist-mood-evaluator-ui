import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SpotifyLogoIcon from "../../common/SpotifyLogoIcon";
import { useAuth } from "../../hooks/useAuth";
import Box from "@mui/material/Box";
import AppLogo from "../../common/appLogo/AppLogo";
import nightCityWallpaper from "../../assets/nightCityWallpaper.jpg";

const welcomeMessage = `Hello!\nThe Playlist Mood Evaluator app will require access to your \
Spotify account info (to retrieve your profile name) and your playlists (to view song titles). \
Please sign in to Spotify by clicking the icon below to authorize the app:`;

export default function Login() {
  const { login } = useAuth();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      sx={{
        backgroundImage: `url(${nightCityWallpaper})`,
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        paddingBottom={8.5}
        width="30%"
        sx={{
          background: "black",
          borderRadius: "10%",
          border: "solid 1px",
        }}
      >
        <AppLogo />
        <Card sx={{ maxWidth: 500, marginTop: "8px" }}>
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
              sx={{ borderRadius: "20%" }}
            >
              <Typography
                gutterBottom
                variant="h5"
                color="green"
                fontFamily={"sans-serif"}
              >
                Authenticate with Spotify
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                textAlign="center"
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
    </Box>
  );
}
