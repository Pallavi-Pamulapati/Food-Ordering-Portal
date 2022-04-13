import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const BLoginNavbar = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/buyerwelcome")}
          >
            Home Page
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" onClick={() => navigate("/fooditems")}>
            Items List
          </Button>
          <Button color="inherit" onClick={() => navigate("/myorders")}>
            My Orders
          </Button>
          <Button color="inherit" onClick={() => navigate("/myfav")}>
            My Favourites
          </Button>
          <Button color="inherit" onClick={() => navigate("/bprofile")}>
            My Profile
          </Button>
          <Button color="inherit" onClick={() => navigate("/mywallet")}>
            My Wallet
          </Button>
          <Button color="inherit" onClick={() => {navigate("/"); window.location.reload()}}>
            LogOut
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default BLoginNavbar;
