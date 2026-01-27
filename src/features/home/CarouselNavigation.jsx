import { Box } from "@mui/material";
import CarouselLeftIcon from "../../assets/icons/Hero/CarouselLeft.svg";
import CarouselRightIcon from "../../assets/icons/Hero/CarouselRight.svg";

/**
 * Carousel Navigation Component
 * Uses SVG icons from assets/icons/Hero
 * Responsive sizing based on variant (mobile/desktop)
 */
export default function CarouselNavigation({
  onPrevSlide,
  onNextSlide,
  variant = "desktop", // 'mobile' or 'desktop'
}) {
  // Responsive icon sizes based on variant and breakpoints
  const iconSizes = {
    mobile: {
      xs: { width: 36, height: 36 },
      sm: { width: 48, height: 48 }, // Tablet optimized
    },
    desktop: {
      width: 50,
      height: 50,
    },
  };

  const buttonStyles = {
    mobile: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "pointer",
      zIndex: 10,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "opacity 0.3s ease",
      "&:hover": {
        opacity: 0.8,
      },
      "&:active": {
        opacity: 0.6,
      },
    },
    desktop: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "pointer",
      zIndex: 10,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "opacity 0.3s ease",
      "&:hover": {
        opacity: 0.8,
      },
      "&:active": {
        opacity: 0.6,
      },
    },
  };

  if (variant === "mobile") {
    return (
      <>
        {/* Left Arrow - Mobile/Tablet */}
        <Box
          onClick={onPrevSlide}
          sx={{
            ...buttonStyles.mobile,
            left: { xs: 8, sm: 20 },
          }}
        >
          <Box
            component="img"
            src={CarouselLeftIcon}
            alt="Previous"
            sx={{
              width: {
                xs: iconSizes.mobile.xs.width,
                sm: iconSizes.mobile.sm.width,
              },
              height: {
                xs: iconSizes.mobile.xs.height,
                sm: iconSizes.mobile.sm.height,
              },
            }}
          />
        </Box>

        {/* Right Arrow - Mobile/Tablet */}
        <Box
          onClick={onNextSlide}
          sx={{
            ...buttonStyles.mobile,
            right: { xs: 8, sm: 20 },
          }}
        >
          <Box
            component="img"
            src={CarouselRightIcon}
            alt="Next"
            sx={{
              width: {
                xs: iconSizes.mobile.xs.width,
                sm: iconSizes.mobile.sm.width,
              },
              height: {
                xs: iconSizes.mobile.xs.height,
                sm: iconSizes.mobile.sm.height,
              },
            }}
          />
        </Box>
      </>
    );
  }

  // Desktop variant
  return (
    <>
      {/* Left Arrow - Desktop */}
      <Box
        onClick={onPrevSlide}
        sx={{
          ...buttonStyles.desktop,
          left: -20,
        }}
      >
        <Box
          component="img"
          src={CarouselLeftIcon}
          alt="Previous"
          sx={{
            width: iconSizes.desktop.width,
            height: iconSizes.desktop.height,
          }}
        />
      </Box>

      {/* Right Arrow - Desktop */}
      <Box
        onClick={onNextSlide}
        sx={{
          ...buttonStyles.desktop,
          right: 16,
        }}
      >
        <Box
          component="img"
          src={CarouselRightIcon}
          alt="Next"
          sx={{
            width: iconSizes.desktop.width,
            height: iconSizes.desktop.height,
          }}
        />
      </Box>
    </>
  );
}

