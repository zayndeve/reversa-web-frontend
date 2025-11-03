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
import { useNavigate } from "react-router-dom";

interface MiniCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

// ✅ Universal safe resolver for images
const resolveImagePath = (img?: string) => {
  if (!img) return "/images/no-image.png";
  return img.startsWith("http")
    ? img
    : `${serverApi.replace(/\/$/, "")}/uploads/products/${img.replace(/^\/+/, "")}`;
};

export default function MiniCartDrawer({ isOpen, onClose }: MiniCartDrawerProps) {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartTotal).toFixed(2);
  const navigate = useNavigate();

  return (
    <>
      {isOpen && <div className="mini-cart-backdrop" onClick={onClose}></div>}

      <Box className={`mini-cart-drawer ${isOpen ? "open" : ""}`}>
        {/* === HEADER === */}
        <Box className="drawer-header">
          <Typography variant="h6">Shopping Cart</Typography>
          <IconButton className="remove-btn" onClick={onClose}>
            <ClearIcon />
          </IconButton>
        </Box>

        {/* === CONTENT === */}
        <Box className="drawer-content">
          {cartItems.length === 0 ? (
            <Typography variant="body2" sx={{ textAlign: "center", mt: 4 }}>
              Your cart is empty.
            </Typography>
          ) : (
            cartItems.map((item: CartItem, index: number) => (
              <Box key={`${item.id}-${index}`} className="cart-item">
                <img
                  src={resolveImagePath(item.image)}
                  alt={item.name || "Product"}
                  className="item-img"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/no-image.png";
                  }}
                />
                <Box className="item-info">
                  <Typography variant="body1">
                    {item.name || "Unnamed Product"}
                  </Typography>
                  <Typography variant="body2">
                    {item.quantity} × ${(item.price || 0).toFixed(2)}
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

          {/* === FOOTER === */}
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
                  navigate("/order");
                }}
              >
                VIEW CART / CHECKOUT
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
