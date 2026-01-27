// src/components/Testimonials/TestimonialCard.jsx
import { Box, Stack, Typography, Divider } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { StarBorder } from "@mui/icons-material";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export default function TestimonialCard({
  avatar,
  text,
  name,
  role,
  rating = 4,
}) {
  return (
    <Box
      sx={{
        boxSizing: "border-box",
        height: { xs: 300, sm: 400, md: 400, lg: 334 },
        maxWidth: { xs: "100%", sm: 500, md: 587 },
        width: { xs: "100%", sm: "auto" },
        bgcolor: "#ffffff",
        borderRadius: "16px",
        px: { xs: 3, sm: 7 },
        pt: { xs: 5, sm: 12 },
        pb: 3,
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Avatar */}
      <Box
        component="img"
        src={avatar}
        alt={name}
        sx={{
          width: { xs: 56, sm: 114 },
          height: { xs: 56, sm: 111 },
          borderRadius: "50%",
          objectFit: "cover",
          position: "absolute",
          top: { xs: -28, sm: -32 },
          left: { xs: 24, sm: 32 },
          border: "4px solid #ffffff",
        }}
      />

      {/* Testimonial text */}
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          fontSize: { xs: "16px", sm: "18px" },
          mt: { xs: 2, sm: 0 },
          mb: { xs: 2, sm: 3 },
        }}
      >
        "{text}"
      </Typography>
      {/* Divider */}
      <Divider sx={{ my: 2 }} />
      {/* Name */}
      <Typography
        fontWeight={400}
        sx={{
          fontSize: { xs: "14px", sm: "16px" },
          pt: { xs: 0, sm: 0, md: 0, lg: 2 },
        }}
      >
        {name}
      </Typography>

      {/* Footer - pushed to bottom */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: "auto" }}
      >
        <Typography
          variant="caption"
          color="#999999"
          sx={{ fontSize: { xs: "14px", sm: "14px" } }}
        >
          {role}
        </Typography>

        {/* Stars */}
        <Stack direction="row" spacing={0.5}>
          {Array.from({ length: 5 }).map((_, i) =>
            i < rating ? (
              <StarIcon
                key={i}
                sx={{
                  fontSize: { xs: 16, sm: 18 },
                }}
              />
            ) : (
              <StarBorderIcon
                key={i}
                sx={{
                  fontSize: { xs: 16, sm: 18 },
                  color: "#F5A623",
                }}
              />
            ),
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
