import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import AppBarHeader from "../../common/appBar/AppBar";
import { RefObject, useEffect, useMemo, useRef, useState } from "react";
import InfoDialog from "./InfoDialog";
import BackgroundImage from "../../common/backgroundImage/BackgroundImage";
import {
  synthMountainWallpaper,
  MOOD_WALLPAPERS,
} from "../../assets/wallpapers";
import AppLogo from "../../common/appLogo/AppLogo";
import SpotifyIcon from "../../common/spotify/SpotifyIcon";
import { getLoadingStatusForPlaylist, GAP_TO_BORDER } from "../../common";
import CircularProgressBar from "../../common/circularProgressBar/CircularProgressBar";
import { useErrorBoundary } from "react-error-boundary";
import MoodGrid from "./MoodGrid";
import ScrollArrow from "./ScrollArrow";
import useGetPlaylistMood from "../../api/hooks/useGetPlaylistMood";

const INFO_BUTTON_SX = {
  textTransform: "none",
  color: "#83c3f7",
  borderColor: "#83c3f7",
  marginBottom: 1,
  "&:hover": {
    borderColor: "#83c3f7",
    bgcolor: "rgba(131, 195, 247, 0.1)",
  },
} as const;

const MoodDisplay = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { playlistName, playlistId } = state ?? {};

  const [infoDialogIsOpen, setInfoDialogIsOpen] = useState(false);
  const {
    data: playlistMoodDetails,
    isLoading,
    isError,
    error,
  } = useGetPlaylistMood(playlistId ?? "");

  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    if (!state?.playlistId) {
      navigate("/home", { replace: true });
    }
  }, [state, navigate]);

  useEffect(() => {
    if (isError && error) {
      setInfoDialogIsOpen(false);
      showBoundary(error);
    }
  }, [isError, error, showBoundary]);

  const topFeaturesUppercase = useMemo(() => {
    if (!playlistMoodDetails) return "";
    return playlistMoodDetails.top_features
      .map((feature: string) => feature[0].toUpperCase() + feature.slice(1))
      .join(", ");
  }, [playlistMoodDetails]);

  // used for snap scrolling
  const displaySection = useRef<HTMLDivElement>(null);
  const gridSection = useRef<HTMLDivElement>(null);
  const scrollTo = (section: RefObject<HTMLDivElement>) => {
    section.current?.scrollIntoView({ behavior: "smooth" });
  };

  const randomMoodWallpaper = useMemo(() => {
    const randomIdx = Math.floor(Math.random() * MOOD_WALLPAPERS.length);
    return MOOD_WALLPAPERS[randomIdx];
  }, []);

  const handleDialogOpen = () => setInfoDialogIsOpen(true);
  const handleDialogClose = () => setInfoDialogIsOpen(false);

  if (!state?.playlistId) return null;

  if (isLoading) {
    return (
      <CircularProgressBar text={getLoadingStatusForPlaylist(playlistName)} />
    );
  }

  return (
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
      {/* MOOD DISPLAY (FIRST PAGE) */}
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
                    sx={{ gap: { xl: 1, md: 0.5, xs: 0 } }}
                  >
                    <Typography
                      color="green"
                      sx={{ typography: { xxl: "h5", xs: "h5" } }}
                    >
                      Playlist Name:
                    </Typography>
                    <Typography
                      sx={{ typography: { xxl: "h6", xs: "body1" } }}
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
                      {playlistMoodDetails?.mood}
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
                <CardActions sx={{ justifyContent: "center", mt: -1.5 }}>
                  <Button
                    variant="outlined"
                    startIcon={<InfoOutlinedIcon />}
                    onClick={handleDialogOpen}
                    sx={INFO_BUTTON_SX}
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
              sx={{ typography: { xxl: "h6", xl: "body1", lg: "body2" } }}
            >
              (Track Details)
            </Typography>
            <ScrollArrow
              direction="down"
              onClick={() => scrollTo(gridSection)}
            />
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
            <ScrollArrow
              direction="up"
              onClick={() => scrollTo(displaySection)}
            />
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
              sx={{
                mt: { xxl: 4, xl: 2.5, md: 2, xs: 1.5 },
                mb: { md: 1, xs: 0.5 },
              }}
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
            <Box
              sx={{
                height: { xxl: "75%", xl: "72%", md: "70%", xs: "65%" },
                width: "90%",
              }}
            >
              <MoodGrid topTracks={playlistMoodDetails?.top_tracks || []} />
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={{ xs: 0.25, md: 0.5 }}
              sx={{
                mt: { xxl: 2, xl: 1.5, md: 1, xs: 0.5 },
              }}
            >
              <Button
                variant="outlined"
                startIcon={<InfoOutlinedIcon />}
                onClick={handleDialogOpen}
                size="small"
                sx={INFO_BUTTON_SX}
              >
                What do these values mean?
              </Button>
              <Typography
                color="green"
                sx={{
                  typography: { xxl: "h6", md: "body1", xs: "caption" },
                }}
              >
                (Sort columns by clicking headers)
              </Typography>
            </Box>
          </Box>
        </BackgroundImage>
      </Box>
    </Box>
  );
};

export default MoodDisplay;
