import { Box, Container, Stack, Typography } from "@mui/material";
import WhatWeDoImg from "../../assets/images/handshake.png";

const Item = ({ number, title, text }) => {
  return (
    <Stack spacing={1} sx={{ maxWidth: "320px" }}>
      <Typography
        sx={{
          fontSize: "32px",
          fontWeight: 600,
          color: "#000000",
        }}
      >
        {number}
      </Typography>

      <Typography
        sx={{
          fontSize: "18px",
          fontWeight: 600,
          color: "#000000",
        }}
      >
        {title}
      </Typography>

      <Typography
        sx={{
          fontSize: "16px",
          color: "#6f6f6f",
          lineHeight: 1.6,
        }}
      >
        {text}
      </Typography>
    </Stack>
  );
};

const WhatWeDo = () => {
  return (
    <Box sx={{ backgroundColor: "#ffffff", py: { xs: 6, md: 10 } }}>
      <Container
        maxWidth="false"
        sx={{
          maxWidth: 1440,
        }}
      >
        {/* DESKTOP / TABLET LAYOUT */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: "70px",
            alignItems: "flex-start",
          }}
        >
          {/* LEFT IMAGE */}
          <Box
            component="img"
            src={WhatWeDoImg}
            alt="What we do"
            sx={{
              width: "557px",
              height: "715px",
              objectFit: "cover",
              borderRadius: "9px",
            }}
          />

          {/* RIGHT CONTENT */}
          <Box sx={{ position: "relative", width: "693px", height: "715px" }}>
            {/* TITLE */}
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: 600,
                color: "#1f2a44",
                textAlign: "center",
                width: "100%",
                position: "absolute",
                top: -40,
                left: 0,
              }}
            >
              What We Do
            </Typography>

            {/* VERTICAL DIVIDER (DO NOT TOUCH) */}
            <Box
              sx={{
                position: "absolute",
                top: "20px",
                bottom: 0,
                left: "50%",
                width: "1px",
                backgroundColor: "#000000",
                opacity: 0.3,
              }}
            />

            {/* HORIZONTAL DIVIDER (DO NOT TOUCH) */}
            <Box
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                top: "calc(60px + (715px - 80px) / 2)",
                height: "1px",
                backgroundColor: "#000000",
                opacity: 0.3,
              }}
            />

            {/* CONTENT AREA */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                pt: 2,
              }}
            >
              {/* ROW 1 */}
              <Box sx={{ display: "flex" }}>
                {/* TOP LEFT */}
                <Box sx={{ width: "50%", pr: 5, pt: 3 }}>
                  <Item
                    number="01"
                    title="Residential Property Sales & Rentals"
                    text="We help you buy or rent residential properties with ease. All listings are verified and suited to different budgets. Our team supports you at every step of the process."
                  />
                </Box>

                {/* TOP RIGHT */}
                <Box sx={{ width: "50%", pl: 5, pt: 3 }}>
                  <Item
                    number="02"
                    title="Commercial Property Solutions"
                    text="Find office spaces, shops, and commercial properties easily. Solutions are tailored to meet business requirements. We ensure transparency and reliable support."
                  />
                </Box>
              </Box>

              {/* ROW 2 */}
              <Box sx={{ display: "flex" }}>
                {/* BOTTOM LEFT */}
                <Box
                  sx={{
                    width: "50%",
                    pr: 5,
                    pt: 4,
                    transform: "translateY(-70px)",
                  }}
                >
                  <Item
                    number="03"
                    title="Real Estate Consulting"
                    text="Get expert advice for buying, selling, or investing. We provide market insights and clear guidance. Make confident property decisions with our support."
                  />
                </Box>

                {/* BOTTOM RIGHT */}
                <Box
                  sx={{
                    width: "50%",
                    pl: 5,
                    pt: 4,
                    transform: "translateY(-70px)",
                  }}
                >
                  <Item
                    number="04"
                    title="Property Management Support"
                    text="We manage properties efficiently on your behalf. Support includes maintenance and coordination services. Ensuring a smooth and hassle-free experience."
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* MOBILE LAYOUT */}
        <Box
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          <Stack spacing={4}>
            {/* IMAGE */}
            <Box
              component="img"
              src={WhatWeDoImg}
              alt="What we do"
              sx={{
                width: "100%",
                height: { xs: 260, sm: 320 },
                objectFit: "cover",
                borderRadius: "9px",
              }}
            />

            {/* TITLE */}
            <Typography
              sx={{
                fontSize: { xs: "22px", sm: "24px" },
                fontWeight: 600,
                color: "#1f2a44",
                textAlign: "center",
              }}
            >
              What We Do
            </Typography>

            {/* ITEMS STACKED */}
            <Stack spacing={4}>
              <Item
                number="01"
                title="Residential Property Sales & Rentals"
                text="We help you buy or rent residential properties with ease. All listings are verified and suited to different budgets. Our team supports you at every step of the process."
              />

              <Item
                number="02"
                title="Commercial Property Solutions"
                text="Find office spaces, shops, and commercial properties easily. Solutions are tailored to meet business requirements. We ensure transparency and reliable support."
              />

              <Item
                number="03"
                title="Real Estate Consulting"
                text="Get expert advice for buying, selling, or investing. We provide market insights and clear guidance. Make confident property decisions with our support."
              />

              <Item
                number="04"
                title="Property Management Support"
                text="We manage properties efficiently on your behalf. Support includes maintenance and coordination services. Ensuring a smooth and hassle-free experience."
              />
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default WhatWeDo;
