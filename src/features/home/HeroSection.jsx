import { Box, Container, Stack, Typography } from "@mui/material";
import { useState } from "react";
import HeroSearchBar from "./HeroSearchBar";
import HeroBg from "../../assets/BackgroundShape/HomeHero.svg";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
  ];

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Box
      sx={{
        pt: { xs: 4, sm: 6, md: 8 },
        pb: { xs: 20, sm: 18, md: 14 },
        minHeight: { xs: "auto", sm: "350px", md: "400px" },
        position: "relative",
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: "1300px",
          px: { xs: 2, sm: 4, md: 8 },
          position: "relative",
          overflow: "visible",
        }}
      >
        {/* Background Shape */}
        <Box
          component="img"
          src={HeroBg}
          alt=""
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "1440px",
            height: "582px",
            objectFit: { xs: "cover", md: "contain" },
            objectPosition: "center",
            zIndex: 0,
            opacity: { xs: 0.7, sm: 0.8, md: 1 },
          }}
        />

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 3, sm: 4, md: 6 }}
          alignItems="center"
          sx={{ position: "relative", zIndex: 1 }}
        >
          {/* LEFT CONTENT */}
          <Box
            sx={{
              flex: { md: "0 0 42%" },
              width: "100%",
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Typography
              variant="h2"
              fontWeight={700}
              sx={{
                mb: 3,
                lineHeight: 1.2,
                fontSize: { xs: "1.75rem", sm: "2.25rem", md: "3rem" },
                color: "#1a1a1a",
              }}
            >
              Discover Your Dream Home
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "#666",
                lineHeight: 1.7,
                maxWidth: 440,
                mx: { xs: "auto", md: 0 },
              }}
            >
              Explore verified residential and commercial properties with
              advanced search, transparent pricing, and trusted listings — all
              in one place.
            </Typography>
          </Box>

          {/* RIGHT IMAGE / CAROUSEL */}
          <Box
            sx={{
              flex: { md: "0 0 58%" },
              width: "100%",
            }}
          >
            <Box
              sx={{
                mt: 5,
                position: "relative",
                borderRadius: "20px",
                boxShadow: {
                  xs: "0px 10px 30px rgba(0,0,0,0.1)",
                  md: "0px 30px 60px rgba(0,0,0,0.12)",
                },
                ml: { md: 4 },
              }}
            >
              {/* LEFT ARROW */}
              <Box
                onClick={handlePrevSlide}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: { md: -20 },
                  transform: "translateY(-50%)",
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  backgroundColor: "rgba(255,255,255,0.9)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  zIndex: 10,
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,1)",
                  },
                }}
              >
                <Typography sx={{ fontSize: "1.2rem", color: "#666" }}>
                  ‹
                </Typography>
              </Box>

              {/* RIGHT ARROW */}
              <Box
                onClick={handleNextSlide}
                sx={{
                  position: "absolute",
                  top: "50%",
                  right: 16,
                  transform: "translateY(-50%)",
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  backgroundColor: "rgba(255,255,255,0.9)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  zIndex: 10,
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,1)",
                  },
                }}
              >
                <Typography sx={{ fontSize: "1.2rem", color: "#666" }}>
                  ›
                </Typography>
              </Box>

              {/* IMAGE WRAPPER (overflow handled here) */}
              <Box sx={{ overflow: "hidden", borderRadius: "20px" }}>
                <Box
                  component="img"
                  src={images[currentSlide]}
                  alt="Property"
                  sx={{
                    width: "100%",
                    height: { xs: 250, sm: 350, md: 500 },
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </Box>

              {/* DOTS */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 20,
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  gap: 1,
                  zIndex: 5,
                }}
              >
                {images.map((_, index) => (
                  <Box
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    sx={{
                      width: currentSlide === index ? 32 : 8,
                      height: 4,
                      borderRadius: 2,
                      backgroundColor:
                        currentSlide === index
                          ? "#8E3CF7"
                          : "rgba(255,255,255,0.5)",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Stack>

        {/* SEARCH BAR */}
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            bottom: { xs: -85, md: -150 },
            width: "100%",
            maxWidth: "1200px",
            zIndex: 20,
            px: { xs: 1, md: 0 },
          }}
        >
          <HeroSearchBar />
        </Box>
      </Container>
    </Box>
  );
}
