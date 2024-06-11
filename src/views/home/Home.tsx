import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

interface TempHomeProps {
  signOut: () => void;
}
const Home = ({ signOut }: TempHomeProps) => {
  return (
    <div style={{ display: "flex" }}>
      <Button
        size="large"
        variant="outlined"
        sx={{ color: "blue" }}
        onClick={signOut}
      >
        Log out
      </Button>
    </div>
  );
};

export default Home;
