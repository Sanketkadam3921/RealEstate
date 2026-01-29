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
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 600,
              fontSize: { xs: "24px", sm: "30px", md: "36px" },
              lineHeight: "160%",
              color: "#24364E",
              maxWidth: "877px",
            }}
          >
            Ready to find your perfect property?
          </Typography>

          {/* Subtitle */}
          <Typography
            sx={{
              fontWeight: 600,
              fontFamily: "Montserrat, sans-serif",
              fontSize: { xs: "15px", md: "17px" },
              color: "#24364E",
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
                height: "50px",
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
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default CTASection;
