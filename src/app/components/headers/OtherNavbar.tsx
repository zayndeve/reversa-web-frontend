import {
  Box,
  Button,
  Container,
  Stack,
  Menu,
  MenuItem,
  IconButton,
  Avatar,
  ListItemIcon,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import MiniCartDrawer from "./MiniCartDrawer";
import { useState } from "react";
import { useGlobal } from "../../../app/hooks/useGlobal";
import { serverApi } from "../../../app/libs/config";
import { useAppSelector } from "../../../app/screens/hooks";
import { selectCartItems } from "./cartSlice";


export default function OtherNavbar() {
  const { authMember, setAuthMember } = useGlobal();
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const handleCartOpen = () => setIsCartOpen(true);
  const handleCartClose = () => setIsCartOpen(false);

  const cartItems = useAppSelector(selectCartItems);
 const cartCount = cartItems.reduce((sum: number, item:any) => sum + item.quantity, 0);

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(e.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("memberData");
    setAuthMember(null);
    navigate("/");
    handleMenuClose();
  };

  return (
    <div className="home-navbar">
      <Container sx={{ mt: "30px", height: "80px" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ height: "100%" }}
        >
          {/* Logo */}
          <Box>
            <NavLink to="/">
              <img
                src="/img/logo.png"
                alt="Reverso Logo"
                style={{ height: "190px", objectFit: "contain" }}
              />
            </NavLink>
          </Box>

          {/* Navigation */}
          <Stack direction="row" spacing={4} alignItems="center">
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Home
            </NavLink>
            <NavLink to="/products" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Shop
            </NavLink>
           

            {/* Cart */}
            <MiniCartDrawer isOpen={isCartOpen} onClose={handleCartClose} />

            {/* Orders + My Page visible always when logged in */}
            {authMember && (
              <>
                <NavLink to="/order" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                  Orders
                </NavLink>
                <NavLink to="/account" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                  My Page
                </NavLink>
              </>
            )}
             <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              About Us
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Contact Us
            </NavLink>
            {/* Login if not logged in */}
            {!authMember && (
              <Button
                variant="contained"
                sx={{ backgroundColor: "#343434", color: "#f8f8ff" }}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            )}

            {/* Right Icons */}
            <Box className="icon-group" display="flex" alignItems="center" gap={2}>
  <div className="custom-badge" onClick={handleCartOpen}>
  <div className="custom-badge cart-icon">
  <i className="icon ion-ios-cart"></i>
</div>

    <span className="badge-count">{cartCount}</span> {/* ✅ Fixed */}
  </div>
  <i className="icon ion-ios-search"></i>

  <IconButton onClick={handleMenuOpen}>
    <i className="icon ion-ios-menu"></i>
  </IconButton>
</Box>
          </Stack>
        </Stack>
      </Container>

      {/* Hamburger Dropdown Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {authMember && (
          <Box textAlign="center" py={1.5}>
            <Avatar
              src={`${serverApi}/uploads/members/${authMember.memberImage}`}
              sx={{ width: 56, height: 56, margin: "0 auto" }}
            />
            <Box mt={1} fontWeight="bold">{authMember.memberNick}</Box>
          </Box>
        )}

{authMember
    ? [
        <MenuItem key="account" onClick={() => { navigate("/account"); handleMenuClose(); }}>
          My Page
        </MenuItem>,
        <MenuItem key="orders" onClick={() => { navigate("/order"); handleMenuClose(); }}>
          Orders
        </MenuItem>,
        <MenuItem key="logout" onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      ]
    : [
        <MenuItem key="login" onClick={() => { navigate("/login"); handleMenuClose(); }}>
          Login
        </MenuItem>
      ]
  }
</Menu>
    </div>
  );
}
