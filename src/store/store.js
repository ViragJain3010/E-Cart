import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../Feature/ProductList/ProductListSlice";
import authReducer from "../Auth/AuthSlice";
import cartReducer from "../Feature/Cart/CartSlice";
import orderReducer from "../Feature/Order/OrderSlice"
import userReducer from "../Feature/Users/UserSlice"

const store = configureStore({
  reducer: {
    productsIndex: productReducer,
    authIndex: authReducer,
    cartIndex: cartReducer,
    orderIndex: orderReducer,
    userIndex: userReducer,
  },
});

export default store;
