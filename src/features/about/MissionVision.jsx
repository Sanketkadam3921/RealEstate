import { Box, Container, Stack, Typography } from "@mui/material";
import TargetIcon from "@mui/icons-material/GpsFixed";
import VisibilityIcon from "@mui/icons-material/Visibility";

// background image
import BgImage from "../../assets/images/missionvision.png";

const Card = ({ icon, title, text }) => {
  return (
    <Stack
      spacing={2}
      alignItems="center"
      sx={{
        width: "351px",
        height: "331px",
        padding: "19px 26px",
        borderRadius: "19px",
        background:
          "linear-gradient(180deg, #ECF1FF 0%, #DADDF6 50%, #D5D5D5 100%)",
        boxShadow: "0px 10px 30px rgba(0,0,0,0.12)",
        textAlign: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: "24px",
          fontWeight: 600,
          color: "#2c2c2c",
        }}
      >
        {title}
      </Typography>

      <Box sx={{ color: "#9b59ff", fontSize: "48px" }}>{icon}</Box>

      <Typography
        sx={{
          fontSize: "17px",
          color: "#5f5f5f",
          lineHeight: 1.6,
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
        height: "599px",
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
          height: "100%",
        }}
      >
        <Stack
          spacing={6}
          alignItems="center"
          justifyContent="center"
          sx={{ height: "100%" }}
        >
          {/* Heading */}
          <Typography
            sx={{
              color: "#ffffff",
              fontSize: "36px",
              fontWeight: 600,
            }}
          >
            Our Mission & Vision
          </Typography>

          {/* Cards */}
          <Stack direction="row" spacing="273px" alignItems="center">
            <Card
              title="Mission"
              icon={<TargetIcon fontSize="inherit" />}
              text="To make property buying, renting, and investing simple, transparent, and reliable for everyone."
            />

            <Card
              title="Vision"
              icon={<VisibilityIcon fontSize="inherit" />}
              text="To become a trusted real estate destination known for honesty, quality listings, and customer-first service."
            />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default MissionVision;
