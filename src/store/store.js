import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../Feature/ProductList/ProductListSlice"

const store = configureStore({
    reducer:{
        productsIndex: productReducer
    }
})

export default store;