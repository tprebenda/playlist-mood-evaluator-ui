import Box from "@mui/material/Box";
import { ReactNode } from "react";

interface BackgroundImageProps {
  imageUrl: string;
  children: ReactNode;
}

const BackgroundImage = ({ imageUrl, children }: BackgroundImageProps) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      height="100vh"
      width="100%"
      sx={{
        backgroundImage: `url(${imageUrl})`,
        objectFit: "cover",
        objectPosition: "center",
        scrollSnapAlign: "center",
      }}
    >
      {children}
    </Box>
  );
};

export default BackgroundImage;
