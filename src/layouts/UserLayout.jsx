import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/common/ScrollToTop";

function UserLayout() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      {/* header */}
      <Header></Header>

      {/* Ensure we scroll to top on route change */}
      <ScrollToTop />

      {/* page content -- outlet where the content will change  */}
      <Box flex={1}>
        <Outlet></Outlet>
      </Box>

      {/* Footer */}
      <Footer></Footer>
    </Box>
  );
}
export default UserLayout;
