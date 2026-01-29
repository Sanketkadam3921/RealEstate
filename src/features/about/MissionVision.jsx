import { Box, Container, Stack, Typography } from "@mui/material";

// Background image
import BgImage from "../../assets/images/missionvision.png";

// Custom SVG icons
import MissionIcon from "../../assets/icons/mission.svg";
import VisionIcon from "../../assets/icons/vision.svg";

const Card = ({ icon, title, text }) => {
  return (
    <Stack
      sx={{
        alignItems: "center",
        // Slightly reduce width on small tablets so both cards fit side‑by‑side
        width: { xs: "90%", sm: 300, md: 351 },
        height: { xs: "auto", sm: 331, md: 331 },
        minHeight: { xs: 260, sm: 331, md: 331 },
        px: 3, // ALL cards get same inner width
        py: 2.5, // ALL cards get same inner height
        borderRadius: "19px",
        background:
          "linear-gradient(180deg, #ECF1FF 0%, #DADDF6 50%, #D5D5D5 100%)",
        boxShadow: "0px 10px 30px rgba(0,0,0,0.12)",
        textAlign: "center",
      }}
    >
      {/* TOP GROUP */}
      <Stack spacing={2} alignItems="center">
        <Typography
          sx={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "24px",
            fontWeight: 600,
            color: "#2c2c2c",
          }}
        >
          {title}
        </Typography>

        <Box
          component="img"
          src={icon}
          alt={title}
          sx={{ width: 87, height: 87, pt: 4 }}
        />
      </Stack>

      {/* FLEX PUSH */}
      <Box sx={{ flexGrow: 1 }} />

      {/* BOTTOM TEXT */}
      <Typography
        sx={{
          fontFamily: "Montserrat, sans-serif",
          fontSize: "20px",
          color: "#5f5f5f",
          lineHeight: 1.6,
          pb: 1, // breathing room from bottom
        }}
      >
        {text}
      </Typography>
    </Stack>
  );
};

const MissionVision = () => {
  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "auto", md: "654px" },
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* Background */}
      <Box
        component="img"
        src={BgImage}
        alt="Mission Vision Background"
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />

      {/* Overlay */}
      {/* <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.45)",
          zIndex: 1,
        }}
      /> */}

      {/* Content */}
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 2,
          height: { xs: "auto", md: "100%" },
          py: { xs: 6, md: 0 },
        }}
      >
        <Stack
          spacing={{ xs: 4, md: 6 }}
          alignItems="center"
          justifyContent="center"
          sx={{ height: { xs: "auto", md: "100%" } }}
        >
          {/* Heading */}
          <Typography
            sx={{
              fontFamily: "Montserrat, sans-serif",
              color: "#ffffff",
              fontSize: { xs: "24px", sm: "30px", md: "36px" },
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            Our Mission & Vision
          </Typography>

          {/* Cards */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            columnGap={{ xs: "24px", sm: "48px", md: "80px", lg: "280px" }}
            rowGap={{ xs: "24px", sm: "24px" }}
            alignItems={{ xs: "center", sm: "stretch" }}
            justifyContent="center"
            sx={{
              width: "100%",
              px: { xs: 2, sm: 0 }, // Add horizontal padding on mobile
            }}
          >
            <Card
              title="Mission"
              icon={MissionIcon}
              text="To make property buying, renting, and investing simple, transparent, and reliable for everyone."
            />

            <Card
              title="Vision"
              icon={VisionIcon}
              text="To become a trusted real estate destination known for honesty, quality listings, and customer-first service."
            />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default MissionVision;
