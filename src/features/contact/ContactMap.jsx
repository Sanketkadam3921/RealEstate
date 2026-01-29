import { Box, Container } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const position = [18.559, 73.789]; // Baner, Pune

const ContactMap = () => {
  return (
    <Box sx={{ backgroundColor: "#ffffff", py: { xs: 4, md: 6 } }}>
      <Container maxWidth="false" sx={{ maxWidth: 1440 }}>
        <Box
          sx={{
            width: "100%",
            height: {
              xs: "280px",
              sm: "360px",
              md: "460px",
            },
            borderRadius: "12px",
            overflow: "hidden",
            border: "1px solid #E5E7EB",
          }}
        >
          <MapContainer
            center={position}
            zoom={14}
            style={{ height: "100%", width: "100%" }}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">
                OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={position}>
              <Popup>
                <strong>Esquare Realty</strong> <br />
                Business Park, Pune
              </Popup>
            </Marker>
          </MapContainer>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactMap;
