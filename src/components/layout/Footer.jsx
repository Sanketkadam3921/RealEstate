import {
  Box,
  Container,
  Stack,
  Typography,
  IconButton,
  Link,
} from "@mui/material";

// Social Media Icons
import InstagramIcon from "../../assets/icons/Instagram.svg";
import FacebookIcon from "../../assets/icons/Facebook.svg";
import LinkedInIcon from "../../assets/icons/LinkedIn.svg";

// Contact Icons
import LocationIcon from "../../assets/icons/Footer/Location.svg";
import PhoneIcon from "../../assets/icons/Footer/Phone.svg";
import EmailIcon from "../../assets/icons/Footer/Email.svg";

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
          sx={{
            flexWrap: {
              xs: "wrap", // mobile
              sm: "wrap", // tablet
              md: "nowrap",
              lg: "nowrap", // desktop
            },
          }}
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
                sx={{ height: 45 }}
              />
            </Stack>

            <Typography variant="body2" color="text.secondary">
              Zonix Realty is a trusted real estate platform offering verified
              properties for buy, rent, and commercial needs. We simplify
              property discovery with transparency and expert support.
            </Typography>

            <Stack direction="row" spacing={1}>
              <IconButton
                size="small"
                component="a"
                href="#"
                sx={{
                  "&:hover": { opacity: 0.8 },
                }}
              >
                <Box
                  component="img"
                  src={InstagramIcon}
                  alt="Instagram"
                  sx={{ width: 27, height: 27 }}
                />
              </IconButton>
              <IconButton
                size="small"
                component="a"
                href="#"
                sx={{
                  "&:hover": { opacity: 0.8 },
                }}
              >
                <Box
                  component="img"
                  src={FacebookIcon}
                  alt="Facebook"
                  sx={{ width: 27, height: 27 }}
                />
              </IconButton>
              <IconButton
                size="small"
                component="a"
                href="#"
                sx={{
                  "&:hover": { opacity: 0.8 },
                }}
              >
                <Box
                  component="img"
                  src={LinkedInIcon}
                  alt="LinkedIn"
                  sx={{ width: 24, height: 24 }}
                />
              </IconButton>
            </Stack>
          </Stack>

          {/* Quick Links */}
          <Stack spacing={2}>
            <Typography fontWeight={600}>Quick Links</Typography>
            {["Home", "Properties", "About Us", "Contact"].map((item) => (
              <Link
                key={item}
                underline="hover"
                color="text.secondary"
                sx={{
                  fontWeight: 500,
                  fontSize: 16,
                }}
              >
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
              <Link
                key={item}
                underline="hover"
                color="text.secondary"
                sx={{
                  fontWeight: 500,
                  fontSize: 16,
                }}
              >
                {item}
              </Link>
            ))}
          </Stack>

          {/* Contact */}
          <Stack spacing={3} maxWidth={360}>
            <Typography fontWeight={600}>Contact Information</Typography>

            <Stack direction="row" spacing={2}>
              <Box
                component="img"
                src={LocationIcon}
                alt="Location"
                sx={{
                  width: 44,
                  height: 44,
                  color: "primary.main",
                  flexShrink: 0,
                  mt: 0.5,
                }}
              />

              <Stack spacing={0.5}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, fontSize: 16 }}
                >
                  Office Address
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    color: "text.secondary",
                    fontSize: 16,
                  }}
                >
                  Address : 101, Business Park, Pune
                  <br /> Maharashtra, India{" "}
                </Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2}>
              <Box
                component="img"
                src={PhoneIcon}
                alt="Phone"
                sx={{
                  width: 44,
                  height: 44,
                  color: "primary.main",
                  flexShrink: 0,
                  mt: 0.5,
                }}
              />

              <Stack spacing={0.5}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, fontSize: 16 }}
                >
                  Phone
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    color: "text.secondary",
                    fontSize: 16,
                  }}
                >
                  +91 90000 00000
                </Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2}>
              <Box
                component="img"
                src={EmailIcon}
                alt="Email"
                sx={{
                  width: 44,
                  height: 44,
                  color: "primary.main",
                  flexShrink: 0,
                  mt: 0.5,
                }}
              />

              <Stack spacing={0.5}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, fontSize: 16 }}
                >
                  Email
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    color: "text.secondary",
                    fontSize: 16,
                  }}
                >
                  info@esquarerealty.com
                </Typography>
              </Stack>
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
