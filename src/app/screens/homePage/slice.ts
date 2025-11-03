import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../../app/libs/types/product";

// Define the slice state type
interface HomePageState {
  newProducts: Product[];
  popularProducts: Product[];
}

// Initial state
const initialState: HomePageState = {
  newProducts: [],
  popularProducts: [],
};

// Create slice
const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setNewProducts(state, action: PayloadAction<Product[]>) {
      state.newProducts = action.payload;
    },
    setPopularProducts(state, action: PayloadAction<Product[]>) {
      state.popularProducts = action.payload;
    },
  },
});

// Export actions and reducer
export const { setNewProducts, setPopularProducts } = homePageSlice.actions;
export default homePageSlice.reducer;
