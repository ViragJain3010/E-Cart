import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../Feature/ProductList/ProductListSlice";
import authReducer from "../Auth/AuthSlice";
import cartReducer from "../Feature/Cart/CartSlice";

const store = configureStore({
  reducer: {
    productsIndex: productReducer,
    authIndex: authReducer,
    cartIndex: cartReducer,
  },
});

export default store;
