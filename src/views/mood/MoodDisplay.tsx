import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { DataGrid, GridColDef, GridSortDirection } from "@mui/x-data-grid";

// interface Track {
//   id: string;
//   name: string;
//   album: string;
//   artists: string;
//   danceability: number;
//   energy: number;
//   speechiness: number;
//   acousticness: number;
//   instrumentalness: number;
//   valence: number;
// }

// TODO: add colors/highlights for the top feature categories/values?
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
  const { mood, top_features, top_tracks } = state;
  return (
    <Grid container justifyContent="center">
      <Box sx={{ minWidth: 275, maxWidth: 400 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Playlist Mood:
            </Typography>
            <Typography variant="h5" component="div" gutterBottom>
              {mood}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Top Audio Feature Categories:
            </Typography>
            <Typography variant="body2">{top_features.join(", ")}</Typography>
          </CardContent>
          <CardActions>
            {/* TODO: ADD ONCLICK */}
            <Button size="medium">View a more detailed breakdown</Button>
          </CardActions>
        </Card>
      </Box>
      <Box sx={{ height: "70%", width: "60%" }}>
        <DataGrid
          rows={top_tracks}
          columns={columns}
          sortingOrder={sortingOrder}
          initialState={{
            columns: {
              columnVisibilityModel: {
                // Hide id column
                id: false,
              },
            },
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
        />
      </Box>
    </Grid>
  );
};

export default MoodDisplay;
