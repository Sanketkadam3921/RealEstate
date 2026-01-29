import { Box, Container, Stack, Typography } from "@mui/material";

// Icons
import VerifiedIcon from "../../assets/icons/Verifiedd.svg";
import ExpertGuidanceIcon from "../../assets/icons/ExpertGuidance.svg";

// Images
import BuildingImg from "../../assets/images/building-tall.png";
import VillaImg from "../../assets/images/villa.png";
import InteriorImg from "../../assets/images/interior.png";

const InfoCard = ({ icon, title, description, sx }) => {
  return (
    <Box
      sx={{
        width: { xs: "90%", sm: "100%", md: "400px" },
        p: { xs: 2.5, sm: 3 },
        borderRadius: { xs: "20px", sm: "30px" },
        backgroundColor: "#ffffff",
        boxShadow: "0px 10px 30px rgba(0,0,0,0.06)",
        display: "flex",
        gap: 2,
        alignItems: "flex-start",
        ...sx,
      }}
    >
      <Box
        component="img"
        src={icon}
        alt={title}
        sx={{
          width: { xs: 40, sm: 47 },
          height: { xs: 40, sm: 47 },
          flexShrink: 0,
        }}
      />

      <Stack spacing={0.5}>
        <Typography
          sx={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: { xs: "18px", sm: "20px" },
            fontWeight: 500,
            color: "#9b59ff",
            lineHeight: 1.3,
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: { xs: "14px", sm: "16px" },
            color: "#7a7a7a",
            lineHeight: 1.5,
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
    <Box sx={{ backgroundColor: "#F6F6F6", py: { xs: 5, sm: 7, md: 10 } }}>
      <Container maxWidth="lg">
        {/* MAIN ROW */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 4, sm: 5, md: 6 },
            alignItems: { xs: "flex-start", md: "center" },
          }}
        >
          {/* LEFT CONTENT */}
          <Stack spacing={{ xs: 2.5, sm: 3 }} sx={{ flex: 1 }}>
            <Typography
              sx={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: { xs: "28px", sm: "32px", md: "36px" },
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
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 300,
                fontSize: { xs: "15px", sm: "17px", md: "20px" },
                color: "#000000",
                maxWidth: "658px",
                lineHeight: 1.6,
              }}
            >
              Zonix Realty is a professional real estate platform offering
              verified residential and commercial properties. We simplify
              property discovery by combining transparency, technology, and
              expert support to help customers make confident decisions.
            </Typography>

            <Stack
              spacing={{ xs: 2, sm: 2.5, md: 3 }}
              sx={{
                mt: { xs: 1, sm: 2 },
                alignItems: { xs: "stretch", md: "flex-start" },
              }}
            >
              <InfoCard
                icon={VerifiedIcon}
                title="Verified Properties"
                description="Genuine and trusted property listings."
              />

              <InfoCard
                icon={ExpertGuidanceIcon}
                title="Expert Guidance"
                description="Professional support at every step."
                sx={{
                  alignSelf: { xs: "stretch", md: "flex-end" },
                }}
              />
            </Stack>
          </Stack>

          {/* RIGHT IMAGES */}
          <Box sx={{ flex: 1, width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
              }}
            >
              {/* Tall Image */}
              <Box
                component="img"
                src={BuildingImg}
                alt="Building"
                sx={{
                  width: { xs: "100%", sm: "62%" },
                  height: {
                    xs: "400px",
                    sm: "450px",
                    md: "557px",
                  },
                  objectFit: "cover",
                  borderRadius: { xs: "10px", sm: "7px" },
                }}
              />

              {/* Two stacked images - Hidden on mobile, visible from sm up */}
              <Stack
                spacing={2}
                sx={{
                  width: "38%",
                  display: { xs: "none", sm: "flex" },
                }}
              >
                <Box
                  component="img"
                  src={VillaImg}
                  alt="Villa"
                  sx={{
                    width: "100%",
                    height: { sm: "219px", md: "268px" },
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
                    height: { sm: "219px", md: "268px" },
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
