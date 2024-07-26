import { configureStore } from "@reduxjs/toolkit";
import appConfigReducer from "./features/appConfig/appSlice";
import addProductSlice from "./features/appConfig/addProductSlice.js";

export const store = configureStore({
  reducer: {
    appConfig: appConfigReducer,
    product: addProductSlice,
  },
});
