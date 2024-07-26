import Button from "@mui/material/Button";
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
import AppBarHeader from "../../common/appBar/AppBar";
import AppLogo from "../../common/appLogo/AppLogo";

type UserPlaylist = PlaylistsResponse;

interface LoadingStatus {
  isLoading: boolean;
  text: string;
}

const loadingUserData: LoadingStatus = {
  isLoading: true,
  text: "Loading User Profile data from Spotify...",
};

const loadingPlaylistData = (playlistName: string): LoadingStatus => ({
  isLoading: true,
  text: `Generating mood using the songs from your playlist: '${playlistName}'...`,
});

const notLoading: LoadingStatus = {
  isLoading: false,
  text: "",
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
      <span style={{ marginTop: "8px" }}>{loadingStatus.text}</span>
    </Box>
  ) : (
    <>
      <AppBarHeader />
      <Box display="flex" flexDirection="column" alignItems="center">
        <AppLogo />
        <Typography variant="h4" fontFamily="IBM Plex Sans Condensed">
          Welcome, {displayName}!
        </Typography>
        <Box mt={4} mb={3}>
          <Autocomplete
            id="playlist-select"
            options={allPlaylistNames}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Playlist Name" />
            )}
            onChange={onSelectedPlaylistChange}
          />
        </Box>
        <Button
          size="large"
          variant="outlined"
          disabled={!selectedPlaylist}
          sx={{ color: selectedPlaylist ? "green" : "" }}
          onClick={getMoodForSelectedPlaylist}
        >
          Generate Mood for Playlist!
        </Button>
      </Box>
    </>
  );
};

export default Home;
