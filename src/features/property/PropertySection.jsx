import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Container, Stack, Typography, Button } from "@mui/material";

import FeaturedPropertyCard from "../../components/cards/FeaturedPropertyCard";
import HeroSearchBar from "../home/HeroSearchBar";

// Static images
import img1 from "../../assets/images/p1.png";
import img2 from "../../assets/images/p2.png";
import img3 from "../../assets/images/p3.png";
import img4 from "../../assets/images/p4.png";
import img5 from "../../assets/images/p5.png";
import img6 from "../../assets/images/p6.png";
import img7 from "../../assets/images/p7.png";
import img8 from "../../assets/images/p8.png";
import img9 from "../../assets/images/p9.png";

const imagePool = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

const staticProperties = [
  {
    image: img1,
    title: "Luxury Apartment in Koregaon Park",
    location: "Baner, Pune",
    type: "Apartment / Villa",
    area: "1200 sq.ft",
    tag: "Buy",
  },
  {
    image: img2,
    title: "Beautiful 4 BHK Villa With Pool",
    location: "Pune",
    type: "Villa",
    area: "3000 sq.ft",
    tag: "Rent",
  },
  {
    image: img3,
    title: "Spacious Office Space in Baner",
    location: "Baner, Pune",
    type: "Villa",
    area: "3000 sq.ft",
    tag: "Commercial",
  },
  {
    image: img4,
    title: "Modern Apartment With City Views",
    location: "Baner, Pune",
    type: "Villa",
    area: "1500 sq.ft",
    tag: "Buy",
  },
  {
    image: img5,
    title: "Prime Commercial Plot in Hinjewadi",
    location: "Hinjewadi, Pune",
    type: "Plot",
    area: "5000 sq.ft",
    tag: "Commercial",
  },
  {
    image: img6,
    title: "Contemporary 3 BHK Apartment",
    location: "Maharashtra",
    type: "Apartment",
    area: "1300 sq.ft",
    tag: "Rent",
  },
  {
    image: img7,
    title: "Luxury 5 BHK Villa",
    location: "Goa",
    type: "Villa",
    area: "5000 sq.ft",
    tag: "Buy",
  },
  {
    image: img8,
    title: "Residential Plot in Whitefield",
    location: "Mahabaleshwar",
    type: "Plot",
    area: "3500 sq.ft",
    tag: "Buy",
  },
  {
    image: img9,
    title: "Prime Office Space",
    location: "Baner, Pune",
    type: "Office",
    area: "2500 sq.ft",
    tag: "Commercial",
  },
];

export default function PropertiesSection() {
  const [searchParams] = useSearchParams();
  const [showAll, setShowAll] = useState(false);
  const [dynamicProperties, setDynamicProperties] = useState([]);

  // 🔥 Search/filter states - initialize from URL params
  const [searchText, setSearchText] = useState(
    searchParams.get("search") || "",
  );
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [type, setType] = useState(searchParams.get("type") || "");
  const [budget, setBudget] = useState(searchParams.get("budget") || "");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("properties")) || [];
    const imageMap = JSON.parse(localStorage.getItem("propertyImageMap")) || {};

    const getStableImage = (id) => {
      if (!imageMap[id]) {
        imageMap[id] = imagePool[Math.floor(Math.random() * imagePool.length)];
      }
      return imageMap[id];
    };

    const mapped = stored.map((item) => ({
      image: getStableImage(item.id),
      title: item.name,
      location: item.location,
      type: item.details,
      area: item.details.split(" ")[0] + " sq.ft",
      tag: item.status,
    }));

    localStorage.setItem("propertyImageMap", JSON.stringify(imageMap));
    setDynamicProperties(mapped);
  }, []);

  const allProperties = showAll
    ? [...staticProperties, ...dynamicProperties]
    : staticProperties;

  // 🔥 FILTER LOGIC
  const displayedProperties = useMemo(() => {
    return allProperties.filter((p) => {
      const matchSearch =
        p.title.toLowerCase().includes(searchText.toLowerCase()) ||
        p.location.toLowerCase().includes(searchText.toLowerCase());

      const matchLocation =
        !location || p.location.toLowerCase().includes(location);

      const matchType = !type || p.type.toLowerCase().includes(type);

      const matchBudget = (() => {
        if (!budget) return true;
        const areaNum = parseInt(p.area);
        if (budget === "20-50") return areaNum <= 1500;
        if (budget === "50-100") return areaNum <= 3000;
        if (budget === "100+") return areaNum > 3000;
        return true;
      })();

      return matchSearch && matchLocation && matchType && matchBudget;
    });
  }, [allProperties, searchText, location, type, budget]);

  return (
    <Box sx={{ backgroundColor: "#ffffff", py: { xs: 6, md: 5 } }}>
      <Container maxWidth={false} sx={{ maxWidth: 1440 }}>
        <Stack spacing={1} alignItems="center" mb={4}>
          <Typography
            variant="h4"
            fontWeight={500}
            sx={{ fontSize: { xs: "26px", md: "36px" }, color: "#24364E" }}
          >
            Properties
          </Typography>
          <Typography
            sx={{ fontSize: "16px", textAlign: "center", color: "#24364E" }}
          >
            Explore some of the best properties available right now
          </Typography>
        </Stack>

        {/* ✅ Pass props */}
        <Box mb={{ xs: 4, md: 9 }}>
          <HeroSearchBar
            searchText={searchText}
            setSearchText={setSearchText}
            location={location}
            setLocation={setLocation}
            type={type}
            setType={setType}
            budget={budget}
            setBudget={setBudget}
          />
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            rowGap: { xs: 3, md: 4 },
            columnGap: { xs: 2, md: 3 },
            justifyItems: "center",
          }}
        >
          {displayedProperties.map((item, index) => (
            <FeaturedPropertyCard key={index} {...item} />
          ))}
        </Box>

        {displayedProperties.length === 0 && (
          <Stack alignItems="center" mt={6}>
            <Typography sx={{ color: "#666", fontSize: "18px" }}>
              No properties found matching your criteria
            </Typography>
          </Stack>
        )}

        {!showAll && dynamicProperties.length > 0 && (
          <Stack alignItems="center" mt={6}>
            <Button
              variant="contained"
              onClick={() => setShowAll(true)}
              sx={{
                px: 5,
                py: 1.4,
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "15px",
                backgroundColor: "#A237FF",
                "&:hover": { backgroundColor: "#8B2FF2" },
              }}
            >
              Explore More →
            </Button>
          </Stack>
        )}
      </Container>
    </Box>
  );
}
