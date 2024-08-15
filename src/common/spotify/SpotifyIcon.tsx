import Icon from "@mui/material/Icon";
import Box from "@mui/material/Box";
import Spotify_Icon_RGB_Green from "../../assets/spotify/Spotify_Icon_RGB_Green.svg";

const SpotifyIcon = () => (
  <Icon
    sx={{
      display: "flex",
      height: { xl: 35, md: 25, xs: 20 },
      width: { xl: 35, md: 25, xs: 20 },
      bgcolor: "black",
      borderRadius: "10%",
    }}
  >
    <Box component="img" alt="Spotify Logo" src={Spotify_Icon_RGB_Green} />
  </Icon>
);

export default SpotifyIcon;
