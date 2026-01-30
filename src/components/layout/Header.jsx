import {
  AppBar,
  Toolbar,
  Box,
  Stack,
  Button,
  IconButton,
  Drawer,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../../assets/Logo/Logo.svg";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Properties", path: "/property" },
  { label: "Contact", path: "/contact" },
];

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* HEADER */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: "linear-gradient(90deg, #D9DCF5, #E9DDFC)",
          px: { xs: 2, md: 6 },
        }}
      >
        <Toolbar disableGutters>
          <Container
            maxWidth={false}
            sx={{
              maxWidth: "1440px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* LOGO */}
            <Box display="flex" alignItems="center" flexGrow={1}>
              <Box component={NavLink} to="/" sx={{ display: "flex" }}>
                <Box
                  component="img"
                  src={Logo}
                  alt="Zonix Realty Logo"
                  sx={{
                    height: 47,
                    width: 70,
                    cursor: "pointer",
                  }}
                />
              </Box>
            </Box>

            {/* DESKTOP NAV */}
            {!isMobile && (
              <Stack direction="row" spacing={5} alignItems="center">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;

                  return (
                    <Button
                      key={item.label}
                      component={NavLink}
                      to={item.path}
                      sx={{
                        fontSize: "17px",
                        color: "#0F2A44",
                        fontWeight: isActive ? 700 : 500,
                        textTransform: "none",
                        "&.active": {
                          fontWeight: 700,
                        },
                      }}
                    >
                      {item.label}
                    </Button>
                  );
                })}
              </Stack>
            )}

            {/* MOBILE MENU ICON */}
            {isMobile && (
              <IconButton onClick={() => setOpen(true)}>
                <MenuIcon />
              </IconButton>
            )}
          </Container>
        </Toolbar>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box width={250} p={3}>
          <Stack spacing={3}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Button
                  key={item.label}
                  component={NavLink}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  sx={{
                    fontSize: "17px",
                    fontWeight: isActive ? 700 : 400,
                    textTransform: "none",
                    justifyContent: "flex-start",
                    color: "#0F2A44",
                    "&.active": {
                      fontWeight: 700,
                    },
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </Stack>
        </Box>
      </Drawer>
    </>
  );
}
