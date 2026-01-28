import { Box, Container, Stack, Typography } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

// Images
import BuildingImg from "../../assets/images/building-tall.png";
import VillaImg from "../../assets/images/villa.png";
import InteriorImg from "../../assets/images/interior.png";

const InfoCard = ({ icon, title, description, sx }) => {
  return (
    <Box
      sx={{
        width: "400px",
        p: 3,
        borderRadius: "30px",
        backgroundColor: "#ffffff",
        boxShadow: "0px 10px 30px rgba(0,0,0,0.06)",
        display: "flex",
        gap: 2,
        alignItems: "flex-start",
        ...sx,
      }}
    >
      <Box sx={{ color: "#9b59ff" }}>{icon}</Box>

      <Stack spacing={0.5}>
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: 500,
            color: "#9b59ff",
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            fontSize: "16px",
            color: "#7a7a7a",
          }}
        >
          {description}
        </Typography>
      </Stack>
    </Box>
  );
};

const ExclusivePropertySection = () => {
  return (
    <Box sx={{ backgroundColor: "#F6F6F6", py: 10 }}>
      <Container maxWidth="lg">
        {/* MAIN ROW */}
        <Box
          sx={{
            display: "flex",
            gap: 6,
            alignItems: "center",
          }}
        >
          {/* LEFT CONTENT */}
          <Stack spacing={3} sx={{ flex: 1 }}>
            <Typography
              sx={{
                fontSize: "36px",
                fontWeight: 600,
                color: "#1f2a44",
                lineHeight: 1.2,
                maxWidth: "658px",
              }}
            >
              The Exclusive And Premium Property
            </Typography>

            <Typography
              sx={{
                fontWeight: "300px",
                fontSize: "20px",
                color: "#6f6f6f",
                maxWidth: "658px",
                lineHeight: 1.6, // ✅ 160%
              }}
            >
              Zonix Realty is a professional real estate platform offering
              verified residential and commercial properties. We simplify
              property discovery by combining transparency, technology, and
              expert support to help customers make confident decisions.
            </Typography>

            <Stack spacing={3} mt={2}>
              <InfoCard
                icon={<VerifiedIcon />}
                title="Verified Properties"
                description="Genuine and trusted property listings."
              />

              <Box sx={{ ml: "180px" }}>
                <InfoCard
                  icon={<SupportAgentIcon />}
                  title="Expert Guidance"
                  description="Professional support at every step."
                />
              </Box>
            </Stack>
          </Stack>

          {/* RIGHT IMAGES */}
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: "flex", gap: 2 }}>
              {/* Tall Image */}
              <Box
                component="img"
                src={BuildingImg}
                alt="Building"
                sx={{
                  width: "62%",
                  height: "557px",
                  objectFit: "cover",
                  borderRadius: "7px",
                }}
              />

              {/* Two stacked images */}
              <Stack spacing={2} sx={{ width: "38%" }}>
                <Box
                  component="img"
                  src={VillaImg}
                  alt="Villa"
                  sx={{
                    width: "100%",
                    height: "268px",
                    objectFit: "cover",
                    borderRadius: "7px",
                  }}
                />

                <Box
                  component="img"
                  src={InteriorImg}
                  alt="Interior"
                  sx={{
                    width: "100%",
                    height: "268px",
                    objectFit: "cover",
                    borderRadius: "7px",
                  }}
                />
              </Stack>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ExclusivePropertySection;
