import { Box, Container, Stack, Typography } from "@mui/material";

// Background image
import ContactBg from "../../assets/images/contact.png";

const ContactHero = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: {
          xs: "260px",
          sm: "320px",
          md: "461px", // matches Figma
        },
        overflow: "hidden",
      }}
    >
      {/* Background Image */}
      <Box
        component="img"
        src={ContactBg}
        alt="Contact Us Background"
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "blur(2px)",
          transform: "scale(1.05)", // avoids blur edge clipping
        }}
      />

      {/* Dark Overlay */}
      {/* <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.45)",
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
          height="100%"
          alignItems="center"
          justifyContent="center"
          spacing={2}
          textAlign="center"
        >
          <Typography
            sx={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: {
                xs: "28px",
                sm: "34px",
                md: "48px",
              },
              fontWeight: 600,
              color: "#ffffff",
            }}
          >
            Contact Us
          </Typography>

          <Typography
            sx={{
              fontWeight: 600,
              fontFamily: "Montserrat, sans-serif",
              fontSize: {
                xs: "14px",
                sm: "18px",
                md: "20px",
              },
              color: "#ffffff",
              maxWidth: "600px",
            }}
          >
            We’re here to help with all your property needs.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default ContactHero;
