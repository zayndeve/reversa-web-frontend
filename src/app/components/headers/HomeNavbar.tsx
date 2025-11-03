import { Box, Button, Container, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import MiniCartDrawer from "./Basket";
import { useState } from "react";

export function HomeNavbar() {
  const authMember = null;

  const [isCartOpen, setIsCartOpen] = useState(false);

  /*==HANDLERS==*/
  const handleCartOpen = () => {
    setIsCartOpen(true);
  };
  const handleCartClose = () => {
    setIsCartOpen(false);
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

          {/* Navigation Menu */}
          <Stack direction="row" spacing={4} alignItems="center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Home{" "}
              <i
                className="icon ion-ios-arrow-down"
                style={{ fontSize: "15px" }}
              ></i>
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Shop{" "}
              <i
                className="icon ion-ios-arrow-down"
                style={{ fontSize: "15px" }}
              ></i>
            </NavLink>
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

            <MiniCartDrawer isOpen={isCartOpen} onClose={handleCartClose} />
            {authMember ? (
              <>
                <NavLink
                  to="/orders"
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
            ) : (
              <Button
                variant="contained"
                sx={{ backgroundColor: "#343434", color: "#f8f8ff" }}
              >
                Login
              </Button>
            )}

            <Box
              className="icon-group"
              display="flex"
              alignItems="center"
              gap={2}
            >
              <div className="custom-badge" onClick={handleCartOpen}>
                <i className="icon ion-ios-cart"></i>
                <span className="badge-count">3</span>
              </div>
              <i className="icon ion-ios-search"></i>
              <i className="icon ion-ios-menu"></i>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
