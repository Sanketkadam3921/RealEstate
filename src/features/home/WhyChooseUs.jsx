import { Container, Grid, Stack, Typography, Box } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import SearchIcon from "@mui/icons-material/Search";
import ShieldIcon from "@mui/icons-material/Security";
import HelpIcon from "@mui/icons-material/HelpOutline";
import FeatureItem from "../../components/whychoosezonix/FeatureItem";
import CentralVisual from "../../components/whychoosezonix/CentralVisual";
export default function WhyChooseZonix() {
  return (
    <Box sx={{ bgcolor: "#F6F6F6", py: { xs: 6, sm: 8, md: 12 } }}>
      {" "}
      <Container maxWidth="lg">
        {" "}
        {/* Header */}{" "}
        <Stack spacing={1.5} alignItems="center" mb={{ xs: 4, sm: 6, md: 1 }}>
          {" "}
          <Typography
            variant="h4"
            fontWeight={500}
            sx={{
              fontSize: { xs: "24px", sm: "28px", md: "36px" },
              color: "#24364E",
              textAlign: "center",
            }}
          >
            {" "}
            Why Choose Zonix Realty ?{" "}
          </Typography>{" "}
          <Typography
            variant="subtitle2"
            color="text.secondary"
            fontWeight={500}
            sx={{
              fontSize: { xs: "14px", sm: "15px", md: "16px" },
              textAlign: "center",
            }}
          >
            {" "}
            Professional, Trusted, Transparent.{" "}
          </Typography>{" "}
          <Typography
            variant="body2"
            align="center"
            maxWidth={800}
            color="text.secondary"
            fontWeight={500}
            sx={{
              fontSize: { xs: "13px", sm: "14px", md: "16px" },
              px: { xs: 2, sm: 0 },
            }}
          >
            {" "}
            We make property discovery simple, transparent, and reliable with
            verified listings and expert support.{" "}
          </Typography>{" "}
        </Stack>{" "}
        {/* Arc - More curved */}{" "}
        <Box
          sx={{
            top: -120,
            position: "relative",
            width: "100%",
            height: { xs: 0, md: 150 },
            overflow: "visible",
            mt: { xs: 4, md: 14 },
            display: { xs: "none", md: "block" },
          }}
        >
          {" "}
          <svg
            width="100%"
            height="150"
            viewBox="0 0 1312 150"
            preserveAspectRatio="none"
            style={{ position: "absolute", top: 0, left: 0 }}
          >
            {" "}
            <path
              d="M0,150 Q656,-20 1312,150"
              fill="none"
              stroke="#444444"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />{" "}
          </svg>{" "}
        </Box>{" "}
        {/* Main layout */}{" "}
        <Grid
          container
          alignItems="center"
          sx={{ mt: { xs: 4, md: -16 } }}
          spacing={{ xs: 4, md: 0 }}
        >
          {" "}
          {/* Left */}{" "}
          <Grid size={{ xs: 12, md: 3 }}>
            {" "}
            <Stack spacing={{ xs: 4, sm: 6, md: 35 }}>
              {" "}
              <FeatureItem
                icon={<VerifiedIcon sx={{ color: "#fff" }} />}
                title="Verified Listings"
                subtitle="Genuine Properties"
                description="All listings are verified to ensure quality and authenticity."
              />{" "}
              <Box
                sx={{
                  transform: {
                    xs: "none",
                    md: "translateY(-60px)", // 👈 ONLY this item moves
                    lg: "none",
                  },
                }}
              >
                <FeatureItem
                  icon={<ShieldIcon sx={{ color: "#fff" }} />}
                  title="Trusted Agents"
                  subtitle="Expert Guidance"
                  description="Experienced agents assist you at every step of your property journey."
                />
              </Box>
            </Stack>{" "}
          </Grid>{" "}
          {/* Center */}{" "}
          <Grid size={{ xs: 12, md: 6 }}>
            {" "}
            <CentralVisual />{" "}
          </Grid>{" "}
          {/* Right */} {/* Right */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Stack spacing={{ xs: 4, sm: 6, md: 35 }}>
              <FeatureItem
                icon={<SearchIcon sx={{ color: "#fff" }} />}
                title="Easy Search"
                subtitle="Smart Filters"
                description="Quickly find properties by location, type, budget, and size."
              />

              <Box
                sx={{
                  transform: {
                    xs: "none",
                    md: "translateY(-60px)", // 👈 ONLY second item lifted
                    lg: "none",
                  },
                }}
              >
                <FeatureItem
                  icon={<HelpIcon sx={{ color: "#fff" }} />}
                  title="Quick Inquiry"
                  subtitle="Instant Connection"
                  description="Reach out to property experts easily with our simple inquiry system."
                />
              </Box>
            </Stack>
          </Grid>
        </Grid>{" "}
        {/* Bottom - Hidden on mobile, visible on tablet+ */}{" "}
        <Box
          sx={{ mt: { xs: 4, md: -12 }, display: { xs: "none", md: "block" } }}
        >
          {" "}
          <Stack
            direction="row"
            alignItems="flex-end"
            justifyContent="center"
            spacing={2}
          >
            {" "}
            <svg width="533" height="88" viewBox="0 0 533 88" fill="none">
              {" "}
              <path
                d=" M1 1 V73 Q1 87 15 87 H532 "
                stroke="#444444"
                strokeWidth="1"
              />{" "}
            </svg>{" "}
            {/* Text */}{" "}
            <Typography
              color="text.secondary"
              sx={{ fontSize: { md: 18 } }}
              fontWeight={500}
            >
              {" "}
              Explore{" "}
            </Typography>{" "}
            {/* Right curved line */}{" "}
            <svg width="533" height="88" viewBox="0 0 533 88" fill="none">
              {" "}
              <path
                d=" M532 1 V73 Q532 87 518 87 H1 "
                stroke="#444444"
                strokeWidth="1"
              />{" "}
            </svg>{" "}
          </Stack>{" "}
        </Box>{" "}
      </Container>{" "}
    </Box>
  );
}
