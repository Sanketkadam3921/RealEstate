import { Box, Container, Typography, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import HeroSearchBar from "./HeroSearchBar";
import CarouselDots from "./CarouselDots";

/**
 * Mobile/Tablet Hero Layout (< 900px)
 * Features:
 * - Full-width background image with text overlay
 * - Search bar positioned below the image
 * - Standard Material-UI icon buttons for carousel navigation
 */
export default function HeroMobileLayout({
  images,
  currentSlide,
  onPrevSlide,
  onNextSlide,
  onSlideChange,
}) {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image Container - Separate from search bar */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: "400px", sm: "600px" },
          overflow: "hidden",
        }}
      >
        {/* Background Image */}
        <Box
          component="img"
          src={images[currentSlide]}
          alt="Property"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />

        {/* Dark Overlay for Text Readability */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 100%)",
            zIndex: 1,
          }}
        />

        {/* Text Overlay */}
        <Container
          maxWidth={false}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            zIndex: 2,
            px: { xs: 3, sm: 5 },
          }}
        >
          <Typography
            variant="h2"
            fontWeight={700}
            sx={{
              fontFamily: "Montserrat, sans-serif",
              mb: { xs: 2, sm: 3 },
              lineHeight: 1.2,
              fontSize: { xs: "1.75rem", sm: "2.75rem" },
              color: "#ffffff",
              textShadow: "0px 2px 8px rgba(0,0,0,0.3)",
            }}
          >
            Discover Your Dream Home
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontFamily: "Montserrat, sans-serif",
              color: "#ffffff",
              fontSize: { xs: "0.875rem", sm: "1.1rem" },
              lineHeight: 1.7,
              maxWidth: { xs: "100%", sm: "700px" },
              textShadow: "0px 2px 4px rgba(0,0,0,0.3)",
              px: { xs: 1, sm: 2 },
            }}
          >
            Explore verified residential and commercial properties with advanced
            search, transparent pricing, and trusted listings — all in one
            place.
          </Typography>
        </Container>

        {/* Carousel Navigation - Using Material-UI IconButton */}
        <IconButton
          onClick={onPrevSlide}
          sx={{
            position: "absolute",
            top: "50%",
            left: { xs: 8, sm: 16 },
            transform: "translateY(-50%)",
            backgroundColor: "rgba(255,255,255,0.9)",
            color: "#666",
            zIndex: 10,
            width: { xs: 36, sm: 44 },
            height: { xs: 36, sm: 44 },
            "&:hover": {
              backgroundColor: "rgba(255,255,255,1)",
            },
          }}
        >
          <ArrowBackIosIcon sx={{ fontSize: { xs: "1rem", sm: "1.2rem" } }} />
        </IconButton>

        <IconButton
          onClick={onNextSlide}
          sx={{
            position: "absolute",
            top: "50%",
            right: { xs: 8, sm: 16 },
            transform: "translateY(-50%)",
            backgroundColor: "rgba(255,255,255,0.9)",
            color: "#666",
            zIndex: 10,
            width: { xs: 36, sm: 44 },
            height: { xs: 36, sm: 44 },
            "&:hover": {
              backgroundColor: "rgba(255,255,255,1)",
            },
          }}
        >
          <ArrowForwardIosIcon
            sx={{ fontSize: { xs: "1rem", sm: "1.2rem" } }}
          />
        </IconButton>

        {/* Carousel Dots */}
        <CarouselDots
          totalSlides={images.length}
          currentSlide={currentSlide}
          onSlideChange={onSlideChange}
        />
      </Box>

      {/* Search Bar Below Image */}
      <Container
        maxWidth={false}
        sx={{
          maxWidth: "1400px",
          px: { xs: 2, sm: 2 },
          mt: { xs: 2, sm: 3 }, // Changed from negative to positive margin
          mb: { xs: 3, sm: 4 }, // Added bottom margin for spacing
          position: "relative",
          zIndex: 10,
          transform: "translateY(0)", // Ensure no upward translation
        }}
      >
        <HeroSearchBar />
      </Container>
    </Box>
  );
}
