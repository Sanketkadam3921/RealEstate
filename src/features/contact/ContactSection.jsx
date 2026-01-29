import {
  Box,
  Container,
  Stack,
  Typography,
  TextField,
  Button,
} from "@mui/material";

// Icons (replace with your SVGs if needed)
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

const InfoRow = ({ icon, title, value }) => (
  <Stack direction="row" spacing={2} alignItems="flex-start">
    <Box
      sx={{
        width: 42,
        height: 42,
        borderRadius: "10px",
        backgroundColor: "#F3EDFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#8B5CF6",
        flexShrink: 0,
      }}
    >
      {icon}
    </Box>

    <Stack spacing={0.5}>
      <Typography fontWeight={600}>{title}</Typography>
      <Typography color="#475569">{value}</Typography>
    </Stack>
  </Stack>
);

const ContactSection = () => {
  return (
    <Box sx={{ backgroundColor: "#F6F6F6", py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 4, md: 6 }}
          justifyContent="center"
          alignItems="stretch"
        >
          {/* LEFT CARD – CONTACT INFO */}
          <Box
            sx={{
              width: {
                xs: "100%",
                md: "549px",
              },
              backgroundColor: "#ffffff",
              borderRadius: "17px",
              border: "1px solid #E5E7EB",
              p: { xs: 3, sm: 4 },
            }}
          >
            <Stack spacing={3}>
              <Stack spacing={1}>
                <Typography fontSize="20px" fontWeight={600}>
                  Contact Information
                </Typography>
                <Typography color="#6B7280">
                  We value clear communication and quick support.
                </Typography>
              </Stack>

              <Stack spacing={3}>
                <InfoRow
                  icon={<LocationOnOutlinedIcon />}
                  title="Office Address"
                  value="Address : 101, Business Park, Pune, Maharashtra, India"
                />

                <InfoRow
                  icon={<PhoneOutlinedIcon />}
                  title="Phone"
                  value="+91 90000 00000"
                />

                <InfoRow
                  icon={<EmailOutlinedIcon />}
                  title="Email"
                  value="info@esquarerealty.com"
                />

                <InfoRow
                  icon={<AccessTimeOutlinedIcon />}
                  title="Time"
                  value="Mon - Sat 9:00AM - 6:00PM"
                />
              </Stack>
            </Stack>
          </Box>

          {/* RIGHT CARD – FORM */}
          <Box
            sx={{
              width: {
                xs: "100%",
                md: "531px",
              },
              backgroundColor: "#ffffff",
              borderRadius: "17px",
              border: "1px solid #E5E7EB",
              p: { xs: 3, sm: 4 },
            }}
          >
            <Stack spacing={3}>
              <Typography fontSize="20px" fontWeight={600}>
                Send Message
              </Typography>

              <Stack spacing={2}>
                <TextField
                  fullWidth
                  label="Full Name"
                  placeholder="Enter Full Name"
                />
                <TextField
                  fullWidth
                  label="Email Address"
                  placeholder="Enter Email Address"
                />
                <TextField
                  fullWidth
                  label="Phone Number"
                  placeholder="+91 90000 00000"
                />
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Message"
                  placeholder="Write a message"
                />
              </Stack>

              <Typography fontSize="14px" color="#6B7280">
                Our Team will get back to you within 24 hours
              </Typography>

              <Button
                fullWidth
                sx={{
                  backgroundColor: "#8B5CF6",
                  color: "#ffffff",
                  py: 1.4,
                  borderRadius: "10px",
                  fontWeight: 600,
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#7C3AED",
                  },
                }}
              >
                Send Message
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default ContactSection;
