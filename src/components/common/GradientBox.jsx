// src/components/GradientSection.jsx
import { Box } from "@mui/material";

export default function GradientBox({ children }) {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "650px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        // gradient similar to your Figma
        background:
          "linear-gradient(180deg, #CFE2FC 0%, #DBDBF5 50%, #E5D7F5 100%)",

        px: { xs: 2, md: 6 },
        py: { xs: 6, md: 10 },
      }}
    >
      {children}
    </Box>
  );
}
