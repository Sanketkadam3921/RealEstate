import { Box, Container, Typography } from "@mui/material";
import { useState } from "react";
import HeroSearchBar from "./HeroSearchBar";
import HeroMobileLayout from "./HeroMobileLayout";
import HeroDesktopLayout from "./HeroDesktopLayout";

// Carousel images
const images = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Box
      sx={{
        position: "relative",
        pt: { xs: 0, sm: 0, md: 2 },
        pb: { xs: 4, sm: 5, md: 14 },
      }}
    >
      {/* Mobile/Tablet Layout (< 900px) */}
      <Box
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        <HeroMobileLayout
          images={images}
          currentSlide={currentSlide}
          onPrevSlide={handlePrevSlide}
          onNextSlide={handleNextSlide}
          onSlideChange={setCurrentSlide}
        />
      </Box>

      {/* Desktop Layout (>= 900px) */}
      <Box
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        <HeroDesktopLayout
          images={images}
          currentSlide={currentSlide}
          onPrevSlide={handlePrevSlide}
          onNextSlide={handleNextSlide}
          onSlideChange={setCurrentSlide}
        />
      </Box>
    </Box>
  );
}
