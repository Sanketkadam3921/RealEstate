import { Box, Button, Container, Stack, Typography } from "@mui/material";
import HeroImage from "../../assets/images/y.png";

const HeroSection = () => {
  return (
    <Box sx={{ backgroundColor: "#F6F6F6" }}>
      <Container
        maxWidth="false"
        sx={{
          maxWidth: 1440,
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="space-between"
          spacing={{ xs: 4, md: 6 }}
          py={{ xs: 6, md: 10 }}
          // ❌ REMOVED: sx={{ mr: 3 }}
        >
          {/* LEFT CONTENT */}
          <Stack
            spacing={3}
            sx={{
              maxWidth: { md: 650 },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: "#24364E",
                lineHeight: 1.2,
                fontSize: {
                  xs: "28px",
                  sm: "34px",
                  md: "48px",
                },
              }}
            >
              Discover Most Suitable{" "}
              <Box component="span" sx={{ color: "#8B5CF6" }}>
                Property
              </Box>
            </Typography>

            <Typography
              sx={{
                color: "#24364E",
                fontSize: "16px",
                lineHeight: 1.7,
                fontWidth: 500,
              }}
            >
              Explore a wide range of verified residential and commercial
              properties. Find detailed listings with clear pricing and key
              specifications. Use filters to narrow down options that match your
              needs.
            </Typography>

            <Box>
              <Button
                variant="outlined"
                sx={{
                  mt: 7,
                  width: 282,
                  height: 50,
                  borderRadius: "8px",
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: "16px",
                  borderColor: "#8B5CF6",
                  color: "#8B5CF6",

                  bgcolor: "#ffffff",
                }}
              >
                Contact Us
              </Button>
            </Box>
          </Stack>

          {/* RIGHT IMAGE */}
          <Box
            sx={{
              // ❌ REMOVED: mr: 3
              width: { xs: "100%", md: "660px" },
              height: { xs: "240px", sm: "360px", md: "460px" },
              borderRadius: "20px",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <Box
              component="img"
              src={HeroImage}
              alt="Property"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default HeroSection;
