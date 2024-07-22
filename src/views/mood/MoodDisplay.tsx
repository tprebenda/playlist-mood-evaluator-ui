import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridSortDirection,
} from "@mui/x-data-grid";
import AppBarWithLogout from "../../common/appBar/AppBar";

const DARK_BROWN_HEX = "#5C4033";
const SIGNIFICANT_CELL_BACKGROUND_HEX = "#e6ffc2"; // #e6ffc2
const DATA_COLUMNS = [
  "danceability",
  "energy",
  "speechiness",
  "acousticness",
  "instrumentalness",
  "valence",
];

// Adds green colored cell text if cell value is >= 0.65
const getCellStyling = (params: GridCellParams<any, any, number>) => {
  if (!DATA_COLUMNS.includes(params.field) || !params.value) {
    return "";
  }
  return params.value >= 0.65 ? "significantCell" : "";
};

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "name", headerName: "Track Name", width: 225 },
  { field: "album", headerName: "Album", width: 225 },
  { field: "artists", headerName: "Artist(s)", width: 225 },
  { field: "danceability", headerName: "Danceability", width: 150 },
  { field: "energy", headerName: "Energy", width: 100 },
  { field: "speechiness", headerName: "Speechiness", width: 100 },
  { field: "acousticness", headerName: "Acousticness", width: 100 },
  { field: "instrumentalness", headerName: "Instrumentalness", width: 150 },
  { field: "valence", headerName: "Valence", width: 100 },
];

const sortingOrder: GridSortDirection[] = ["desc", "asc", null];

// TODO:
// add 'Help' icon at the bottom of 'more details' popup, which explains that
// if the playlist only has one value but the user is expecting more, it means that their
// playlist is diverse enough that the 'average' mood unfortunately does not reflect all the
// different genres that the user expects.
const MoodDisplay = () => {
  // Pull mood details that were passed as state in navigate()
  const { state } = useLocation();
  const { mood, top_features, top_tracks, playlistName } = state;
  return (
    <>
      <AppBarWithLogout />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Box sx={{ minWidth: 275, maxWidth: 500 }}>
          <Card variant="outlined">
            <CardContent>
              <Box textAlign="center" mb={2}>
                <Typography variant="h4" color={DARK_BROWN_HEX}>
                  "{playlistName}"
                </Typography>
              </Box>
              <Typography variant="h5" color="green" gutterBottom>
                Playlist Mood:
              </Typography>
              <Typography variant="h6" component="div" mb={2}>
                {mood}
              </Typography>
              <Typography variant="h6" color="green" gutterBottom>
                Top Audio Feature Categories:
              </Typography>
              <Typography variant="body2">{top_features.join(", ")}</Typography>
            </CardContent>
            <CardActions style={{ justifyContent: "center", marginBottom: 5 }}>
              {/* TODO: ADD ONCLICK */}
              <Button size="medium">View a more detailed breakdown</Button>
            </CardActions>
          </Card>
        </Box>
        <Typography variant="h6" color={DARK_BROWN_HEX} mt={4} mb={2}>
          Top Songs That Contributed to this Overall Mood:
        </Typography>
        <Box
          sx={{
            height: "700px",
            width: "60%",
          }}
        >
          <DataGrid
            rows={top_tracks}
            columns={columns}
            sortingOrder={sortingOrder}
            getCellClassName={(params) => getCellStyling(params)}
            initialState={{
              columns: {
                columnVisibilityModel: {
                  id: false,
                },
              },
              pagination: {
                paginationModel: {
                  pageSize: 20,
                },
              },
            }}
            pageSizeOptions={[10]}
            sx={{
              ".significantCell": {
                color: "green",
                fontWeight: "bold",
                bgcolor: SIGNIFICANT_CELL_BACKGROUND_HEX,
              },
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default MoodDisplay;
