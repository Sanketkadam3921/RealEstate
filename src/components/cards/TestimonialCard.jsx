// src/components/Testimonials/TestimonialCard.jsx
import { Box, Stack, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

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
        height: { xs: "auto", md: 334 },
        minHeight: { xs: 280, md: 334 },
        maxWidth: { xs: "100%", sm: 500, md: 587 },
        width: { xs: "100%", sm: "auto" },
        bgcolor: "#ffffff",
        borderRadius: "16px",
        px: { xs: 3, sm: 4 },
        pt: { xs: 5, sm: 6 },
        pb: 3,
        position: "relative",
      }}
    >
      {/* Avatar */}
      <Box
        component="img"
        src={avatar}
        alt={name}
        sx={{
          width: { xs: 56, sm: 64 },
          height: { xs: 56, sm: 64 },
          borderRadius: "50%",
          objectFit: "cover",
          position: "absolute",
          top: { xs: -28, sm: -32 },
          left: { xs: 24, sm: 32 },
          border: "4px solid #ffffff",
        }}
      />

      <Stack spacing={{ xs: 2, sm: 3 }}>
        {/* Testimonial text */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: { xs: "13px", sm: "14px" },
            mt: { xs: 2, sm: 0 },
          }}
        >
          "{text}"
        </Typography>

        {/* Footer */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack spacing={0.5}>
            <Typography
              fontWeight={500}
              sx={{ fontSize: { xs: "14px", sm: "16px" } }}
            >
              {name}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontSize: { xs: "11px", sm: "12px" } }}
            >
              {role}
            </Typography>
          </Stack>

          {/* Stars */}
          <Stack direction="row" spacing={0.5}>
            {Array.from({ length: rating }).map((_, i) => (
              <StarIcon
                key={i}
                sx={{
                  fontSize: { xs: 16, sm: 18 },
                  color: "#F5A623",
                }}
              />
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
