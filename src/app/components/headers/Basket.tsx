import React from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import "../../css/basket.css";
import ClearIcon from "@mui/icons-material/Clear";

interface MiniCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MiniCartDrawer({
  isOpen,
  onClose,
}: MiniCartDrawerProps) {
  const cartItems = [
    {
      id: 1,
      name: "Autem ipsa ad",
      price: 145.8,
      qty: 1,
      img: "/img/sample1.jpg",
    },
    {
      id: 2,
      name: "Tenetur illum amet",
      price: 150.8,
      qty: 1,
      img: "/img/sample2.jpg",
    },
    {
      id: 3,
      name: "Non doloremque placeat",
      price: 160.8,
      qty: 1,
      img: "/img/sample3.jpg",
    },
  ];

  const subtotal = cartItems
    .reduce((sum, item) => sum + item.price * item.qty, 0)
    .toFixed(2);

  return (
    <>
      {isOpen && <div className="mini-cart-backdrop" onClick={onClose}></div>}

      <Box className={`mini-cart-drawer ${isOpen ? "open" : ""}`}>
        <Box className="drawer-header">
          <Typography variant="h6">Shopping Cart</Typography>
          <IconButton className="remove-btn" onClick={onClose}>
            <ClearIcon />
          </IconButton>
        </Box>

        <Box className="drawer-content">
          {cartItems.map((item) => (
            <Box key={item.id} className="cart-item">
              <img src={item.img} alt={item.name} className="item-img" />
              <Box className="item-info">
                <Typography variant="body1">{item.name}</Typography>
                <Typography variant="body2">
                  {item.qty} x ${item.price.toFixed(2)}
                </Typography>
              </Box>
              <IconButton className="remove-btn">
                <ClearIcon />
              </IconButton>
            </Box>
          ))}
          <Box className="subtotal-box">
            <Typography variant="body1">Subtotal</Typography>
            <Typography variant="body1">${subtotal}</Typography>
          </Box>

          <Button
            fullWidth
            variant="contained"
            className="mini-cart-button"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              onClose();
            }}
          >
            MINI CART (Orders)
          </Button>
        </Box>
      </Box>
    </>
  );
}
