import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import LinkedInLogoWhite from "../../assets/linkedin/In_White_72.svg";
import GithubLogoInvertoCat from "../../assets/github/github_mark_white.svg";
import PersonalLinkLogo from "./PersonalLinkLogo";
import { openInNewTab } from "../../helpers/link/linkHelpers";

const LINKEDIN_PROFILE_URL = "https://www.linkedin.com/in/troy-prebenda/";
const GITHUB_PROFILE_URL = "https://github.com/tprebenda";

// A flexbox element containing my LinkedIn and Github URL as clickable links.
const PersonalLinks = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{
        width: { xxl: "26%" },
        mb: { xxl: 7, xl: 4, xs: 3 },
      }}
    >
      <Box display="flex" marginBottom={0.5}>
        <PersonalLinkLogo src={LinkedInLogoWhite} />
        <Link
          onClick={() => openInNewTab(LINKEDIN_PROFILE_URL)}
          marginLeft="10px"
        >
          LinkedIn - Troy Prebenda
        </Link>
      </Box>
      <Box display="flex">
        <PersonalLinkLogo src={GithubLogoInvertoCat} />
        <Link
          onClick={() => openInNewTab(GITHUB_PROFILE_URL)}
          marginLeft="10px"
        >
          Github - Troy Prebenda
        </Link>
      </Box>
    </Box>
  );
};

export default PersonalLinks;
