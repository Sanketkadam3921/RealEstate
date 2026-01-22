// src/components/PropertyCategoryCard.jsx
import { Box, Stack, Button } from "@mui/material";

export default function PropertyCategoryCard({ image, label }) {
  return (
    <Stack alignItems="center" spacing={3} sx={{ width: 324 }}>
      {/* Image */}
      <Box
        component="img"
        src={image}
        alt={label}
        sx={{
          width: 324,
          height: 355,
          objectFit: "cover",
          borderRadius: "50px",
        }}
      />

      {/* Button */}
      <Button
        variant="outlined"
        sx={{
          textTransform: "none",
          px: 5,
          py: 1,
          borderRadius: "999px",
          fontWeight: 500,
          color: "#9b5cff",
          borderColor: "#d6b7ff",
          "&:hover": {
            borderColor: "#9b5cff",
            backgroundColor: "transparent",
          },
        }}
      >
        {label}
      </Button>
    </Stack>
  );
}
