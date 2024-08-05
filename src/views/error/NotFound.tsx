import Box from "@mui/material/Box";
import AppLogo from "../../common/appLogo/AppLogo";
import { spaceNightSkyWallpaper } from "../../assets/wallpapers";
import BackgroundImage from "../../common/backgroundImage/BackgroundImage";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <BackgroundImage imageUrl={spaceNightSkyWallpaper}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="20%"
        sx={{
          background: "black",
          borderRadius: "10%",
          border: "solid 1px",
        }}
      >
        <AppLogo />
        <Box width="70%" whiteSpace="pre-wrap" textAlign="center" mb={5}>
          <Typography mb={2}>Page not found...</Typography>
          <Button
            variant="outlined"
            style={{ color: "green" }}
            onClick={() => navigate(-1)}
          >
            GO BACK
          </Button>
        </Box>
      </Box>
    </BackgroundImage>
  );
};

export default NotFound;
