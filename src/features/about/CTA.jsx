import { Box, Container, Stack, Typography, Button } from "@mui/material";

const CTASection = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "294px",
        background:
          "linear-gradient(90deg, #D4E0F9 0%, #DCDBF5 50%, #E3D8F5 100%)",
        display: "flex",
        alignItems: "center",
        borderTop: "1px solid #bebaba",
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3} alignItems="center">
          {/* Heading */}
          <Typography
            sx={{
              fontFamily: "Montserrat",
              fontWeight: 600,
              fontSize: "36px",
              lineHeight: "160%",
              color: "#24364E",
              textAlign: "center",
              maxWidth: "677px",
            }}
          >
            Ready to find your perfect property?
          </Typography>

          {/* Subtitle */}
          <Typography
            sx={{
              fontSize: "14px",
              color: "#5f6c7b",
              textAlign: "center",
            }}
          >
            Explore verified listings or get in touch with our experts today.
          </Typography>

          {/* Buttons */}
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              sx={{
                width: "282px",
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
                width: "282px",
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
