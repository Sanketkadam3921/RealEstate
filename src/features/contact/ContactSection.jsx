import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";

// Contact Icons from Footer
import LocationIcon from "../../assets/icons/Footer/Location.svg";
import PhoneIcon from "../../assets/icons/Footer/Phone.svg";
import EmailIcon from "../../assets/icons/Footer/Email.svg";
import TimeIcon from "../../assets/icons/Footer/Time.svg";

const InfoRow = ({ iconSrc, iconAlt, title, value }) => (
  <Stack direction="row" spacing={2} alignItems="flex-start">
    <Box
      component="img"
      src={iconSrc}
      alt={iconAlt}
      sx={{
        width: 44,
        height: 44,
        flexShrink: 0,
        mt: 0.5,
      }}
    />
    <Stack spacing={0.5}>
      <Typography fontWeight={600} sx={{ fontSize: 16 }}>
        {title}
      </Typography>
      <Typography color="#0F2A44">{value}</Typography>
    </Stack>
  </Stack>
);

const ContactSection = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submissionCount, setSubmissionCount] = useState(0);

  // Load submission count from localStorage on mount
  useEffect(() => {
    const savedForms = localStorage.getItem("contactFormSubmissions");
    if (savedForms) {
      const forms = JSON.parse(savedForms);
      setSubmissionCount(forms.length);
    }
  }, []);

  // Validation functions
  const validateName = (name) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!name.trim()) return "Name is required";
    if (!nameRegex.test(name)) return "Name should contain only alphabets";
    return "";
  };

  const validateEmail = (email) => {
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.(com|gov|in|org|net|edu|co\.in|ac\.in)$/i;
    if (!email.trim()) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phone.trim()) return "Phone number is required";
    if (!phoneRegex.test(phone)) {
      return "Phone number must be 10 digits and start with 6, 7, 8, or 9";
    }
    return "";
  };

  const validateMessage = (message) => {
    if (!message.trim()) return "Message is required";
    return "";
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = () => {
    // Validate all fields
    const newErrors = {
      fullName: validateName(formData.fullName),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      message: validateMessage(formData.message),
    };

    setErrors(newErrors);

    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some((error) => error !== "");

    if (!hasErrors) {
      // Create submission data
      const submissionData = {
        ...formData,
        timestamp: new Date().toISOString(),
        id: Date.now(),
      };

      // Get existing submissions from localStorage
      const existingSubmissions = localStorage.getItem(
        "contactFormSubmissions",
      );
      const submissions = existingSubmissions
        ? JSON.parse(existingSubmissions)
        : [];

      // Add new submission
      submissions.push(submissionData);

      // Save back to localStorage
      localStorage.setItem(
        "contactFormSubmissions",
        JSON.stringify(submissions),
      );
      setSubmissionCount(submissions.length);

      // Show success message
      setSubmitStatus("success");

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        message: "",
      });

      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } else {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#F6F6F6", py: { xs: 6, md: 10 } }}>
      <Container
        maxWidth="false"
        sx={{
          maxWidth: 1440,
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 4, md: 9 }}
          justifyContent="center"
          alignItems="stretch"
        >
          {/* LEFT CARD – CONTACT INFO */}
          <Box
            sx={{
              width: {
                xs: "90%",
                md: "549px",
              },
              height: {
                xs: "auto",
                md: "559px",
              },
              minHeight: {
                xs: "auto",
                md: "549px",
              },
              backgroundColor: "#ffffff",
              borderRadius: "17px",
              border: "1px solid #B0B2B3",
              p: { xs: 3, sm: 4 },
              display: "flex",
              overflow: "hidden",
              boxSizing: "border-box",
            }}
          >
            <Stack
              spacing={4}
              sx={{ flex: 1, justifyContent: "space-between" }}
            >
              <Stack spacing={1.5}>
                <Typography fontSize="19px" fontWeight={600}>
                  Contact Information
                </Typography>
                <Typography color="#6B7280">
                  We value clear communication and quick support.
                </Typography>
              </Stack>

              <Stack spacing={7}>
                <InfoRow
                  iconSrc={LocationIcon}
                  iconAlt="Location"
                  title="Office Address"
                  value="Address : 101, Business Park, Pune, Maharashtra, India"
                />

                <InfoRow
                  iconSrc={PhoneIcon}
                  iconAlt="Phone"
                  title="Phone"
                  value="+91 90000 00000"
                />

                <InfoRow
                  iconSrc={EmailIcon}
                  iconAlt="Email"
                  title="Email"
                  value="info@esquarerealty.com"
                />

                <InfoRow
                  iconSrc={TimeIcon}
                  iconAlt="Time"
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
                xs: "90%",
                md: "531px",
              },
              height: {
                xs: "auto",
                md: "549px",
              },
              minHeight: {
                xs: "auto",
                md: "559px",
              },
              backgroundColor: "#ffffff",
              borderRadius: "17px",
              border: "1px solid #B0B2B3",
              p: { xs: 3, sm: 4 },
              overflow: "hidden",
              boxSizing: "border-box",
            }}
          >
            <Stack spacing={3}>
              <Typography fontSize="20px" fontWeight={600}>
                Send Message
              </Typography>

              {submitStatus === "success" && (
                <Alert severity="success">
                  Message sent successfully! We'll get back to you within 24
                  hours.
                </Alert>
              )}

              {submitStatus === "error" && (
                <Alert severity="error">
                  Please fix the errors below before submitting.
                </Alert>
              )}

              <Stack spacing={2}>
                <TextField
                  fullWidth
                  label="Full Name"
                  placeholder="Enter Full Name"
                  value={formData.fullName}
                  onChange={handleChange("fullName")}
                  error={!!errors.fullName}
                  helperText={errors.fullName}
                />
                <TextField
                  fullWidth
                  label="Email Address"
                  placeholder="Enter Email Address"
                  value={formData.email}
                  onChange={handleChange("email")}
                  error={!!errors.email}
                  helperText={errors.email}
                />
                <TextField
                  fullWidth
                  label="Phone Number"
                  placeholder="+91 90000 00000"
                  value={formData.phone}
                  onChange={handleChange("phone")}
                  error={!!errors.phone}
                  helperText={errors.phone}
                  inputProps={{ maxLength: 10 }}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Message"
                  placeholder="Write a message"
                  value={formData.message}
                  onChange={handleChange("message")}
                  error={!!errors.message}
                  helperText={errors.message}
                />
              </Stack>

              <Typography fontSize="14px" color="#6B7280">
                Our Team will get back to you within 24 hours
              </Typography>

              <Button
                fullWidth
                onClick={handleSubmit}
                sx={{
                  backgroundColor: "#8B5CF6",
                  color: "#ffffff",
                  py: 1.4,
                  borderRadius: "10px",
                  fontWeight: 600,
                  textTransform: "none",
                  mb: 3,
                  "&:hover": {
                    backgroundColor: "#7C3AED",
                  },
                }}
              >
                Send Message
              </Button>

              {/* Display submitted forms count */}
              {submissionCount > 0 && (
                <Typography fontSize="12px" color="#6B7280" sx={{ mt: 2 }}>
                  Total submissions: {submissionCount}
                </Typography>
              )}
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default ContactSection;
