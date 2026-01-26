// src/components/PropertyCategoryCard.jsx
import { Box, Stack, Button } from "@mui/material";

export default function PropertyCategoryCard({ image, label }) {
  return (
    <Stack
      alignItems="center"
      spacing={{ xs: 2, sm: 3 }}
      sx={{
        width: { xs: "100%", sm: 280, md: 300, lg: 324 },
        maxWidth: { xs: "100%", sm: 280, md: 300, lg: 324 },
      }}
    >
      {/* Image */}
      <Box
        component="img"
        src={image}
        alt={label}
        sx={{
          width: { xs: "100%", sm: 280, md: 300, lg: 324 },
          maxWidth: { xs: "100%", sm: 280, md: 300, lg: 324 },
          height: { xs: 280, sm: 320, md: 340, lg: 355 },
          objectFit: "cover",
          borderRadius: { xs: "30px", md: "50px" },
        }}
      />

      {/* Button */}
      <Button
        variant="outlined"
        sx={{
          textTransform: "none",
          px: { xs: 4, sm: 5 },
          py: 1,
          borderRadius: "999px",
          fontWeight: 600,
          color: "#9b5cff",
          border: "1px solid #d6b7ff", // 👈 force 1px border
          fontSize: { xs: "14px", sm: "16px" },
          "&:hover": {
            border: "1px solid #9b5cff",
            backgroundColor: "transparent",
          },
        }}
      >
        {label}
      </Button>
    </Stack>
  );
}
