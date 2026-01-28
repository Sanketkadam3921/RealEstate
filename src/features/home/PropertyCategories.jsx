// src/components/PropertyCategories.jsx
import { Box, Typography, Stack, Container } from "@mui/material";
import PropertyCategoryCard from "../../components/cards/PropertyCategoryCard";

// images
import BuyImg from "../../assets/images/Buy.png";
import RentImg from "../../assets/images/Rent.png";
import CommercialImg from "../../assets/images/Commercial.png";

export default function PropertyCategories() {
  return (
    <Box
      sx={{
        width: "100%",
        py: { xs: 6, sm: 1, md: 1 },
        backgroundColor: "#F6F6F6",
      }}
    >
      <Container maxWidth="false" sx={{ maxWidth: 1440 }}>
        {/* Heading */}
        <Stack spacing={2} alignItems="center" mb={{ xs: 4, sm: 6, md: 8 }}>
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: "24px", sm: "28px", md: "35px" },
              fontWeight: 500,
              color: "#1f2a44",
              fontFamily: "Montserrat, sans-serif",
              textAlign: "center",
            }}
          >
            Property Categories
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "14px", sm: "15px", md: "16px" },
              fontFamily: "Montserrat, sans-serif",
              color: "#6b7280",
              maxWidth: 820,
              textAlign: "center",
              px: { xs: 2, sm: 0 },
            }}
          >
            Explore properties tailored to your needs — whether you're buying,
            renting, or investing in commercial spaces.
          </Typography>
        </Stack>

        {/* Cards */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="center"
          alignItems="center"
          gap={{ xs: 4, sm: 3, md: 3, lg: "80px", xl: "120px" }}
          sx={{ flexWrap: { sm: "wrap" } }}
        >
          <PropertyCategoryCard image={BuyImg} label="Buy" />
          <PropertyCategoryCard image={RentImg} label="Rent" />
          <PropertyCategoryCard image={CommercialImg} label="Commercial" />
        </Stack>
      </Container>
    </Box>
  );
}
