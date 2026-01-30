import {
  Box,
  Stack,
  TextField,
  MenuItem,
  Button,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const BORDER_COLOR = "#A237FF";

export default function HeroSearchBar() {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        borderRadius: 3,
        p: { xs: 2, md: 2.5 },
        boxShadow: "7px 7px 43.6px rgba(0, 0, 0, 0.25)",
        maxWidth: "1400px",
        mx: "auto",
        border: `1px solid ${BORDER_COLOR}`, // ✅ OUTER BORDER
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 2, sm: 1.5 }}
        alignItems="stretch"
      >
        {/* Search Input */}
        <TextField
          fullWidth
          placeholder="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: BORDER_COLOR }} />
              </InputAdornment>
            ),
          }}
          sx={{
            ...inputStyles,
            "& .MuiInputBase-input::placeholder": {
              color: "#000000",
              opacity: 1, // very important or it will look grey
            },
          }}
        />

        {/* Location */}
        <TextField
          select
          fullWidth
          defaultValue=""
          SelectProps={{
            displayEmpty: true,
            IconComponent: KeyboardArrowDownIcon,
          }}
          sx={inputStyles}
        >
          <MenuItem value="" disabled>
            Location
          </MenuItem>
          <MenuItem value="pune">Pune</MenuItem>
          <MenuItem value="mumbai">Mumbai</MenuItem>
        </TextField>

        {/* Property Type */}
        <TextField
          select
          fullWidth
          defaultValue=""
          SelectProps={{
            displayEmpty: true,
            IconComponent: KeyboardArrowDownIcon,
          }}
          sx={inputStyles}
        >
          <MenuItem value="" disabled>
            Property Type
          </MenuItem>
          <MenuItem value="apartment">Apartment</MenuItem>
          <MenuItem value="villa">Villa</MenuItem>
          <MenuItem value="commercial">Commercial</MenuItem>
        </TextField>

        {/* Budget */}
        <TextField
          select
          fullWidth
          defaultValue=""
          SelectProps={{
            displayEmpty: true,
            IconComponent: KeyboardArrowDownIcon,
          }}
          sx={inputStyles}
        >
          <MenuItem value="" disabled>
            Budget
          </MenuItem>
          <MenuItem value="20-50">₹20L – ₹50L</MenuItem>
          <MenuItem value="50-100">₹50L – ₹1Cr</MenuItem>
          <MenuItem value="100+">₹1Cr+</MenuItem>
        </TextField>

        {/* Button */}
        <Button
          variant="contained"
          sx={{
            px: { xs: 3, md: 5 },
            py: 1.5,
            borderRadius: 2,
            backgroundColor: BORDER_COLOR,
            whiteSpace: "nowrap",
            fontWeight: 600,
            fontSize: "0.95rem",
            textTransform: "none",
            minWidth: { xs: "100%", sm: "auto" },
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#8B2FF2",
              boxShadow: "0px 4px 12px rgba(162, 55, 255, 0.3)",
            },
          }}
        >
          Find Now
        </Button>
      </Stack>
    </Box>
  );
}

/* Shared input styles */
const inputStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    backgroundColor: "#F2F3F3",
    "& fieldset": {
      borderColor: "#A237FF", // ✅ DEFAULT
    },
    "&:hover fieldset": {
      borderColor: "#A237FF", // ✅ HOVER
    },
    "&.Mui-focused fieldset": {
      borderColor: "#A237FF", // ✅ FOCUS
      borderWidth: 2,
    },
  },
  "& input::placeholder": {
    color: "#999",
    opacity: 1,
  },
};
