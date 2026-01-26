// src/components/WhyChooseZonix/FeatureItem.jsx
import { Stack, Typography, Box } from "@mui/material";

export default function FeatureItem({ icon, title, subtitle, description }) {
  return (
    <Stack spacing={1.5} alignItems="center" textAlign="center">
      <Box
        sx={{
          width: { xs: 48, sm: 52, md: 56 },
          height: { xs: 48, sm: 52, md: 56 },
          borderRadius: "50%",
          bgcolor: "#9b5cff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "& svg": {
            fontSize: { xs: "24px", sm: "26px", md: "28px" },
          },
        }}
      >
        {icon}
      </Box>

      <Typography
        fontWeight={600}
        sx={{ fontSize: { xs: "18px", sm: "20px", md: "24px" } }}
      >
        {title}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ fontSize: { xs: "14px", sm: "16px", md: "18px" } }}
      >
        {subtitle}
      </Typography>

      <Typography
        variant="body2"
        color="#000000"
        maxWidth={260}
        sx={{
          fontSize: { xs: "13px", sm: "15px", md: "18px" },
          px: { xs: 2, sm: 0 },
        }}
      >
        {description}
      </Typography>
    </Stack>
  );
}
