import Icon from "@mui/material/Icon";
import Box from "@mui/material/Box";
import Spotify_Logo_RGB_Green from "../assets/Spotify_Logo_RGB_Green.svg";

const SpotifyLogoIcon = () => (
  <Icon
    sx={{
      display: "flex",
      height: "inherit",
      width: "inherit",
      bgcolor: "white",
      borderRadius: "10%",
    }}
  >
    <Box
      component="img"
      sx={{
        height: { xl: 45, lg: 30 },
        width: { xl: 125, lg: 100 },
      }}
      alt="Spotify Logo"
      src={Spotify_Logo_RGB_Green}
    />
  </Icon>
);

export default SpotifyLogoIcon;
