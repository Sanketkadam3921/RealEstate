import { Box, Container, Stack, Typography, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import HeroSearchBar from "./HeroSearchBar";
import HeroBg from "../../assets/BackgroundShape/HomeHero.svg";
import CarouselDots from "./CarouselDots";

/**
 * Desktop Hero Layout (900px – 1440px+)
 * - Fully responsive
 * - No overflow clipping
 * - Search bar visible at all widths
 */
export default function HeroDesktopLayout({
  images,
  currentSlide,
  onPrevSlide,
  onNextSlide,
  onSlideChange,
}) {
  return (
    <Box
      sx={{
        pt: { md: 6, lg: 2 },
        pb: { md: 12, lg: 14 },
        minHeight: 420,
        position: "relative",
        overflow: "visible", // ✅ CRITICAL FIX
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: "1440px",
          px: { md: 4, lg: 6, xl: 8 },
          position: "relative",
          overflow: "visible", // ✅ SAFETY FIX
        }}
      >
        {/* Background SVG */}
        <Box
          component="img"
          src={HeroBg}
          alt=""
          sx={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            maxWidth: "1440px",
            height: "auto",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        {/* MAIN CONTENT */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={{ md: 4, lg: 6 }}
          sx={{ position: "relative", zIndex: 1 }}
        >
          {/* LEFT TEXT */}
          <Box
            sx={{
              flex: { md: "0 0 45%", lg: "0 0 42%" },
              maxWidth: { md: "45%", lg: "42%" },
            }}
          >
            <Typography
              fontWeight={700}
              sx={{
                fontFamily: "Montserrat, sans-serif",
                pl: 5,
                mb: 3,
                lineHeight: 1.2,
                fontSize: { md: "40px", lg: "48px", xl: "45px" },
                color: "#24364E",
              }}
            >
              Discover Your Dream Home
            </Typography>

            <Typography
              sx={{
                fontFamily: "Montserrat, sans-serif",
                pl: 5,
                color: "#24364E",
                fontSize: { md: "0.95rem", lg: "1rem" },
                lineHeight: 1.7,
                maxWidth: 480,
              }}
            >
              Explore verified residential and commercial properties with
              advanced search, transparent pricing, and trusted listings — all
              in one place.
            </Typography>
          </Box>

          {/* RIGHT CAROUSEL */}
          <Box
            sx={{
              flex: { md: "0 0 55%", lg: "0 0 58%" },
              maxWidth: { md: "55%", lg: "58%" },
            }}
          >
            <Box
              sx={{
                mt: { md: 3, lg: 5 },
                ml: { md: 2, lg: 4 },
                position: "relative",
                borderRadius: 3,
                boxShadow: "0px 24px 48px rgba(0,0,0,0.12)",
              }}
            >
              {/* Prev */}
              <IconButton
                onClick={onPrevSlide}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: -20,
                  transform: "translateY(-50%)",
                  backgroundColor: "rgba(255,255,255,0.9)",
                  zIndex: 10,
                }}
              >
                <ArrowBackIosIcon sx={{ fontSize: "1.2rem" }} />
              </IconButton>

              {/* Next */}
              <IconButton
                onClick={onNextSlide}
                sx={{
                  position: "absolute",
                  top: "50%",
                  right: -15,
                  transform: "translateY(-50%)",
                  backgroundColor: "rgba(255,255,255,0.9)",
                  zIndex: 10,
                }}
              >
                <ArrowForwardIosIcon sx={{ fontSize: "1.2rem" }} />
              </IconButton>

              {/* Image */}
              <Box sx={{ overflow: "hidden", borderRadius: 3 }}>
                <Box
                  component="img"
                  src={images[currentSlide]}
                  alt="Property"
                  sx={{
                    width: "100%",
                    height: { md: 340, lg: 380, xl: 500 },
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </Box>

              {/* Dots */}
              <CarouselDots
                totalSlides={images.length}
                currentSlide={currentSlide}
                onSlideChange={onSlideChange}
              />
            </Box>
          </Box>
        </Stack>

        {/* SEARCH BAR */}
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            bottom: { md: -120, lg: -150 },
            width: "100%",
            maxWidth: "1400px",
            px: { md: 2, lg: 0 },
            zIndex: 20,
          }}
        >
          <HeroSearchBar />
        </Box>
      </Container>
    </Box>
  );
}
