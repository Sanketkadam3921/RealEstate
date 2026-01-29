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
        pt: { xs: 6, sm: 8, md: 3 },
        pb: { xs: 6, sm: 8, md: 10 },

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
        <Stack
          spacing={2}
          alignItems="center"
          mb={{ xs: 4, sm: 6, md: 8, lg: 1 }}
        >
          <Typography
            variant="h4"
            fontWeight={500}
            color="#24364E"
            sx={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: { xs: "24px", sm: "28px", md: "36px" },
              textAlign: "center",
            }}
          >
            Featured Properties
          </Typography>

          <Typography
            variant="body1"
            color="#24364E"
            textAlign="center"
            sx={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: { xs: "14px", sm: "15px", md: "16px" },
              px: { xs: 2, sm: 0 },
              pb: 5,
            }}
          >
            Explore some of the best properties available right now.
          </Typography>
        </Stack>

        {/* Cards */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
            alignItems: "center",
            flexWrap: { sm: "wrap" },
            gap: { xs: 3, sm: 2, md: 4, lg: 4 },
            maxWidth: { sm: "716px", md: "none" }, // Exactly 2 cards width: 350px + 16px gap + 350px = 716px
            mx: "auto",
            "@media (min-width: 768px) and (max-width: 899px)": {
              maxWidth: "716px", // Specific for iPad Mini (768px)
            },
          }}
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
        </Box>
      </Container>
    </Box>
  );
}
