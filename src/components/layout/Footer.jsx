import {
  Box,
  Container,
  Stack,
  Typography,
  IconButton,
  Link,
} from "@mui/material";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import Logo from "../../assets/Logo/Logo.svg";

export default function Footer() {
  return (
    <Box bgcolor="#fff" pt={8}>
      {/* Top Footer */}
      <Container
        maxWidth={false}
        sx={{ maxWidth: "1440px", px: { xs: 2, md: 6 } }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={6}
          justifyContent="space-between"
        >
          {/* Brand */}
          <Stack spacing={2} maxWidth={300}>
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Box
                component="img"
                src={Logo}
                alt="Zonix Realty"
                sx={{ height: 40 }}
              />
            </Stack>

            <Typography variant="body2" color="text.secondary">
              Zonix Realty is a trusted real estate platform offering verified
              properties for buy, rent, and commercial needs. We simplify
              property discovery with transparency and expert support.
            </Typography>

            <Stack direction="row" spacing={1}>
              <IconButton size="small">
                <InstagramIcon />
              </IconButton>
              <IconButton size="small">
                <FacebookOutlinedIcon />
              </IconButton>
              <IconButton size="small">
                <LinkedInIcon />
              </IconButton>
            </Stack>
          </Stack>

          {/* Quick Links */}
          <Stack spacing={2}>
            <Typography fontWeight={600}>Quick Links</Typography>
            {["Home", "Properties", "About Us", "Contact"].map((item) => (
              <Link key={item} underline="hover" color="text.secondary">
                {item}
              </Link>
            ))}
          </Stack>

          {/* Services */}
          <Stack spacing={2}>
            <Typography fontWeight={600}>Our Services</Typography>
            {[
              "Residential Properties",
              "Commercial Properties",
              "Property Listing",
              "Real Estate Consulting",
              "Property Management",
            ].map((item) => (
              <Link key={item} underline="hover" color="text.secondary">
                {item}
              </Link>
            ))}
          </Stack>

          {/* Contact */}
          <Stack spacing={3} maxWidth={360}>
            <Typography fontWeight={600}>Contact Information</Typography>

            <Stack direction="row" spacing={2}>
              <LocationOnOutlinedIcon color="primary" />
              <Typography variant="body2">
                <b>Office Address</b>
                <br />
                101, Business Park, Pune, Maharashtra, India
              </Typography>
            </Stack>

            <Stack direction="row" spacing={2}>
              <CallOutlinedIcon color="primary" />
              <Typography variant="body2">
                <b>Phone</b>
                <br />
                +91 90000 00000
              </Typography>
            </Stack>

            <Stack direction="row" spacing={2}>
              <MailOutlineOutlinedIcon color="primary" />
              <Typography variant="body2">
                <b>Email</b>
                <br />
                info@zonixrealty.com
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Container>

      {/* Bottom Bar */}
      <Box bgcolor="#E9E6FA" mt={8}>
        <Container
          maxWidth={false}
          sx={{
            maxWidth: "1440px",
            px: { xs: 2, md: 6 },
            py: 2,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © 2025 Zonix Realty. All rights reserved.
          </Typography>

          <Stack direction="row" spacing={3}>
            <Link underline="hover">Privacy Policy</Link>
            <Link underline="hover">Terms & Conditions</Link>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
