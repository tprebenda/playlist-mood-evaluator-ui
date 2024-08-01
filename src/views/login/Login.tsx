import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SpotifyLogoIcon from "../../common/SpotifyLogoIcon";
import { useAuth } from "../../hooks/useAuth";
import Box from "@mui/material/Box";
import AppLogo from "../../common/appLogo/AppLogo";
import nightCityWallpaper from "../../assets/wallpapers/nightCityWallpaper.jpg";
import BackgroundImage from "../../common/backgroundImage/BackgroundImage";

const welcomeMessage = `Hello!\nThe Playlist Mood Evaluator app will require access to your \
Spotify account info (to retrieve your profile name) and your playlists (to view song titles). \
Please sign in to Spotify by clicking the icon below to authorize the app:`;

export default function Login() {
  const { login } = useAuth();

  return (
    <BackgroundImage imageUrl={nightCityWallpaper}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="30%"
        sx={{
          background: "black",
          borderRadius: "10%",
          border: "solid 1px",
          pb: { xl: 8.5, lg: 4 },
        }}
      >
        <AppLogo />
        <Card
          sx={{
            maxWidth: { xl: 500, lg: 330 },
            marginTop: "8px",
            borderRadius: "5%",
          }}
        >
          <CardContent>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mb="-15px"
            >
              <Typography
                gutterBottom
                sx={{ typography: { xl: "h4", lg: "h6" } }}
                color="green"
                fontFamily={"sans-serif"}
              >
                Authenticate with Spotify
              </Typography>
              <Typography
                sx={{
                  typography: { xl: "body1", lg: "body2" },
                  whiteSpace: "pre-line",
                }}
                color="text.secondary"
                textAlign="center"
              >
                {welcomeMessage}
              </Typography>
            </Box>
          </CardContent>
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "8px",
            }}
          >
            <Button size="small" onClick={login}>
              <SpotifyLogoIcon />
            </Button>
          </CardActions>
        </Card>
      </Box>
    </BackgroundImage>
  );
}
