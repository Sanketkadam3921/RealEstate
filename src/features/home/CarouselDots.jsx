import { Box } from "@mui/material";

/**
 * Carousel Dots Indicator Component
 * Shows current slide and allows direct navigation
 */
export default function CarouselDots({
  totalSlides,
  currentSlide,
  onSlideChange,
}) {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: { xs: 12, sm: 20 },
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: { xs: 0.75, sm: 1 },
        zIndex: 5,
      }}
    >
      {Array.from({ length: totalSlides }).map((_, index) => (
        <Box
          key={index}
          onClick={() => onSlideChange(index)}
          sx={{
            width: currentSlide === index
              ? { xs: 24, sm: 32 }
              : { xs: 6, sm: 8 },
            height: { xs: 3, sm: 4 },
            borderRadius: 2,
            backgroundColor:
              currentSlide === index
                ? "#8E3CF7"
                : "rgba(255,255,255,0.5)",
            cursor: "pointer",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor:
                currentSlide === index
                  ? "#8E3CF7"
                  : "rgba(255,255,255,0.7)",
            },
          }}
        />
      ))}
    </Box>
  );
}

