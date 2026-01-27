// src/components/FeaturedProperties.jsx
import { Box, Stack, Typography, Container } from "@mui/material";
import FeaturedPropertyCard from "../../components/cards/FeaturedPropertyCard";

// images
import Img1 from "../../assets/images/modern-2bhk.png";
import Img2 from "../../assets/images/premium-villa.png";
import Img3 from "../../assets/images/spacious-1bhk.png";

export default function FeaturedProperties() {
  return (
    <Box
      sx={{
        width: "100%",
        py: { xs: 6, sm: 8, md: 10 },
        background:
          "linear-gradient(180deg, #DDE2FC 0%, #DADCF5 50%, #E4D7F5 100%)",
      }}
    >
      <Container
        maxWidth="false"
        sx={{
          maxWidth: 1440,
        }}
      >
        {/* Heading */}
        <Stack spacing={2} alignItems="center" mb={{ xs: 4, sm: 6, md: 8 }}>
          <Typography
            variant="h4"
            fontWeight={500}
            color="#1f2a44"
            sx={{
              fontSize: { xs: "24px", sm: "28px", md: "36px" },
              textAlign: "center",
            }}
          >
            Featured Properties
          </Typography>

          <Typography
            variant="body1"
            color="#6b7280"
            textAlign="center"
            sx={{
              fontSize: { xs: "14px", sm: "15px", md: "16px" },
              px: { xs: 2, sm: 0 },
            }}
          >
            Explore some of the best properties available right now.
          </Typography>
        </Stack>

        {/* Cards */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="center"
          alignItems="center"
          gap={{ xs: 3, sm: 2, md: 4, lg: "58px" }}
          sx={{ flexWrap: { sm: "wrap" } }}
        >
          <FeaturedPropertyCard
            image={Img1}
            title="Modern 2 BHK Apartment"
            location="Baner, Pune"
            type="Apartment / Villa"
            area="1200 sq ft"
          />

          <FeaturedPropertyCard
            image={Img2}
            title="Premium 3 BHK Villa"
            location="Wakad, Pune"
            type="Villa"
            area="1800 sq ft"
          />

          <FeaturedPropertyCard
            image={Img3}
            title="Spacious 1 BHK Flat"
            location="Hinjewadi, Pune"
            type="Apartment"
            area="650 sq ft"
          />
        </Stack>
      </Container>
    </Box>
  );
}
