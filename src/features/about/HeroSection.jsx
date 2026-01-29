// src/pages/About/AboutHero.jsx

import { Box, Container, Stack, Typography } from "@mui/material";
import HeroBg from "../../assets/images/building1.png";

const AboutHero = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: "420px", md: "574px" },
        overflow: "hidden",
      }}
    >
      {/* Background Image */}
      <Box
        component="img"
        src={HeroBg}
        alt="About Hero Background"
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
          opacity: 0.9,
        }}
      />

      {/* Overlay
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.35)",
          zIndex: 1,
        }}
      /> */}

      {/* Content */}
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 2,
          height: "100%",
        }}
      >
        <Box
          sx={{
            position: "relative",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* OPEN FRAME (DECORATION ONLY) */}
          <Box
            sx={{
              position: "absolute",
              width: "360px",
              height: "260px",
              left: {
                xs: "45%",
                sm: "33%",
                md: "38%",
                lg: "36%",
                xl: "34%",
              },
              transform: "translateX(-50%)",
              borderLeft: "24px solid #ffffff",
              borderTop: "24px solid #ffffff",
              borderBottom: "24px solid #ffffff",
            }}
          />

          {/* TEXT (CENTERED IN HERO, NOT FRAME) */}
          <Stack spacing={1} alignItems="center">
            <Typography
              sx={{
                fontFamily: "Montserrat, sans-serif",
                color: "#ffffff",
                fontSize: { xs: "32px", md: "48px" },
                fontWeight: 600,
                lineHeight: 1.2,
              }}
            >
              About Us
            </Typography>

            <Typography
              sx={{
                fontFamily: "Montserrat, sans-serif",
                color: "#ffffff",
                fontSize: "18px",
                opacity: 0.95,
                maxWidth: "420px",
                textAlign: "center",
              }}
            >
              Making Property Search Simple and Transparent
            </Typography>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutHero;
