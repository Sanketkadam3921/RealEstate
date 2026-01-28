// src/components/Testimonials/Testimonials.jsx
import { Box, Container, Stack, Typography } from "@mui/material";
import TestimonialCard from "../../components/cards/TestimonialCard";

// images
import User1 from "../../assets/images/user1.png";
import User2 from "../../assets/images/user2.png";

export default function Testimonials() {
  return (
    <Box
      sx={{
        width: "100%",
        py: { xs: 6, sm: 8, md: 10 },
        background:
          "linear-gradient(180deg, #FCE2FC 0%, #DEDDF5 50%, #E5D7F5 100%)",
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Stack spacing={1.5} alignItems="center" mb={{ xs: 4, sm: 6, md: 8 }}>
          <Typography
            variant="h4"
            fontWeight={500}
            sx={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: { xs: "24px", sm: "28px", md: "36px" },
              textAlign: "center",
              color: "#000000",
            }}
          >
            Testimonials
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            fontWeight={400}
            sx={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: { xs: "15px", sm: "16px" },
              textAlign: "center",
              px: { xs: 2, sm: 0 },
            }}
          >
            Real stories from real people who found their perfect property with
            us.
          </Typography>
        </Stack>

        {/* Cards */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="center"
          alignItems="center"
          gap={{ xs: 4, sm: 3, md: 4, lg: "40px" }}
        >
          <TestimonialCard
            avatar={User1}
            text="Working with Square was seamless from start to finish. They understood exactly what we were looking for and helped us find our dream home in no time. Highly professional and trustworthy."
            name="Ravi Shinde."
            role="CEO, Let's Connect"
            rating={4}
          />

          <TestimonialCard
            avatar={User2}
            text="The entire property-buying experience was smooth and well-organized. The team clearly understood our requirements and presented verified options that matched our expectations."
            name="Rahul Joshi."
            role="CEO, Let's Connect"
            rating={4}
          />
        </Stack>
      </Container>
    </Box>
  );
}
