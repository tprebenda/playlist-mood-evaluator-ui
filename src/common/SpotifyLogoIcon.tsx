import Icon from "@mui/material/Icon";
import Box from "@mui/material/Box";
import Spotify_Logo_RGB_Green from "../assets/Spotify_Logo_RGB_Green.svg";

const SpotifyLogoIcon = () => (
  <Icon sx={{ display: "flex", height: "inherit", width: "inherit" }}>
    <Box
      component="img"
      sx={{
        height: 50,
        width: 125,
        maxHeight: { xs: 50, md: 35 },
        maxWidth: { xs: 125, md: 75 },
      }}
      alt="Spotify Logo"
      src={Spotify_Logo_RGB_Green}
    />
  </Icon>
);

export default SpotifyLogoIcon;
