import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SpotifyLogo from "../../common/spotify/SpotifyLogo";
import { useAuth } from "../../hooks/useAuth";
import Box from "@mui/material/Box";
import AppLogo from "../../common/appLogo/AppLogo";
import { nightCityWallpaper } from "../../assets/wallpapers";
import BackgroundImage from "../../common/backgroundImage/BackgroundImage";
import CircularProgressBar from "../../common/circularProgressBar/CircularProgressBar";
import AppBarHeader from "../../common/appBar/AppBar";

// TODO: RE-ADD AFTER SCOPE EXTENSION REQUEST IS APPROVED:
// const welcomeMessage = `Hello!\nThe Playlist Mood Evaluator app will require access to your \
// Spotify account info (to retrieve your profile name), and your playlists (to view song titles).\
// \n\nPlease sign in to Spotify by clicking the icon below to authorize the app:`;

const welcomeMessage = `Hello! To generate a mood for your playlists, you must first authorize my app to \
view the names of your playlists.
\nPlease sign in to Spotify by clicking the icon below to authorize the app:`;

export default function Login() {
  const { login } = useAuth();

  let authInProgress: boolean = JSON.parse(
    localStorage.getItem("authInProgress") || "false"
  );
  // Make sure the local storage item is a boolean, since JSON parse could yield anything
  if (typeof authInProgress != "boolean") {
    console.error(`Unexpected type for authInProgress var: ${authInProgress}`);
    authInProgress = false;
  }

  const onAuthClick = () => {
    localStorage.setItem("authInProgress", "true");
    login();
  };

  return authInProgress ? (
    <CircularProgressBar text="Authenticating..." />
  ) : (
    <>
      <AppBarHeader />
      <BackgroundImage imageUrl={nightCityWallpaper}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
          width="30%"
          sx={{
            background: "black",
            borderRadius: "10%",
            border: "solid 1px",
            pb: { xxl: 6.5, lg: 4, xs: 3 },
          }}
        >
          <AppLogo />
          <Card
            sx={{
              maxWidth: "70%",
              marginTop: "8px",
              borderRadius: "5%",
            }}
          >
            <CardContent>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mb="-10px"
              >
                <Typography
                  gutterBottom
                  sx={{ typography: { xl: "h4", lg: "h5", xs: "h6" } }}
                  color="green"
                  fontFamily={"sans-serif"}
                >
                  Authenticate with Spotify:
                </Typography>
                <Typography
                  sx={{
                    typography: {
                      xl: "body1",
                      lg: "body2",
                      xs: "caption",
                    },
                    whiteSpace: "pre-line",
                  }}
                  color="text.secondary"
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
              <Button size="small" onClick={onAuthClick}>
                <SpotifyLogo />
              </Button>
            </CardActions>
          </Card>
        </Box>
      </BackgroundImage>
    </>
  );
}
