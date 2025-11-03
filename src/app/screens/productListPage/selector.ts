import { createSelector } from "reselect";
import { AppRootState } from "../../../app/libs/types/screen";

const selectProductsPage = (state: AppRootState) => state.productsPage;

export const selectAllProducts = createSelector(
  selectProductsPage,
  (state) => state.products
);

export const selectSelectedProductIds = createSelector(
  selectProductsPage,
  (state) => state.selectedProductIds
);

export const selectViewMode = createSelector(
  selectProductsPage,
  (state) => state.viewMode
);

export const selectCurrentPage = createSelector(
  selectProductsPage,
  (state) => state.currentPage
);

export const selectProductsPerPage = createSelector(
  selectProductsPage,
  (state) => state.productsPerPage
);

export const selectPaginatedProducts = createSelector(
  [selectAllProducts, selectCurrentPage, selectProductsPerPage],
  (products, currentPage, perPage) => {
    const start = (currentPage - 1) * perPage;
    return products.slice(start, start + perPage);
  }
);

export const selectTotalPages = createSelector(
  [selectAllProducts, selectProductsPerPage],
  (products, perPage) => Math.ceil(products.length / perPage)
);
