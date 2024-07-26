import Box from "@mui/material/Box";
import AppLogo from "../../common/appLogo/AppLogo";
import AppBarHeader from "../../common/appBar/AppBar";
import Paper from "@mui/material/Paper";

const aboutText = `The Playlist Mood Evaluator is a React web application developed by me, \
Troy Prebenda.\nIt is designed to give users some insight into the makeup of their playlists, \
and to highlight the songs that share similar audio features.`;

const About = () => {
  return (
    <>
      <AppBarHeader />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <AppLogo />
        <Paper elevation={2} sx={{ maxWidth: "500px", whiteSpace: "pre-line" }}>
          <Box padding={2}>{aboutText}</Box>
        </Paper>
      </Box>
    </>
  );
};

export default About;
