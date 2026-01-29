import { Box, Container } from "@mui/material";

const ContactMap = () => {
  return (
    <Box sx={{ backgroundColor: "#ffffff", py: { xs: 4, md: 6 } }}>
      <Container
        maxWidth="false"
        sx={{
          maxWidth: 1340,
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: {
              xs: "280px",
              sm: "360px",
              md: "560px",
            },
            borderRadius: "12px",
            overflow: "hidden",
            border: "1px solid #E5E7EB",
          }}
        >
          <Box
            component="iframe"
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d39360.479717356015!2d73.78370559999999!3d18.556518399999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1769677238739!5m2!1sen!2sin"
            sx={{
              width: "100%",
              height: "100%",
              border: 0,
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Box>
      </Container>
    </Box>
  );
};

export default ContactMap;
