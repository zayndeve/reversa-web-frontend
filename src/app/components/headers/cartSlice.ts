import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}
// Load cart from localStorage
const loadCartFromStorage = (): CartItem[] => {
  try {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const initialState: CartState = {
  items: loadCartFromStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const existing = state.items.find((x) => x.id === item.id);
      if (existing) {
        existing.quantity += item.quantity;
      } else {
        state.items.push(item);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items)); // ✅ Save
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((x) => x.id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.items)); // ✅ Save
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cartItems"); // ✅ Clear
    },
  },
});

export const { addToCart, removeItem, clearCart } = cartSlice.actions;

// ✅ SELECTORS
export const selectCartItems = (state: any) => state.cart.items;
export const selectCartTotal = (state: any) =>
  state.cart.items.reduce(
    (sum: number, item: CartItem) => sum + item.price * item.quantity,
    0
  );

export default cartSlice.reducer;
