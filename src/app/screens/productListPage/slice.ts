import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  views: number;
}

export interface ProductsPageState {
  products: Product[];
  selectedProductIds: number[];
  viewMode: "grid" | "list";
  currentPage: number;
  productsPerPage: number;
}

const initialState: ProductsPageState = {
  products: [],
  selectedProductIds: [],
  viewMode: "grid",
  currentPage: 1,
  productsPerPage: 6,
};

const productsPageSlice = createSlice({
  name: "productsPage",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setSelectedProductIds: (state, action: PayloadAction<number[]>) => {
      state.selectedProductIds = action.payload;
    },
    setViewMode: (state, action: PayloadAction<"grid" | "list">) => {
      state.viewMode = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setProductsPerPage: (state, action: PayloadAction<number>) => {
      state.productsPerPage = action.payload;
    },
  },
});

export const {
  setProducts,
  setSelectedProductIds,
  setViewMode,
  setCurrentPage,
  setProductsPerPage,
} = productsPageSlice.actions;

export default productsPageSlice.reducer;
