import Icon from "@mui/material/Icon";
import Box from "@mui/material/Box";
import Spotify_Logo_RGB_Green from "../../assets/spotify/Spotify_Logo_RGB_Green.svg";

const SpotifyLogo = () => (
  <Box sx={{ backgroundColor: "white", padding: 0.6, borderRadius: "6%" }}>
    <Icon
      sx={{
        display: "flex",
        height: { xl: 45, lg: 30, sm: 25, xs: 20 },
        width: { xl: 150, lg: 100, sm: 85, xs: 75 },
      }}
    >
      <Box component="img" alt="Spotify Logo" src={Spotify_Logo_RGB_Green} />
    </Icon>
  </Box>
);

export default SpotifyLogo;
