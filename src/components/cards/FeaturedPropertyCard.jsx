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
        maxWidth: { xs: "350px", sm: 330, md: 380, lg: 398 },

        height: { xs: "360px", sm: 401, md: 401, lg: 401 },
        overflow: "hidden",

        backgroundColor: "#ffffff",
        borderRadius: "14px",
        border: "1px solid #B7B7B7",

        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", // ✅ KEY FIX

        pt: 2,
        px: { xs: 2.5, sm: 3 },
        pb: 3,
      }}
    >
      {/* Top Section (Image + Text) */}
      <Stack>
        {/* Image */}
        <Box
          component="img"
          src={image}
          alt={title}
          sx={{
            width: "100%",
            height: { xs: 180, sm: 206 },
            objectFit: "cover",
            borderRadius: "11px",
            mb: 2,
          }}
        />

        {/* Text Content */}
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
            sx={{ fontSize: { xs: "13px", sm: "14px" }, pt: 1 }}
          >
            Area ({area})
          </Typography>
        </Stack>
      </Stack>

      {/* Button at bottom */}
      <Button
        variant="contained"
        fullWidth
        sx={{
          height: { xs: 40, sm: 44 },
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: 600,
          fontSize: { xs: "14px", sm: "14px" },
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
