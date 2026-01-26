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
      sx={{
        maxWidth: { xs: "100%", sm: 350, md: 380, lg: 398 },
        width: { xs: "100%", sm: "auto" },
        height: { xs: "auto", sm: 451 },
        minHeight: { xs: 400, sm: 451 },
        backgroundColor: "#ffffff",
        borderRadius: "14px",
        border: "1px solid #B7B7B7",

        // ✅ IMPORTANT
        display: "flex",
        flexDirection: "column",

        // padding controls distance from border
        pt: 2,
        px: { xs: 2.5, sm: 3 },
        pb: 3,
      }}
    >
      {/* Image */}
      <Box
        component="img"
        src={image}
        alt={title}
        sx={{
          width: "100%",
          height: { xs: 180, sm: 200, md: 206 },
          objectFit: "cover",
          borderRadius: "11px",
          mb: 2,
        }}
      />

      {/* Content */}
      <Stack spacing={1}>
        <Typography
          fontWeight={400}
          sx={{ fontSize: { xs: "15px", sm: "16px", md: "17px" } }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: { xs: "13px", sm: "14px" } }}
        >
          Location : {location}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: { xs: "13px", sm: "14px" } }}
        >
          Type ({type})
        </Typography>

        <Typography
          variant="body2"
          fontWeight={600}
          sx={{ fontSize: { xs: "13px", sm: "14px" } }}
        >
          Area ({area})
        </Typography>
      </Stack>

      {/* ✅ FLEX SPACER */}
      <Box sx={{ flexGrow: 1 }} />

      {/* CTA */}
      <Button
        variant="contained"
        fullWidth
        sx={{
          height: { xs: 40, sm: 44 },
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: 600,
          fontSize: { xs: "14px", sm: "16px" },
          backgroundColor: "#9b5cff",
          "&:hover": {
            backgroundColor: "#8a4ef0",
          },
        }}
      >
        View Details
      </Button>
    </Stack>
  );
}
