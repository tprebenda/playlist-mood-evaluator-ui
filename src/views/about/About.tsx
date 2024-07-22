import Box from "@mui/material/Box";
import AppLogo from "../../common/AppLogo";
import AppBarWithLogout from "../../common/AppBar";

const About = () => {
  return (
    <>
      <AppBarWithLogout />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <AppLogo />
      </Box>
    </>
  );
};

export default About;
