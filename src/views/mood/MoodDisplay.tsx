import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import AppBarHeader from "../../common/appBar/AppBar";
import { RefObject, useEffect, useMemo, useRef, useState } from "react";
import InfoDialog from "./InfoDialog";
import BackgroundImage from "../../common/backgroundImage/BackgroundImage";
import {
  synthMountainWallpaper,
  MOOD_WALLPAPERS,
} from "../../assets/wallpapers";
import AppLogo from "../../common/appLogo/AppLogo";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import SpotifyIcon from "../../common/spotify/SpotifyIcon";
import {
  LoadingStatus,
  notLoading,
  PlaylistMoodDetails,
  getLoadingStatusForPlaylist,
  GAP_TO_BORDER,
} from "../../common";
import CircularProgressBar from "../../common/circularProgressBar/CircularProgressBar";
import { getPlaylistMood } from "../../api/playlists/getPlaylistMood";
import { useErrorBoundary } from "react-error-boundary";
import MoodGrid from "./MoodGrid";

const MoodDisplay = () => {
  // Pull playlist identifiers that were passed as state in navigate()
  const { state } = useLocation();
  const { playlistName, playlistId } = state;
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>(() =>
    getLoadingStatusForPlaylist(playlistName)
  );
  const [playlistDetails, setPlaylistDetails] =
    useState<PlaylistMoodDetails | null>(null);
  const [infoDialogIsOpen, setInfoDialogIsOpen] = useState<boolean>(false);

  const { showBoundary } = useErrorBoundary();

  // Pull playlist mood details from SessionStorage, if present
  useEffect(() => {
    const setupMoodPage = async () => {
      try {
        const sessionPlaylistDetails = sessionStorage.getItem(
          `playlistDetails-${playlistId}`
        );
        if (sessionPlaylistDetails) {
          setPlaylistDetails(JSON.parse(sessionPlaylistDetails));
        } else {
          const playlistMoodDetails = await getPlaylistMood(playlistId);
          // remove session storage for other playlist mood details
          Object.keys(sessionStorage)
            .filter((k) => {
              return /playlistDetails-.*/.test(k);
            })
            .forEach((k) => {
              sessionStorage.removeItem(k);
            });
          // add new playlist to session storage
          sessionStorage.setItem(
            `playlistDetails-${playlistId}`,
            JSON.stringify({ ...playlistMoodDetails })
          );
          setPlaylistDetails(playlistMoodDetails);
        }
        setLoadingStatus(notLoading);
      } catch (error) {
        showBoundary(error);
      }
    };
    setupMoodPage();
  }, [playlistId, showBoundary]);

  const topFeaturesUppercase = useMemo(
    () =>
      playlistDetails?.top_features
        .map((feature: string) => feature[0].toUpperCase() + feature.slice(1))
        .join(", "),
    [playlistDetails?.top_features]
  );

  // used for snap scrolling
  const displaySection = useRef<HTMLInputElement>(null);
  const gridSection = useRef<HTMLInputElement>(null);
  const scrollTo = (section: RefObject<HTMLInputElement>) => {
    section.current?.scrollIntoView({ behavior: "smooth" });
  };

  const randomMoodWallpaper = useMemo(() => {
    const randomIdx = Math.floor(Math.random() * MOOD_WALLPAPERS.length);
    return MOOD_WALLPAPERS[randomIdx];
  }, []);

  const handleDialogOpen = () => {
    setInfoDialogIsOpen(true);
  };
  const handleDialogClose = () => {
    setInfoDialogIsOpen(false);
  };

  return loadingStatus.isLoading === true ? (
    <CircularProgressBar text={loadingStatus.text} />
  ) : (
    // MOOD DISPLAY (FIRST PAGE)
    <Box
      position="relative"
      height="100vh"
      width="100%"
      sx={{
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
        scrollBehavior: "smooth",
      }}
    >
      <Box ref={displaySection} sx={{ scrollSnapAlign: "start" }}>
        <AppBarHeader />
        <BackgroundImage imageUrl={randomMoodWallpaper}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            width="25%"
            sx={{
              background: "black",
              borderRadius: "10%",
              border: "solid 1px",
            }}
          >
            <AppLogo />
            <Box maxWidth="70%" sx={{ paddingBottom: GAP_TO_BORDER }}>
              <Card variant="outlined">
                <CardContent>
                  <Box
                    textAlign="center"
                    display="flex"
                    flexDirection="column"
                    alignContent="space-around"
                    sx={{
                      gap: { xl: 1, md: 0.5, xs: 0 },
                    }}
                  >
                    <Typography
                      color="green"
                      sx={{
                        typography: { xxl: "h5", xs: "h5" },
                      }}
                    >
                      Playlist Name:
                    </Typography>
                    <Typography
                      sx={{
                        typography: { xxl: "h6", xs: "body1" },
                      }}
                      gutterBottom
                    >
                      "{playlistName}"
                    </Typography>
                    <Typography
                      color="green"
                      sx={{ typography: { xxl: "h5", xs: "h6" } }}
                    >
                      Playlist Mood:
                    </Typography>
                    <Typography
                      component="div"
                      sx={{ typography: { xxl: "h6", xs: "body1" } }}
                      gutterBottom
                    >
                      {playlistDetails?.mood}
                    </Typography>
                    <Typography
                      color="green"
                      sx={{ typography: { xxl: "h5", xs: "h6" } }}
                    >
                      Top Audio Feature Categories:
                    </Typography>
                    <Typography sx={{ typography: { xxl: "h6", xs: "body1" } }}>
                      {topFeaturesUppercase}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions
                  style={{
                    justifyContent: "center",
                    marginTop: -14,
                  }}
                >
                  <Button
                    variant="text"
                    onClick={handleDialogOpen}
                    sx={{
                      textTransform: "none", // Disables standard MUI styling
                      textDecoration: "underline",
                      fontStyle: "italic",
                      color: "lightgray",
                      fontSize: "15px",
                    }}
                  >
                    What does this mean?
                  </Button>
                </CardActions>
              </Card>
            </Box>
          </Box>
          <Box
            zIndex={2}
            position="absolute"
            display="flex"
            flexDirection="column"
            alignContent="center"
            bottom="0%"
          >
            <Typography
              color="lightgray"
              sx={{
                typography: { xxl: "h6", xl: "body1" },
              }}
            >
              (Track Details)
            </Typography>
            <IconButton
              onClick={() => scrollTo(gridSection)}
              sx={{ borderRadius: 5 }}
            >
              <KeyboardArrowDownIcon
                sx={{ fontSize: { xxl: 70, xs: 45 }, color: "green" }}
              />
            </IconButton>
          </Box>
        </BackgroundImage>
        <InfoDialog open={infoDialogIsOpen} handleClose={handleDialogClose} />
      </Box>
      {/* GRID DISPLAY (SECOND PAGE) */}
      <Box
        position="relative"
        ref={gridSection}
        sx={{ scrollSnapAlign: "end" }}
      >
        <BackgroundImage imageUrl={synthMountainWallpaper}>
          <Box
            zIndex={2}
            position="absolute"
            sx={{ top: { xl: "8%", xs: "9%" } }}
          >
            <IconButton
              onClick={() => scrollTo(displaySection)}
              sx={{ borderRadius: 5 }}
            >
              <KeyboardArrowUpIcon
                sx={{ fontSize: { xl: 70, xs: 45 }, color: "green" }}
              />
            </IconButton>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            width="70%"
            height="65%"
            sx={{
              background: "black",
              borderRadius: "3%",
              border: "solid 1px",
            }}
          >
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              mt={4}
              mb={3}
              gap={1.5}
            >
              <SpotifyIcon />
              <Typography
                color="green"
                sx={{
                  typography: { xl: "h5", md: "h6", sm: "body1", xs: "body2" },
                }}
              >
                Top Songs That Contributed to this Overall Mood
              </Typography>
              <SpotifyIcon />
            </Box>
            <Box height="75%" width="90%">
              <MoodGrid topTracks={playlistDetails?.top_tracks || []} />
            </Box>
            <Typography
              color="green"
              sx={{
                typography: {
                  xxl: "h6",
                  md: "body1",
                  xs: "body2",
                },
                mt: { xxl: 4, xs: 2 },
              }}
            >
              (You can sort columns by clicking on the column header.)
            </Typography>
          </Box>
        </BackgroundImage>
      </Box>
    </Box>
  );
};

export default MoodDisplay;
