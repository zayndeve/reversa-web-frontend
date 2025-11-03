import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";
import homePageReducer from "./homePage/slice";
import cartReducer from "../components/headers/cartSlice";

const dummySlice = createSlice({
  name: "dummy",
  initialState: {},
  reducers: {},
});

export const store = configureStore({
  reducer: {
    dummy: dummySlice.reducer,
    homePage: homePageReducer,
    cart: cartReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
