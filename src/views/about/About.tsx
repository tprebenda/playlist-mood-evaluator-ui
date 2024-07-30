import Box from "@mui/material/Box";
import AppLogo from "../../common/appLogo/AppLogo";
import AppBarHeader from "../../common/appBar/AppBar";
import Paper from "@mui/material/Paper";
import synthWaveWallpaper from "../../assets/synthWaveWallpaper.jpg";
import BackgroundImage from "../../common/backgroundImage/BackgroundImage";

const aboutText = `The Playlist Mood Evaluator is a React web application developed by me, \
Troy Prebenda.\nIt is designed to give users some insight into the makeup of their playlists, \
and to highlight the songs that share similar audio features.`;

const About = () => {
  return (
    <>
      <AppBarHeader />
      <BackgroundImage imageUrl={synthWaveWallpaper}>
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
          <Paper
            elevation={2}
            sx={{ maxWidth: "500px", whiteSpace: "pre-line" }}
          >
            <Box padding={2}>{aboutText}</Box>
          </Paper>
        </Box>
      </BackgroundImage>
    </>
  );
};

export default About;
