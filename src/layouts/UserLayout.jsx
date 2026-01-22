import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

function UserLayout() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      {/* header */}
      <Header></Header>

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
