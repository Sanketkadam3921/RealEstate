// src/components/WhyChooseZonix/CentralVisual.jsx
import { Box, Typography } from "@mui/material";
import BgShape from "../../assets/BackgroundShape/Background.svg";
import Logo from "../../assets/Logo/Logo.svg";

export default function CentralVisual() {
  return (
    <Box
      sx={{
        position: "relative",
        width: 530,
        height: 812,
        mx: "auto",
      }}
    >
      <Box
        component="img"
        src={BgShape}
        alt=""
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Box
          component="img"
          src={Logo}
          alt="Zonix Realty"
          sx={{ width: 160 }}
        />

        <Typography fontSize={28} fontWeight={500} color="#0F2A44">
          Zonix Realty
        </Typography>
      </Box>
    </Box>
  );
}
