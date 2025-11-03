import { Product } from "./product"; // if you have a shared Product type

export interface AppRootState {
  homePage: HomePageState;
  productsPage: ProductsPageState;
}

export interface HomePageState {
  newProducts: Product[];
  popularProducts: Product[];
}

export interface ProductsPageState {
  products: Product[];
  selectedProductIds: number[];
  viewMode: "grid" | "list";
  currentPage: number;
  productsPerPage: number;
}
