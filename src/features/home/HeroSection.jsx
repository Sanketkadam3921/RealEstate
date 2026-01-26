import { Box, Container, Stack, Typography } from "@mui/material";
import HeroSearchBar from "./HeroSearchBar";
import HeroBg from "../../assets/BackgroundShape/HomeHero.svg";

export default function HeroSection() {
  return (
    <Box
      sx={{
        pt: { xs: 6, md: 8 },
        pb: { xs: 20, md: 14 }, // Increased bottom padding to accommodate search bar
        minHeight: { xs: "auto", md: "400px" },
        position: "relative", // Added to create positioning context
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: "1440px",
          px: { xs: 3, md: 8 },
          position: "relative",
          overflow: "visible", // Changed from "hidden" to "visible"
        }}
      >
        {/* Background Shape (SVG) - Now inside Container */}
        <Box
          component="img"
          src={HeroBg}
          alt=""
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        />

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 4, md: 6 }}
          alignItems="center"
          sx={{ position: "relative", zIndex: 1 }}
        >
          {/* LEFT CONTENT */}
          <Box sx={{ flex: { xs: 1, md: "0 0 42%" } }}>
            <Typography
              variant="h2"
              fontWeight={700}
              sx={{
                mb: 3,
                lineHeight: 1.2,
                fontSize: { xs: "2rem", md: "3rem" },
                color: "#1a1a1a",
              }}
            >
              Discover Your Dream Home
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "#666",
                fontSize: { xs: "0.95rem", md: "1rem" },
                lineHeight: 1.7,
                maxWidth: 440,
              }}
            >
              Explore verified residential and commercial properties with
              advanced search, transparent pricing, and trusted listings — all
              in one place.
            </Typography>
          </Box>

          {/* RIGHT IMAGE */}
          <Box sx={{ flex: { xs: 1, md: "0 0 58%" }, width: "100%" }}>
            <Box
              sx={{
                position: "relative",
                borderRadius: { xs: 3, md: 4 },
                overflow: "hidden",
                boxShadow: "0px 30px 60px rgba(0,0,0,0.12)",
                ml: { xs: 0, md: 4 },
              }}
            >
              {/* Carousel Navigation Arrows */}
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: { xs: 8, sm: 12, md: 16 },
                  transform: "translateY(-50%)",
                  width: { xs: 32, sm: 36, md: 40 },
                  height: { xs: 32, sm: 36, md: 40 },
                  borderRadius: "50%",
                  backgroundColor: "rgba(255,255,255,0.9)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  zIndex: 2,
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,1)",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                    color: "#666",
                  }}
                >
                  ‹
                </Typography>
              </Box>

              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  right: { xs: 8, sm: 12, md: 16 },
                  transform: "translateY(-50%)",
                  width: { xs: 32, sm: 36, md: 40 },
                  height: { xs: 32, sm: 36, md: 40 },
                  borderRadius: "50%",
                  backgroundColor: "rgba(255,255,255,0.9)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  zIndex: 2,
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,1)",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                    color: "#666",
                  }}
                >
                  ›
                </Typography>
              </Box>

              <Box
                component="img"
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                alt="Property"
                sx={{
                  width: "100%",
                  height: { xs: 300, md: 460 },
                  objectFit: "cover",
                  display: "block",
                }}
              />

              {/* Carousel Dots */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 20,
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  gap: 1,
                  zIndex: 2,
                }}
              >
                <Box
                  sx={{
                    width: 32,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: "#8E3CF7",
                  }}
                />
                <Box
                  sx={{
                    width: 8,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: "rgba(255,255,255,0.5)",
                  }}
                />
                <Box
                  sx={{
                    width: 8,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: "rgba(255,255,255,0.5)",
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Stack>

        {/* SEARCH BAR (OVERLAPPING) */}
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            bottom: { xs: -90, sm: -80, md: -60 }, // Adjusted positioning
            width: { xs: "calc(100% - 32px)", sm: "calc(100% - 48px)", md: "calc(100% - 64px)" },
            maxWidth: "1200px",
            zIndex: 10,
            px: { xs: 1, sm: 0 },
          }}
        >
          <HeroSearchBar />
        </Box>
      </Container>
    </Box>
  );
}