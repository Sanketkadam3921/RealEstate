// src/components/WhyChooseZonix/WhyChooseZonix.jsx
import { Container, Grid, Stack, Typography, Box } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import SearchIcon from "@mui/icons-material/Search";
import ShieldIcon from "@mui/icons-material/Security";
import HelpIcon from "@mui/icons-material/HelpOutline";

import FeatureItem from "../../components/whychoosezonix/FeatureItem";
import CentralVisual from "../../components/whychoosezonix/CentralVisual";

export default function WhyChooseZonix() {
  return (
    <Box sx={{ bgcolor: "#ffffff", py: 12 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Stack spacing={1.5} alignItems="center" mb={10}>
          <Typography variant="h4" fontWeight={600}>
            Why Choose Zonix Realty ?
          </Typography>

          <Typography variant="subtitle2" color="text.secondary">
            Professional, Trusted, Transparent.
          </Typography>

          <Typography
            variant="body2"
            align="center"
            maxWidth={600}
            color="text.secondary"
          >
            We make property discovery simple, transparent, and reliable with
            verified listings and expert support.
          </Typography>
        </Stack>

        {/* Arc */}
        <Box
          sx={{
            width: "100%",
            height: 120,
            mb: -6,
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 1200 120">
            <path
              d="M0,120 Q600,0 1200,120"
              fill="none"
              stroke="#cfcfcf"
              strokeDasharray="5,5"
            />
          </svg>
        </Box>

        {/* Main layout */}
        <Grid container alignItems="center">
          {/* Left */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={12}>
              <FeatureItem
                icon={<VerifiedIcon sx={{ color: "#fff" }} />}
                title="Verified Listings"
                subtitle="Genuine Properties"
                description="All listings are verified to ensure quality and authenticity."
              />

              <FeatureItem
                icon={<ShieldIcon sx={{ color: "#fff" }} />}
                title="Trusted Agents"
                subtitle="Expert Guidance"
                description="Experienced agents assist you at every step of your property journey."
              />
            </Stack>
          </Grid>

          {/* Center */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CentralVisual />
          </Grid>

          {/* Right */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={12}>
              <FeatureItem
                icon={<SearchIcon sx={{ color: "#fff" }} />}
                title="Easy Search"
                subtitle="Smart Filters"
                description="Quickly find properties by location, type, budget, and size."
              />

              <FeatureItem
                icon={<HelpIcon sx={{ color: "#fff" }} />}
                title="Quick Inquiry"
                subtitle="Instant Connection"
                description="Reach out to property experts easily with our simple inquiry system."
              />
            </Stack>
          </Grid>
        </Grid>

        {/* Bottom */}
        <Stack alignItems="center" mt={10}>
          <Typography color="text.secondary">Explore</Typography>
        </Stack>
      </Container>
    </Box>
  );
}
