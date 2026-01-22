// src/components/FeaturedPropertyCard.jsx
import { Box, Stack, Typography, Button } from "@mui/material";

export default function FeaturedPropertyCard({
  image,
  title,
  location,
  type,
  area,
}) {
  return (
    <Stack
      spacing={2}
      sx={{
        width: 398,
        backgroundColor: "#ffffff",
        borderRadius: "14px",
        border: "1px solid #B7B7B7",
        p: "13px 29px",
      }}
    >
      {/* Image */}
      <Box
        component="img"
        src={image}
        alt={title}
        sx={{
          width: "100%",
          height: 206,
          objectFit: "cover",
          borderRadius: "11px",
        }}
      />

      {/* Content */}
      <Stack spacing={1}>
        <Typography fontWeight={500}>{title}</Typography>

        <Typography variant="body2" color="text.secondary">
          Location : {location}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Type ({type})
        </Typography>

        <Typography variant="body2" fontWeight={600}>
          Area ({area})
        </Typography>
      </Stack>

      {/* CTA */}
      <Button
        variant="contained"
        sx={{
          mt: 1,
          borderRadius: "8px",
          textTransform: "none",
          backgroundColor: "#9b5cff",
          "&:hover": {
            backgroundColor: "#8a4ef0",
          },
        }}
        fullWidth
      >
        View Details
      </Button>
    </Stack>
  );
}
