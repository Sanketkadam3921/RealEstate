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
        py: 10,
        background:
          "linear-gradient(180deg, #FCE2FC 0%, #DEDDF5 50%, #E5D7F5 100%)",
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Stack spacing={1.5} alignItems="center" mb={8}>
          <Typography variant="h4" fontWeight={600}>
            Testimonials
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Real stories from real people who found their perfect property with
            us.
          </Typography>
        </Stack>

        {/* Cards */}
        <Stack direction="row" justifyContent="center" gap="40px">
          <TestimonialCard
            avatar={User1}
            text="Working with Square was seamless from start to finish. They understood exactly what we were looking for and helped us find our dream home in no time. Highly professional and trustworthy."
            name="Ravi Shinde."
            role="CEO, Let’s Connect"
            rating={4}
          />

          <TestimonialCard
            avatar={User2}
            text="The entire property-buying experience was smooth and well-organized. The team clearly understood our requirements and presented verified options that matched our expectations."
            name="Rahul Joshi."
            role="CEO, Let’s Connect"
            rating={4}
          />
        </Stack>
      </Container>
    </Box>
  );
}
