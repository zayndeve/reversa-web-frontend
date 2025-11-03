import React from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

import {
  selectCartItems,
  selectCartTotal,
  removeItem,
  clearCart,
} from "./cartSlice";
import { serverApi } from "../../../app/libs/config";
import { useAppDispatch, useAppSelector } from "../../../app/screens/hooks";
import { CartItem } from "./cartSlice"; // ✅ import your own type
import "../../css/basket.css";

interface MiniCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MiniCartDrawer({
  isOpen,
  onClose,
}: MiniCartDrawerProps) {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartTotal).toFixed(2);

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
          {cartItems.length === 0 ? (
            <Typography variant="body2" sx={{ textAlign: "center", mt: 4 }}>
              Your cart is empty.
            </Typography>
          ) : (
            cartItems.map((item: CartItem) => (
              <Box key={item.id} className="cart-item">
                <img
                  src={`${serverApi}/${item.image}`}
                  alt={item.name}
                  className="item-img"
                />
                <Box className="item-info">
                  <Typography variant="body1">{item.name}</Typography>
                  <Typography variant="body2">
                    {item.quantity} x ${item.price.toFixed(2)}
                  </Typography>
                </Box>
                <IconButton
                  className="remove-btn"
                  onClick={() => dispatch(removeItem(item.id))}
                >
                  <ClearIcon />
                </IconButton>
              </Box>
            ))
          )}

          {cartItems.length > 0 && (
            <>
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

              <Button
                fullWidth
                sx={{ mt: 2 }}
                variant="outlined"
                color="error"
                onClick={() => dispatch(clearCart())}
              >
                Clear All
              </Button>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}
