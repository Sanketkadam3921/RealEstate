import { Box, Container, Stack, Typography, Button } from "@mui/material";

const CTASection = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: "auto", md: "294px" },
        py: { xs: 6, md: 0 },
        background:
          "linear-gradient(90deg, #D4E0F9 0%, #DCDBF5 50%, #E3D8F5 100%)",
        display: "flex",
        alignItems: "center",
        borderTop: "1px solid #bebaba",
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3} alignItems="center" textAlign="center">
          {/* Heading */}
          <Typography
            sx={{
              fontFamily: "Montserrat",
              fontWeight: 600,
              fontSize: { xs: "24px", sm: "30px", md: "36px" },
              lineHeight: "160%",
              color: "#24364E",
              maxWidth: "677px",
            }}
          >
            Ready to find your perfect property?
          </Typography>

          {/* Subtitle */}
          <Typography
            sx={{
              fontSize: { xs: "15px", md: "17px" },
              color: "#5f6c7b",
            }}
          >
            Explore verified listings or get in touch with our experts today.
          </Typography>

          {/* Buttons */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ width: "100%", justifyContent: "center" }}
          >
            <Button
              variant="contained"
              sx={{
                width: { xs: "100%", sm: "240px", md: "282px" },
                height: "46px",
                backgroundColor: "#8f3cff",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 500,
                textTransform: "none",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#7a2fe0",
                },
              }}
            >
              View Properties
            </Button>

            <Button
              variant="outlined"
              sx={{
                width: { xs: "100%", sm: "240px", md: "282px" },
                height: "46px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 500,
                textTransform: "none",
                color: "#8f3cff",
                borderColor: "#8f3cff",
                "&:hover": {
                  borderColor: "#7a2fe0",
                  backgroundColor: "rgba(143,60,255,0.05)",
                },
              }}
            >
              Contact Us
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default CTASection;
