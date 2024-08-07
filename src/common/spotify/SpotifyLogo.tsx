import Icon from "@mui/material/Icon";
import Box from "@mui/material/Box";
import Spotify_Logo_RGB_Green from "../../assets/spotify/Spotify_Logo_RGB_Green.svg";

const SpotifyLogo = () => (
  <Icon
    sx={{
      display: "flex",
      height: { xl: 45, md: 30, xs: 20 },
      width: { xl: 125, md: 100, xs: 75 },
      bgcolor: "white",
      borderRadius: "10%",
    }}
  >
    <Box component="img" alt="Spotify Logo" src={Spotify_Logo_RGB_Green} />
  </Icon>
);

export default SpotifyLogo;
