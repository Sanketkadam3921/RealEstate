import { Box, Container, Stack, Typography, Button } from "@mui/material";

// Components
import FeaturedPropertyCard from "../../components/cards/FeaturedPropertyCard";
import HeroSearchBar from "../home/HeroSearchBar";

// Images (replace paths if needed)
import img1 from "../../assets/images/p1.png";
import img2 from "../../assets/images/p2.png";
import img3 from "../../assets/images/p3.png";
import img4 from "../../assets/images/p4.png";
import img5 from "../../assets/images/p5.png";
import img6 from "../../assets/images/p6.png";
import img7 from "../../assets/images/p7.png";
import img8 from "../../assets/images/p8.png";
import img9 from "../../assets/images/p9.png";

const properties = [
  {
    image: img1,
    title: "Luxury Apartment in Koregaon Park",
    location: "Baner, Pune",
    type: "Apartment / Villa",
    area: "1200 sq.ft",
  },
  {
    image: img2,
    title: "Beautiful 4 BHK Villa With Pool",
    location: "Pune",
    type: "Villa",
    area: "3000 sq.ft",
  },
  {
    image: img3,
    title: "Spacious Office Space in Baner",
    location: "Baner, Pune",
    type: "Villa",
    area: "3000 sq.ft",
  },
  {
    image: img4,
    title: "Modern Apartment With City Views",
    location: "Baner, Pune",
    type: "Villa",
    area: "1500 sq.ft",
  },
  {
    image: img5,
    title: "Prime Commercial Plot in Hinjewadi",
    location: "Hinjewadi, Pune",
    type: "Plot",
    area: "5000 sq.ft",
  },
  {
    image: img6,
    title: "Contemporary 3 BHK Apartment",
    location: "Maharashtra",
    type: "Plot",
    area: "1300 sq.ft",
  },
  {
    image: img7,
    title: "Luxury 5 BHK Villa",
    location: "Goa",
    type: "Villa",
    area: "5000 sq.ft",
  },
  {
    image: img8,
    title: "Residential Plot in Whitefield",
    location: "Mahabaleshwar",
    type: "Plot",
    area: "3500 sq.ft",
  },
  {
    image: img9,
    title: "Prime Office Space",
    location: "Baner, Pune",
    type: "Office",
    area: "2500 sq.ft",
  },
];

export default function PropertiesSection() {
  return (
    <Box sx={{ backgroundColor: "#F9FAFB", py: { xs: 6, md: 10 } }}>
      <Container maxWidth="false" sx={{ maxWidth: 1440 }}>
        {/* Header */}
        <Stack spacing={1} alignItems="center" mb={4}>
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{ fontSize: { xs: "26px", md: "32px" } }}
          >
            Properties
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ fontSize: "14px", textAlign: "center" }}
          >
            Explore some of the best properties available right now
          </Typography>
        </Stack>

        {/* Search Bar */}
        <Box mb={{ xs: 4, md: 6 }}>
          <HeroSearchBar />
        </Box>

        {/* Property Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: { xs: 3, md: 4 },
            justifyItems: "center",
          }}
        >
          {properties.map((item, index) => (
            <FeaturedPropertyCard key={index} {...item} />
          ))}
        </Box>

        {/* Explore More Button */}
        <Stack alignItems="center" mt={6}>
          <Button
            variant="contained"
            sx={{
              px: 5,
              py: 1.4,
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "15px",
              backgroundColor: "#A237FF",
              "&:hover": {
                backgroundColor: "#8B2FF2",
              },
            }}
          >
            Explore More →
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
