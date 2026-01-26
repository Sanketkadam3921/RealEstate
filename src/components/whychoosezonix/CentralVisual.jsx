// src/components/WhyChooseZonix/CentralVisual.jsx
import { Box, Typography } from "@mui/material";
import BgShape from "../../assets/BackgroundShape/Background.svg";
import Logo from "../../assets/Logo/Logo1.svg";

export default function CentralVisual() {
  return (
    <Box
      sx={{
        position: "relative",
        width: { xs: "100%", sm: 400, md: 480, lg: 530 },
        maxWidth: "100%",
        height: { xs: 400, sm: 500, md: 650, lg: 812 },
        mx: "auto",
        my: { xs: 2, md: 0 },
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
          objectFit: "contain",
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
          sx={{
            width: { xs: "80%", sm: 300, md: 380, lg: 446 },
            maxWidth: "100%",
            height: "auto",
          }}
        />
      </Box>
    </Box>
  );
}
