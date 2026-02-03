import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Stack,
  Typography,
  Button,
  Chip,
  Divider,
} from "@mui/material";
import {
  LocationOn,
  Home,
  Straighten,
  AccountBalance,
  ArrowBack,
  Bathtub,
  DirectionsCar,
  Layers,
  Weekend,
  Explore,
  CalendarToday,
} from "@mui/icons-material";

// Import the same images
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
    id: "1",
    image: img1,
    title: "Luxury Apartment in Koregaon Park",
    location: "Baner, Pune",
    type: "Apartment / Villa",
    area: "1200 sq.ft",
    tag: "Buy",
    price: "₹85 Lacs",
    description:
      "Experience luxury living at its finest in this stunning apartment located in the heart of Koregaon Park. This property features modern amenities, spacious rooms, and is situated in one of Pune's most desirable neighborhoods.",
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    floor: "5th Floor",
    furnished: "Semi-Furnished",
    facing: "East",
    ageOfProperty: "2 Years",
    amenities: [
      "Swimming Pool",
      "Gym",
      "24/7 Security",
      "Power Backup",
      "Children's Play Area",
      "Clubhouse",
      "Landscaped Garden",
      "Lift",
    ],
  },
  {
    id: "2",
    image: img2,
    title: "Beautiful 4 BHK Villa With Pool",
    location: "Pune",
    type: "Villa",
    area: "3000 sq.ft",
    tag: "Rent",
    price: "₹45K/mo",
    description:
      "A magnificent 4 BHK villa featuring a private swimming pool and beautifully landscaped garden. Perfect for families looking for spacious and luxurious living in Pune.",
    bedrooms: 4,
    bathrooms: 4,
    parking: 3,
    floor: "Independent",
    furnished: "Fully Furnished",
    facing: "North",
    ageOfProperty: "1 Year",
    amenities: [
      "Private Pool",
      "Garden",
      "Servant Quarters",
      "Power Backup",
      "24/7 Security",
      "Modular Kitchen",
      "Terrace",
      "Covered Parking",
    ],
  },
  {
    id: "3",
    image: img3,
    title: "Spacious Office Space in Baner",
    location: "Baner, Pune",
    type: "Villa",
    area: "3000 sq.ft",
    tag: "Commercial",
    price: "₹1.2 Cr",
    description:
      "Premium commercial office space in the bustling business district of Baner. Ideal for corporate offices, startups, or co-working spaces with modern infrastructure.",
    bedrooms: null,
    bathrooms: 4,
    parking: 5,
    floor: "3rd & 4th Floor",
    furnished: "Bare Shell",
    facing: "West",
    ageOfProperty: "New Construction",
    amenities: [
      "Conference Rooms",
      "High-Speed Internet",
      "Central AC",
      "Power Backup",
      "24/7 Security",
      "Cafeteria",
      "Ample Parking",
      "Lift",
    ],
  },
  {
    id: "4",
    image: img4,
    title: "Modern Apartment With City Views",
    location: "Baner, Pune",
    type: "Villa",
    area: "1500 sq.ft",
    tag: "Buy",
    price: "₹95 Lacs",
    description:
      "Contemporary designed apartment offering breathtaking city views. Features high-quality finishes and is located in a prime residential area with excellent connectivity.",
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    floor: "12th Floor",
    furnished: "Semi-Furnished",
    facing: "South-West",
    ageOfProperty: "Under Construction",
    amenities: [
      "Swimming Pool",
      "Gym",
      "Jogging Track",
      "Multipurpose Hall",
      "24/7 Security",
      "Power Backup",
      "Lift",
      "Garden",
    ],
  },
  {
    id: "5",
    image: img5,
    title: "Prime Commercial Plot in Hinjewadi",
    location: "Hinjewadi, Pune",
    type: "Plot",
    area: "5000 sq.ft",
    tag: "Commercial",
    price: "₹2.5 Cr",
    description:
      "Strategically located commercial plot in Hinjewadi IT Park area. Perfect for developing office buildings, retail spaces, or mixed-use developments in Pune's tech hub.",
    bedrooms: null,
    bathrooms: null,
    parking: null,
    floor: "N/A",
    furnished: "N/A",
    facing: "Corner Plot",
    ageOfProperty: "N/A",
    amenities: [
      "Corner Plot",
      "Wide Road Frontage",
      "Clear Title",
      "MIDC Approved",
      "Water Connection",
      "Electricity Available",
      "Near IT Parks",
      "Metro Connectivity (Upcoming)",
    ],
  },
  {
    id: "6",
    image: img6,
    title: "Contemporary 3 BHK Apartment",
    location: "Maharashtra",
    type: "Apartment",
    area: "1300 sq.ft",
    tag: "Rent",
    price: "₹35K/mo",
    description:
      "Stylish and modern 3 BHK apartment with contemporary interiors. Located in a well-maintained society with all modern amenities for comfortable family living.",
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    floor: "7th Floor",
    furnished: "Fully Furnished",
    facing: "East",
    ageOfProperty: "3 Years",
    amenities: [
      "Clubhouse",
      "Swimming Pool",
      "Gym",
      "Children's Play Area",
      "24/7 Security",
      "Power Backup",
      "Lift",
      "Visitor Parking",
    ],
  },
  {
    id: "7",
    image: img7,
    title: "Luxury 5 BHK Villa",
    location: "Goa",
    type: "Villa",
    area: "5000 sq.ft",
    tag: "Buy",
    price: "₹3.5 Cr",
    description:
      "Spectacular luxury villa in Goa offering a perfect blend of modern architecture and coastal living. Features expansive living spaces, private pool, and is just minutes from the beach.",
    bedrooms: 5,
    bathrooms: 5,
    parking: 4,
    floor: "Independent",
    furnished: "Fully Furnished",
    facing: "Sea Facing",
    ageOfProperty: "New",
    amenities: [
      "Private Pool",
      "Sea View",
      "Garden",
      "Servant Quarters",
      "Home Theater",
      "Wine Cellar",
      "Smart Home Features",
      "Solar Panels",
    ],
  },
  {
    id: "8",
    image: img8,
    title: "Residential Plot in Whitefield",
    location: "Mahabaleshwar",
    type: "Plot",
    area: "3500 sq.ft",
    tag: "Buy",
    price: "₹75 Lacs",
    description:
      "Prime residential plot in the serene hills of Mahabaleshwar. Perfect for building your dream vacation home surrounded by nature and pleasant weather year-round.",
    bedrooms: null,
    bathrooms: null,
    parking: null,
    floor: "N/A",
    furnished: "N/A",
    facing: "Valley Facing",
    ageOfProperty: "N/A",
    amenities: [
      "Hill View",
      "Clear Title",
      "Panchayat Approved",
      "Water Connection",
      "Electricity Available",
      "Gated Community",
      "24/7 Security",
      "Tar Road Access",
    ],
  },
  {
    id: "9",
    image: img9,
    title: "Prime Office Space",
    location: "Baner, Pune",
    type: "Office",
    area: "2500 sq.ft",
    tag: "Commercial",
    price: "₹1.8 Cr",
    description:
      "Premium office space in a corporate building located in Baner's business district. Features modern infrastructure, ample parking, and excellent connectivity to major IT hubs.",
    bedrooms: null,
    bathrooms: 3,
    parking: 6,
    floor: "6th Floor",
    furnished: "Semi-Furnished",
    facing: "North-East",
    ageOfProperty: "1 Year",
    amenities: [
      "Conference Rooms",
      "Cafeteria",
      "High-Speed Internet",
      "Central AC",
      "Power Backup",
      "24/7 Security",
      "Lift",
      "Reserved Parking",
    ],
  },
];

const DetailItem = ({ icon: Icon, label, value }) => (
  <Box sx={{ flex: { xs: "1 1 45%", sm: "1 1 30%", md: "1 1 22%" } }}>
    <Stack spacing={1} alignItems="center">
      <Icon sx={{ color: "#A237FF", fontSize: { xs: 28, md: 32 } }} />
      <Typography
        variant="caption"
        sx={{ color: "#888", fontSize: { xs: "11px", md: "12px" } }}
      >
        {label}
      </Typography>
      <Typography
        fontWeight={600}
        sx={{
          fontSize: { xs: "13px", md: "14px" },
          textAlign: "center",
        }}
      >
        {value}
      </Typography>
    </Stack>
  </Box>
);

const PropertyDetailRow = ({ label, value }) => (
  <Stack spacing={0.5}>
    <Typography
      variant="caption"
      sx={{ color: "#888", fontSize: { xs: "12px", md: "13px" } }}
    >
      {label}
    </Typography>
    <Typography
      fontWeight={600}
      sx={{
        fontSize: { xs: "14px", md: "15px" },
        color: "#1a1a1a",
      }}
    >
      {value}
    </Typography>
  </Stack>
);

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const property = staticProperties.find((p) => p.id === id);

  if (!property) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: "center" }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontSize: { xs: "24px", md: "32px" } }}
        >
          Property not found
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/property")}
          sx={{
            mt: 2,
            px: 4,
            py: 1.5,
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: 600,
            backgroundColor: "#A237FF",
            "&:hover": { backgroundColor: "#8B2FF2" },
          }}
        >
          Back to Properties
        </Button>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "#fafafa",
        minHeight: "100vh",
        py: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth="lg">
        {/* Back Button */}
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate("/property")}
          sx={{
            mb: { xs: 2, md: 3 },
            color: "#A237FF",
            textTransform: "none",
            fontWeight: 600,
            fontSize: { xs: "14px", md: "15px" },
            "&:hover": { backgroundColor: "rgba(162, 55, 255, 0.08)" },
          }}
        >
          Back to Properties
        </Button>

        {/* Main Layout - Flex Container */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 3, md: 4 }}
          sx={{ alignItems: "flex-start" }}
        >
          {/* Left Column - Main Content */}
          <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 65%" }, width: "100%" }}>
            <Stack spacing={{ xs: 2.5, md: 3 }}>
              {/* Hero Image */}
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: { xs: 280, sm: 400, md: 480 },
                  borderRadius: { xs: "12px", md: "16px" },
                  overflow: "hidden",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                }}
              >
                {property.tag && (
                  <Chip
                    label={property.tag}
                    sx={{
                      position: "absolute",
                      top: { xs: 16, md: 20 },
                      left: { xs: 16, md: 20 },
                      backgroundColor: "#A237FF",
                      color: "#ffffff",
                      fontWeight: 600,
                      fontSize: { xs: "14px", md: "16px" },
                      height: { xs: 36, md: 40 },
                      px: { xs: 2, md: 2.5 },
                      zIndex: 2,
                    }}
                  />
                )}
                <Box
                  component="img"
                  src={property.image}
                  alt={property.title}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>

              {/* Title & Price Card */}
              <Box
                sx={{
                  backgroundColor: "#ffffff",
                  p: { xs: 3, md: 4 },
                  borderRadius: { xs: "12px", md: "16px" },
                  boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                }}
              >
                <Stack spacing={3}>
                  {/* Title and Price */}
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    spacing={2}
                  >
                    <Typography
                      variant="h4"
                      fontWeight={700}
                      sx={{
                        fontSize: { xs: "22px", sm: "28px", md: "32px" },
                        color: "#1a1a1a",
                        lineHeight: 1.3,
                      }}
                    >
                      {property.title}
                    </Typography>
                    <Typography
                      variant="h5"
                      fontWeight={700}
                      sx={{
                        color: "#A237FF",
                        fontSize: { xs: "24px", sm: "26px", md: "28px" },
                        whiteSpace: "nowrap",
                      }}
                    >
                      {property.price}
                    </Typography>
                  </Stack>

                  <Divider />

                  {/* Key Details Icons */}
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: { xs: 2, md: 3 },
                      justifyContent: "space-between",
                    }}
                  >
                    <DetailItem
                      icon={LocationOn}
                      label="Location"
                      value={property.location}
                    />
                    <DetailItem
                      icon={Home}
                      label="Type"
                      value={property.type}
                    />
                    <DetailItem
                      icon={Straighten}
                      label="Area"
                      value={property.area}
                    />
                    {property.bedrooms && (
                      <DetailItem
                        icon={AccountBalance}
                        label="Bedrooms"
                        value={`${property.bedrooms} BHK`}
                      />
                    )}
                  </Box>

                  <Divider />

                  {/* Description */}
                  <Stack spacing={2}>
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      sx={{
                        fontSize: { xs: "18px", md: "20px" },
                        color: "#1a1a1a",
                      }}
                    >
                      About This Property
                    </Typography>
                    <Typography
                      sx={{
                        color: "#555",
                        lineHeight: 1.8,
                        fontSize: { xs: "14px", md: "15px" },
                      }}
                    >
                      {property.description}
                    </Typography>
                  </Stack>
                </Stack>
              </Box>

              {/* Amenities Card */}
              <Box
                sx={{
                  backgroundColor: "#ffffff",
                  p: { xs: 3, md: 4 },
                  borderRadius: { xs: "12px", md: "16px" },
                  boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight={600}
                  gutterBottom
                  sx={{
                    fontSize: { xs: "18px", md: "20px" },
                    mb: { xs: 2, md: 3 },
                    color: "#1a1a1a",
                  }}
                >
                  Amenities & Features
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: { xs: 1.5, md: 2 },
                  }}
                >
                  {property.amenities.map((amenity, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        px: { xs: 2, md: 2.5 },
                        py: { xs: 1.2, md: 1.5 },
                        borderRadius: "10px",
                        backgroundColor: "#f5f0ff",
                        border: "1px solid #e8d9ff",
                        flex: { xs: "1 1 calc(50% - 12px)", sm: "0 1 auto" },
                        minWidth: "fit-content",
                      }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor: "#A237FF",
                          flexShrink: 0,
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: { xs: "13px", md: "14px" },
                          color: "#333",
                          fontWeight: 500,
                        }}
                      >
                        {amenity}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Stack>
          </Box>

          {/* Right Column - Sidebar */}
          <Box
            sx={{
              flex: { xs: "1 1 100%", md: "1 1 35%" },
              width: "100%",
              position: { md: "sticky" },
              top: { md: 20 },
            }}
          >
            <Box
              sx={{
                backgroundColor: "#ffffff",
                p: { xs: 3, md: 3.5 },
                borderRadius: { xs: "12px", md: "16px" },
                boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                border: "1px solid #f0f0f0",
              }}
            >
              <Typography
                variant="h6"
                fontWeight={600}
                gutterBottom
                sx={{
                  fontSize: { xs: "18px", md: "20px" },
                  mb: { xs: 2.5, md: 3 },
                  color: "#1a1a1a",
                }}
              >
                Property Details
              </Typography>

              <Stack spacing={{ xs: 2.5, md: 3 }}>
                {property.bedrooms && (
                  <PropertyDetailRow
                    label="Bedrooms"
                    value={`${property.bedrooms} BHK`}
                  />
                )}

                {property.bathrooms && (
                  <PropertyDetailRow
                    label="Bathrooms"
                    value={property.bathrooms}
                  />
                )}

                {property.parking && (
                  <PropertyDetailRow
                    label="Parking"
                    value={`${property.parking} Cars`}
                  />
                )}

                <PropertyDetailRow label="Floor" value={property.floor} />

                <PropertyDetailRow
                  label="Furnishing Status"
                  value={property.furnished}
                />

                <PropertyDetailRow label="Facing" value={property.facing} />

                <PropertyDetailRow
                  label="Age of Property"
                  value={property.ageOfProperty}
                />
              </Stack>

              <Divider sx={{ my: { xs: 2.5, md: 3 } }} />

              {/* Action Buttons */}
              <Stack spacing={{ xs: 1.5, md: 2 }}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    py: { xs: 1.3, md: 1.5 },
                    borderRadius: "10px",
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: { xs: "15px", md: "16px" },
                    backgroundColor: "#A237FF",
                    boxShadow: "0 4px 16px rgba(162, 55, 255, 0.3)",
                    "&:hover": {
                      backgroundColor: "#8B2FF2",
                      boxShadow: "0 6px 20px rgba(162, 55, 255, 0.4)",
                    },
                  }}
                >
                  Contact Owner
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    py: { xs: 1.3, md: 1.5 },
                    borderRadius: "10px",
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: { xs: "15px", md: "16px" },
                    borderColor: "#A237FF",
                    color: "#A237FF",
                    borderWidth: 2,
                    "&:hover": {
                      borderColor: "#8B2FF2",
                      backgroundColor: "rgba(162, 55, 255, 0.08)",
                      borderWidth: 2,
                    },
                  }}
                >
                  Schedule Visit
                </Button>
              </Stack>
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
