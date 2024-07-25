import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  getPlaylists,
  PlaylistsResponse,
} from "../../api/playlists/getPlaylists";
import { useNavigate } from "react-router-dom";
import { SyntheticEvent, useEffect, useMemo, useState } from "react";
import getUser from "../../api/user/getUser";
import CircularProgress from "@mui/material/CircularProgress";
import Autocomplete from "@mui/material/Autocomplete";
import { useAuth } from "../../hooks/useAuth";
import getPlaylistMood from "../../api/playlists/getPlaylistMood";
import AppBarWithLogout from "../../common/appBar/AppBar";
import AppLogo from "../../common/appLogo/AppLogo";

type UserPlaylist = PlaylistsResponse;

interface LoadingStatus {
  isLoading: boolean;
  loadingText: string;
}

const loadingUserData: LoadingStatus = {
  isLoading: true,
  loadingText: "Loading User Profile data from Spotify...",
};

const loadingPlaylistData = (playlistName: string): LoadingStatus => ({
  isLoading: true,
  loadingText: `Generating mood using the songs from your playlist: '${playlistName}'...`,
});

const notLoading: LoadingStatus = {
  isLoading: false,
  loadingText: "",
};

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [loadingStatus, setLoadingStatus] =
    useState<LoadingStatus>(loadingUserData);
  const [displayName, setDisplayName] = useState<string>("");
  const [playlists, setPlaylists] = useState<UserPlaylist[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<UserPlaylist | null>(
    null
  );
  const allPlaylistNames = useMemo(
    () => playlists.map((playlist: UserPlaylist) => playlist.name),
    [playlists]
  );

  useEffect(() => {
    const setupHomePage = async () => {
      const { display_name } = await getUser();
      // If user display name is a string, use it. If it's just an ID, use `User ${ID}`
      const displayName =
        display_name && isNaN(+display_name)
          ? display_name
          : `User ${display_name}`;
      setDisplayName(displayName);

      const playlists = await getPlaylists();
      setPlaylists(playlists);
      setLoadingStatus(notLoading);
    };
    if (!isAuthenticated) {
      navigate("/login");
    }
    setupHomePage();
  }, [isAuthenticated, navigate]);

  const onSelectedPlaylistChange = (
    e: SyntheticEvent<Element, Event>,
    value: string | null
  ) => {
    if (!playlists || !value) {
      setSelectedPlaylist(null);
      return;
    }
    const playlist = playlists.find(
      (playlist: UserPlaylist) => playlist.name === value
    );
    setSelectedPlaylist(playlist!);
  };

  const getMoodForSelectedPlaylist = async () => {
    if (!selectedPlaylist) {
      console.warn("Must select a playlist from the dropdown menu first!");
      return;
    }
    setLoadingStatus(loadingPlaylistData(selectedPlaylist.name));
    const playlistMoodDetails = await getPlaylistMood(selectedPlaylist.id);
    navigate("/mood", {
      state: { ...playlistMoodDetails, playlistName: selectedPlaylist.name },
    });
  };

  return loadingStatus.isLoading === true ? (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <CircularProgress />
      <span style={{ marginTop: "8px" }}>{loadingStatus.loadingText}</span>
    </Box>
  ) : (
    // TODO: use standard <div> since MUI grid doesn't support col widths for direction="column"?
    // https://mui.com/material-ui/react-grid/#direction-column-column-reverse
    // OR: should I just wrap this whole thing in a div flexbox and customize that, with a
    // spash art background behind it (centered by MUI grid)?
    <>
      <AppBarWithLogout />
      <Grid
        container
        direction="column"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Grid item xs={4}></Grid>
        <Grid item xs={4} m={4}>
          <AppLogo />
        </Grid>
        <Grid item xs={6} m={3}>
          <Typography variant="h4" fontFamily="IBM Plex Sans Condensed">
            Welcome, {displayName}!
          </Typography>
        </Grid>
        <Grid item xs={12} m={3}>
          <Autocomplete
            id="playlist-select"
            options={allPlaylistNames}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Playlist Name" />
            )}
            onChange={onSelectedPlaylistChange}
          />
        </Grid>
        <Button
          size="large"
          variant="outlined"
          sx={{ color: "green" }}
          disabled={!selectedPlaylist}
          onClick={getMoodForSelectedPlaylist}
        >
          Generate Mood for Playlist!
        </Button>
      </Grid>
    </>
  );
};

export default Home;
