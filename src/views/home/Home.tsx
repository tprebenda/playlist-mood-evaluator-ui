import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import "./Home.css";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import getPlaylists from "../../api/playlists/getPlaylists";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import getUser from "../../api/user/getUser";
import CircularProgress from "@mui/material/CircularProgress";
import Autocomplete from "@mui/material/Autocomplete";
import { useAuth } from "../../hooks/useAuth";

interface LogoTextfieldProps {
  text: string;
  color: string;
}

const LogoTextfield = ({ text, color }: LogoTextfieldProps) => {
  return (
    <Typography variant="h3" fontFamily="IBM Plex Sans Condensed" color={color}>
      {text}
    </Typography>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [displayName, setDisplayName] = useState("");
  const [userPlaylists, setUserPlaylists] = useState<string[]>([]);

  useEffect(() => {
    const setupHomePage = async () => {
      // const { display_name } = await getUser();
      // // If User profile name is a string, use it. If it's just an ID, use `User ${ID}`
      // const displayName =
      //   display_name && isNaN(+display_name)
      //     ? display_name
      //     : `User ${display_name}`;
      const displayName = "Prisoner 24601";
      setDisplayName(displayName);

      // const playlists = await getPlaylists();
      // const playlistNames = Object.keys(playlists || []);
      const playlistNames = ["ayo", "nice playlist bro"];
      setUserPlaylists(playlistNames);
      setIsLoading(false);
    };
    if (!isAuthenticated) {
      navigate("/login");
    }
    setupHomePage();
  }, [isAuthenticated, navigate]);

  return isLoading === true ? (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  ) : (
    // TODO: use standard <div> since MUI grid doesn't support col widths for direction="column"?
    // https://mui.com/material-ui/react-grid/#direction-column-column-reverse
    // OR: should I just wrap this whole thing in a div flexbox and customize that, with a
    // spash art background behind it (centered by MUI grid)?
    <Grid
      container
      direction="column"
      justifyContent="space-evenly"
      alignItems="center"
    >
      <Grid item xs={4}></Grid>
      <Grid item xs={4} m={4}>
        <Box className="square pulse">
          <LogoTextfield text="Playlist" color="green" />
          <LogoTextfield text="Mood" color="black" />
          <LogoTextfield text="Evaluator" color="green" />
        </Box>
      </Grid>
      <Grid item xs={6} m={3}>
        <Typography variant="h4" fontFamily="IBM Plex Sans Condensed">
          Welcome, {displayName}!
        </Typography>
      </Grid>
      <Grid item xs={12} m={3}>
        <Autocomplete
          id="playlist-select"
          options={userPlaylists}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Playlist Name" />
          )}
        />
      </Grid>
      <Button
        size="large"
        variant="outlined"
        sx={{ color: "blue" }}
        onClick={logout}
      >
        (Log out)
      </Button>
    </Grid>
  );
};

export default Home;
