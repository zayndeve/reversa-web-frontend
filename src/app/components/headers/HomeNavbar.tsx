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
import MiniCartDrawer from "./MiniCartDrawer";
import { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useGlobal } from "../../../app/hooks/useGlobal";
import { serverApi } from "../../../app/libs/config";
import { Logout } from "@mui/icons-material";
import { useAppSelector } from "../../../app/screens/hooks";
import { selectCartItems } from "./cartSlice";

// ✅ Import Material UI icons
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";

export function HomeNavbar() {
  const { authMember, setAuthMember } = useGlobal();
  const cookies = new Cookies();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleCartOpen = () => setIsCartOpen(true);
  const handleCartClose = () => setIsCartOpen(false);

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      
      // ✅ Call backend logout endpoint to clear session
      await axios.post(
        `${apiUrl}/api/member/logout`,
        {},
        { withCredentials: true }
      );
      
      console.log("✅ Logout successful - backend session cleared");
    } catch (error) {
      console.error("❌ Logout error:", error);
    } finally {
      // ✅ Clear localStorage
      localStorage.removeItem("memberData");
      
      // ✅ Clear the accessToken cookie
      cookies.remove("accessToken", { path: "/" });
      
      // ✅ Update global context
      setAuthMember(null);
      
      // ✅ Navigate to home
      navigate("/");
      handleMenuClose();
    }
  };

  const cartItems = useAppSelector(selectCartItems);
  const cartCount = cartItems.reduce(
    (sum: number, item: any) => sum + item.quantity,
    0
  );

  return (
    <div className="home-navbar">
      <Container sx={{ mt: "30px", height: "80px" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ height: "100%" }}
        >
          {/* === LOGO === */}
          <Box>
            <NavLink to="/">
              <img
                src="/img/logo.png"
                alt="Reverso Logo"
                style={{ height: "190px", objectFit: "contain" }}
              />
            </NavLink>
          </Box>

          {/* === NAVIGATION MENU === */}
          <Stack direction="row" spacing={4} alignItems="center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Shop
            </NavLink>

            {/* === CART DRAWER === */}
            <MiniCartDrawer isOpen={isCartOpen} onClose={handleCartClose} />

            {/* === CONDITIONAL LINKS === */}
            {authMember && (
              <>
                <NavLink
                  to="/order"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Orders
                </NavLink>

                <NavLink
                  to="/account"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  My Page
                </NavLink>
              </>
            )}

            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              About Us
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Contact Us
            </NavLink>

            {/* === LOGIN BUTTON === */}
            {!authMember && (
              <Button
                variant="contained"
                sx={{ backgroundColor: "#343434", color: "#f8f8ff" }}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            )}

            {/* === RIGHT ICON GROUP === */}
            <Box className="icon-group" display="flex" alignItems="center" gap={2}>
  <div className="custom-badge cart-icon" onClick={handleCartOpen}>
    <ShoppingCartIcon sx={{ fontSize: 26, color: "#343434" }} />
    <span className="badge-count">{cartCount}</span>
  </div>

  <SearchIcon
    sx={{ fontSize: 24, color: "#343434", cursor: "pointer" }}
  />

  <IconButton onClick={handleMenuOpen}>
    <MenuIcon sx={{ fontSize: 26, color: "#343434" }} />
  </IconButton>
</Box>

          </Stack>
        </Stack>
      </Container>

      {/* === DROPDOWN MENU === */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {authMember ? (
          [
            <Box
              key="profile-header"
              textAlign="center"
              py={1.5}
              sx={{ borderBottom: "1px solid #eee" }}
            >
              <Avatar
                src={`${serverApi}/uploads/members/${authMember.memberImage}`}
                sx={{ width: 56, height: 56, margin: "0 auto" }}
              />
              <Box mt={1} fontWeight="bold">
                {authMember.memberNick}
              </Box>
            </Box>,
            <MenuItem
              key="account"
              onClick={() => {
                navigate("/account");
                handleMenuClose();
              }}
            >
              My Page
            </MenuItem>,
            <MenuItem
              key="orders"
              onClick={() => {
                navigate("/orders");
                handleMenuClose();
              }}
            >
              Orders
            </MenuItem>,
            <MenuItem key="logout" onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>,
          ]
        ) : (
          <MenuItem
            onClick={() => {
              navigate("/login");
              handleMenuClose();
            }}
          >
            Login
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}

