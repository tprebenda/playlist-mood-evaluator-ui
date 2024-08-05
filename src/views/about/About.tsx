import Box from "@mui/material/Box";
import AppLogo from "../../common/appLogo/AppLogo";
import AppBarHeader from "../../common/appBar/AppBar";
import { lineRiderSynthWallpaper } from "../../assets/wallpapers";
import BackgroundImage from "../../common/backgroundImage/BackgroundImage";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

let aboutTheme = createTheme({
  typography: {
    fontFamily: `"IBM Plex Sans Condensed", "Arial", "Good Times"`,
    fontSize: 16,
  },
});

const aboutText = `The Playlist Mood Evaluator is a React web application developed by me, \
Troy Prebenda.\nIt is designed to give users some insight into the makeup of their playlists, \
and to highlight the songs that share similar audio features.\n\nMusic has always been \
a very meaningful part of my life - I played many instruments growing up, and I continue to \
rely on music for inspiration while working, exercising, gaming, etc.\nI saw this project \
as an opportunity to look deeper into the songs of my playlists, and to better understand my \
taste in music and my overall 'style'.\nI hope you can use this tool to do the same for your \
playlists!`;

const About = () => {
  return (
    <>
      <AppBarHeader />
      <BackgroundImage imageUrl={lineRiderSynthWallpaper}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width="30%"
          sx={{
            background: "black",
            borderRadius: "10%",
            border: "solid 1px",
          }}
        >
          <AppLogo />
          <ThemeProvider theme={aboutTheme}>
            <Box width="70%" whiteSpace="pre-wrap" textAlign="center" mb={5}>
              <Typography>{aboutText}</Typography>
            </Box>
          </ThemeProvider>
        </Box>
      </BackgroundImage>
    </>
  );
};

export default About;
