import {
  AppBar,
  Toolbar,
  Box,
  Stack,
  Button,
  IconButton,
  Drawer,
  Typography,
  Icon,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import Logo from "../../assets/Logo/Logo.svg";
const navItems = ["Home", "About Us", "Properties", "Contact"];

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);

  return (
    <>
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
            <Box display="flex" alignItems="center" flexGrow={1}>
              <Box
                component="img"
                src={Logo}
                alt="Zonix Realty Logo"
                sx={{
                  height: 47,
                  width: 70,
                  cursor: "pointer",
                }}
              />{" "}
            </Box>{" "}
            {!isMobile && (
              <Stack direction="row" spacing={5} alignItems="center">
                {navItems.map((item) => (
                  <Button
                    key={item}
                    sx={{
                      fontStyle: "bold",
                      fontSize: "17px",
                      color: "#1e2a44",
                      fontWeight: 700,
                      textTransform: "none",
                    }}
                  >
                    {item}
                  </Button>
                ))}
              </Stack>
            )}
            {isMobile && (
              <IconButton onClick={() => setOpen(true)}>
                <MenuIcon></MenuIcon>
              </IconButton>
            )}
          </Container>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box width={250} p={3}>
          <Stack spacing={3}>
            {navItems.map((item) => (
              <Button
                key={item}
                sx={{
                  fontSize: "17px",
                  fontWeight: 500,
                  textTransform: "none",
                  justifyContent: "flex-start",
                  color: "#1e2a44",
                }}
                onClick={() => setOpen(false)}
              >
                {item}
              </Button>
            ))}
          </Stack>
        </Box>
      </Drawer>
    </>
  );
}

{
  /*   
    Header -> Appbar -> ToolBar 
    */
}
