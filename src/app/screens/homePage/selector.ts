import { createSelector } from "reselect";
import { AppRootState } from "../../../app/libs/types/screen";
// Adjust the path based on where AppRootState is defined

// Select main home page slice
const selectHomePage = (state: AppRootState) => state.homePage;

// ✅ Products
export const selectNewProducts = createSelector(
  selectHomePage,
  (homePage) => homePage.newProducts
);

export const selectPopularProducts = createSelector(
  selectHomePage,
  (homePage) => homePage.popularProducts
);
