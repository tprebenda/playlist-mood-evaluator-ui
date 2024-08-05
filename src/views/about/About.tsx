import Box from "@mui/material/Box";
import AppLogo from "../../common/appLogo/AppLogo";
import AppBarHeader from "../../common/appBar/AppBar";
import { lineRiderSynthWallpaper } from "../../assets/wallpapers";
import BackgroundImage from "../../common/backgroundImage/BackgroundImage";

const aboutText = `The Playlist Mood Evaluator is a React web application developed by me, \
Troy Prebenda.\nIt is designed to give users some insight into the makeup of their playlists, \
and to highlight the songs that share similar audio features.`;

const About = () => {
  return (
    <>
      <AppBarHeader />
      <BackgroundImage imageUrl={lineRiderSynthWallpaper}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          height="50%"
          width="30%"
          sx={{
            background: "black",
            borderRadius: "10%",
            border: "solid 1px",
          }}
        >
          <AppLogo />
          <Box width="70%" padding={2}>
            {aboutText}
          </Box>
        </Box>
      </BackgroundImage>
    </>
  );
};

export default About;
