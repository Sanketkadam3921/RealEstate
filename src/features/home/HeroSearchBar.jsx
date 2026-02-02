import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

export default function HeroSearchBar({
  searchText: externalSearchText,
  setSearchText: externalSetSearchText,
  location: externalLocation,
  setLocation: externalSetLocation,
  type: externalType,
  setType: externalSetType,
  budget: externalBudget,
  setBudget: externalSetBudget,
}) {
  const navigate = useNavigate();
  const currentLocation = useLocation();
  const isPropertiesPage = currentLocation.pathname === "/property";

  // Internal state for homepage
  const [internalSearchText, setInternalSearchText] = useState("");
  const [internalLocation, setInternalLocation] = useState("");
  const [internalType, setInternalType] = useState("");
  const [internalBudget, setInternalBudget] = useState("");

  // Use external props if provided (properties page), otherwise use internal state (homepage)
  const searchText =
    externalSearchText !== undefined ? externalSearchText : internalSearchText;
  const setSearchText = externalSetSearchText || setInternalSearchText;
  const location =
    externalLocation !== undefined ? externalLocation : internalLocation;
  const setLocation = externalSetLocation || setInternalLocation;
  const type = externalType !== undefined ? externalType : internalType;
  const setType = externalSetType || setInternalType;
  const budget = externalBudget !== undefined ? externalBudget : internalBudget;
  const setBudget = externalSetBudget || setInternalBudget;

  const handleFindNow = () => {
    if (!isPropertiesPage) {
      // On homepage: navigate to properties page with filters as URL params
      const params = new URLSearchParams();
      if (searchText) params.set("search", searchText);
      if (location) params.set("location", location);
      if (type) params.set("type", type);
      if (budget) params.set("budget", budget);

      navigate(`/property${params.toString() ? `?${params.toString()}` : ""}`);
    }
    // On properties page: filters already work via props, no action needed
  };

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        borderRadius: 3,
        p: { xs: 2, md: 2.5 },
        boxShadow: "7px 7px 43.6px rgba(0, 0, 0, 0.25)",
        maxWidth: "1400px",
        mx: "auto",
        border: `1px solid ${BORDER_COLOR}`,
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
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
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
              opacity: 1,
            },
          }}
        />

        {/* Location */}
        <TextField
          select
          fullWidth
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          SelectProps={{
            displayEmpty: true,
            IconComponent: KeyboardArrowDownIcon,
            renderValue: (selected) => {
              if (!selected) {
                return <span style={{ color: "#000000" }}>Location</span>;
              }
              const selectedItem = locationOptions.find(
                (opt) => opt.value === selected,
              );
              return selectedItem?.label || selected;
            },
          }}
          sx={inputStyles}
        >
          <MenuItem value="">All Locations</MenuItem>
          {locationOptions.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </TextField>

        {/* Property Type */}
        <TextField
          select
          fullWidth
          value={type}
          onChange={(e) => setType(e.target.value)}
          SelectProps={{
            displayEmpty: true,
            IconComponent: KeyboardArrowDownIcon,
            renderValue: (selected) => {
              if (!selected) {
                return <span style={{ color: "#000000" }}>Property Type</span>;
              }
              const selectedItem = typeOptions.find(
                (opt) => opt.value === selected,
              );
              return selectedItem?.label || selected;
            },
          }}
          sx={inputStyles}
        >
          <MenuItem value="">All Types</MenuItem>
          {typeOptions.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </TextField>

        {/* Budget */}
        <TextField
          select
          fullWidth
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          SelectProps={{
            displayEmpty: true,
            IconComponent: KeyboardArrowDownIcon,
            renderValue: (selected) => {
              if (!selected) {
                return <span style={{ color: "#000000" }}>Budget</span>;
              }
              const selectedItem = budgetOptions.find(
                (opt) => opt.value === selected,
              );
              return selectedItem?.label || selected;
            },
          }}
          sx={inputStyles}
        >
          <MenuItem value="">All Budgets</MenuItem>
          {budgetOptions.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </TextField>

        {/* Button */}
        <Button
          variant="contained"
          onClick={handleFindNow}
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

// Options arrays
const locationOptions = [
  { value: "pune", label: "Pune" },
  { value: "baner", label: "Baner" },
  { value: "hinjewadi", label: "Hinjewadi" },
  { value: "koregaon park", label: "Koregaon Park" },
  { value: "maharashtra", label: "Maharashtra" },
  { value: "goa", label: "Goa" },
  { value: "mahabaleshwar", label: "Mahabaleshwar" },
];

const typeOptions = [
  { value: "apartment", label: "Apartment" },
  { value: "villa", label: "Villa" },
  { value: "plot", label: "Plot" },
  { value: "office", label: "Office" },
  { value: "commercial", label: "Commercial" },
];

const budgetOptions = [
  { value: "20-50", label: "₹20L – ₹50L" },
  { value: "50-100", label: "₹50L – ₹1Cr" },
  { value: "100+", label: "₹1Cr+" },
];

/* Shared input styles */
const inputStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    backgroundColor: "#F2F3F3",
    "& fieldset": {
      borderColor: "#A237FF",
    },
    "&:hover fieldset": {
      borderColor: "#A237FF",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#A237FF",
      borderWidth: 2,
    },
  },
  "& input::placeholder": {
    color: "#999",
    opacity: 1,
  },
};
