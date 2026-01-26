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

export default function HeroSearchBar() {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        borderRadius: 3,
        p: { xs: 2, md: 2.5 },
        boxShadow: "0px 20px 60px rgba(0,0,0,0.1)",
        maxWidth: "1200px",
        mx: "auto",
        border: "1px solid #f0f0f0",
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
                <SearchIcon sx={{ color: "#999" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              backgroundColor: "#fff",
              "& fieldset": {
                borderColor: "#e0e0e0",
              },
              "&:hover fieldset": {
                borderColor: "#c0c0c0",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#8E3CF7",
              },
            },
            "& input::placeholder": {
              color: "#999",
              opacity: 1,
            },
          }}
        />

        {/* Location Dropdown */}
        <TextField
          select
          fullWidth
          defaultValue=""
          placeholder="Location"
          SelectProps={{
            displayEmpty: true,
            IconComponent: KeyboardArrowDownIcon,
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              backgroundColor: "#fff",
              "& fieldset": {
                borderColor: "#e0e0e0",
              },
              "&:hover fieldset": {
                borderColor: "#c0c0c0",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#8E3CF7",
              },
            },
            "& .MuiSelect-select": {
              color: "#333",
            },
          }}
        >
          <MenuItem value="" disabled>
            Location
          </MenuItem>
          <MenuItem value="pune">Pune</MenuItem>
          <MenuItem value="mumbai">Mumbai</MenuItem>
        </TextField>

        {/* Property Type Dropdown */}
        <TextField
          select
          fullWidth
          defaultValue=""
          SelectProps={{
            displayEmpty: true,
            IconComponent: KeyboardArrowDownIcon,
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              backgroundColor: "#fff",
              "& fieldset": {
                borderColor: "#e0e0e0",
              },
              "&:hover fieldset": {
                borderColor: "#c0c0c0",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#8E3CF7",
              },
            },
          }}
        >
          <MenuItem value="" disabled>
            Property Type
          </MenuItem>
          <MenuItem value="apartment">Apartment</MenuItem>
          <MenuItem value="villa">Villa</MenuItem>
          <MenuItem value="commercial">Commercial</MenuItem>
        </TextField>

        {/* Budget Dropdown */}
        <TextField
          select
          fullWidth
          defaultValue=""
          SelectProps={{
            displayEmpty: true,
            IconComponent: KeyboardArrowDownIcon,
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              backgroundColor: "#fff",
              "& fieldset": {
                borderColor: "#e0e0e0",
              },
              "&:hover fieldset": {
                borderColor: "#c0c0c0",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#8E3CF7",
              },
            },
          }}
        >
          <MenuItem value="" disabled>
            Budget
          </MenuItem>
          <MenuItem value="20-50">₹20L – ₹50L</MenuItem>
          <MenuItem value="50-100">₹50L – ₹1Cr</MenuItem>
          <MenuItem value="100+">₹1Cr+</MenuItem>
        </TextField>

        {/* Find Now Button */}
        <Button
          variant="contained"
          sx={{
            px: { xs: 3, md: 5 },
            py: 1.5,
            borderRadius: 2,
            backgroundColor: "#8E3CF7",
            whiteSpace: "nowrap",
            fontWeight: 600,
            fontSize: "0.95rem",
            textTransform: "none",
            minWidth: { xs: "100%", sm: "auto" },
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#7B2FE3",
              boxShadow: "0px 4px 12px rgba(142, 60, 247, 0.3)",
            },
          }}
        >
          Find Now
        </Button>
      </Stack>
    </Box>
  );
}
