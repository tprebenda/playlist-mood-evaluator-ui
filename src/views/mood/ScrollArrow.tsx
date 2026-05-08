import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

interface ScrollArrowProps {
  direction: "up" | "down";
  onClick: () => void;
}

const ScrollArrow = ({ direction, onClick }: ScrollArrowProps) => (
  <IconButton
    onClick={onClick}
    sx={{ borderRadius: direction === "up" ? 5 : 2 }}
  >
    {direction === "down" ? (
      <KeyboardArrowDownIcon
        sx={{ fontSize: { xxl: 70, xs: 45 }, color: "green" }}
      />
    ) : (
      <KeyboardArrowUpIcon
        sx={{ fontSize: { xxl: 70, xs: 45 }, color: "green" }}
      />
    )}
  </IconButton>
);

export default ScrollArrow;
