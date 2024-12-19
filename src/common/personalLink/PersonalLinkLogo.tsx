import Icon from "@mui/material/Icon";
import Box from "@mui/material/Box";

interface PersonalLinkLogoProps {
  src: string;
}

// Creates an icon for a personal link logo. (Intended for LinkedIn/Github icons.)
const PersonalLinkLogo = ({ src }: PersonalLinkLogoProps) => (
  <Icon
    sx={{
      display: "flex",
    }}
  >
    <Box component="img" alt="Github Logo" src={src} />
  </Icon>
);

export default PersonalLinkLogo;
