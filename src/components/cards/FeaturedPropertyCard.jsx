import { Box, Stack, Typography, Button } from "@mui/material";

export default function FeaturedPropertyCard({
  image,
  title,
  location,
  type,
  area,
  tag,
}) {
  return (
    <Stack
      sx={{
        maxWidth: { xs: "350px", sm: 330, md: 380, lg: 398 },
        height: { xs: "360px", sm: 401, md: 401, lg: 401 },
        overflow: "hidden",
        backgroundColor: "#ffffff",
        borderRadius: "14px",
        border: "1px solid #B7B7B7",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        pt: 2,
        px: { xs: 2.5, sm: 3 },
        pb: 3,
      }}
    >
      {/* TOP */}
      <Stack>
        {/* IMAGE + TAG */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: 180, sm: 206 },
            mb: 2,
          }}
        >
          {tag && (
            <Box
              sx={{
                height: 40,
                maxWidth: 110,
                minWidth: 43,
                position: "absolute",
                bottom: 10,
                left: 10,
                pr: 2,
                pl: 2,
                display: "flex", // ✅ KEY
                alignItems: "center", // ✅ vertical center
                justifyContent: "center", // ✅ horizontal center
                border: "1px solid #A237FF", // ✅ purple border

                borderRadius: "8px",
                backgroundColor: "#FFFFFF",
                color: "#A237FF",
                fontSize: "14px", // ✅ exact UI/UX size
                fontWeight: 600,
                lineHeight: 1, // ✅ prevents optical shift
                zIndex: 2,
                boxShadow: "0px 4px 12px rgba(0,0,0,0.12)",
              }}
            >
              {tag}
            </Box>
          )}

          <Box
            component="img"
            src={image}
            alt={title}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "11px",
            }}
          />
        </Box>

        {/* TEXT */}
        <Stack spacing={1}>
          <Typography
            fontWeight={400}
            sx={{ fontSize: { xs: "15px", sm: "16px", md: "17px" } }}
          >
            {title}
          </Typography>

          <Typography
            variant="body2"
            sx={{ fontSize: { xs: "13px", sm: "14px" }, color: "#6B7280" }}
          >
            Location : {location}
          </Typography>

          <Typography
            variant="body2"
            sx={{ fontSize: { xs: "13px", sm: "14px" }, color: "#6B7280" }}
          >
            Type ({type})
          </Typography>

          <Typography
            variant="body2"
            fontWeight={600}
            sx={{ fontSize: { xs: "13px", sm: "14px" }, pt: 1 }}
          >
            Area ({area})
          </Typography>
        </Stack>
      </Stack>

      {/* BUTTON */}
      <Button
        variant="contained"
        fullWidth
        sx={{
          height: { xs: 40, sm: 44 },
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: 600,
          fontSize: "14px",
          backgroundColor: "#9b5cff",
          "&:hover": {
            backgroundColor: "#8a4ef0",
          },
        }}
      >
        View Details
      </Button>
    </Stack>
  );
}
