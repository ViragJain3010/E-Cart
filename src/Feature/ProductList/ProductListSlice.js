import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllBrands,
  fetchAllCategory,
  fetchProductByID,
  fetchProductsByFilter,
} from "./ProductListAPI";

const IDLE = "idle";
const LOADING = "loading";

const initialState = {
  products: [],
  status: IDLE,
  totalItems: 0,
  category: [],
  brands: [],
  productByID: null,
};

// export const fetchAllProductsAsync = createAsyncThunk(
//   "products/fetchAllProducts",
//   async () => {
//     const response = await fetchAllProducts();
//     console.log(response);
//     return response;
//   }
// );

export const fetchProductsByFilterAsync = createAsyncThunk(
  "products/fetchProductsByFilter",
  async ({ filter, sort, pagination }) => {
    const response = await fetchProductsByFilter(filter, sort, pagination);
    return response.data;
  }
);

// export const fetchAllCategoryAsync = createAsyncThunk(
//   "products/fetchAllCategory",
//   async () => {
//     const response = await fetchAllCategory();
//     console.log(response);
//     return response;
//   }
// );

// export const fetchAllBrandsAsync = createAsyncThunk(
//   "products/fetchAllBrands",
//   async () => {
//     const response = await fetchAllBrands();
//     // console.log(response);
//     return response;
//   }
// );

export const fetchProductByIDAsync = createAsyncThunk(
  "products/fetchProductByID",
  async (id) => {
    const response = await fetchProductByID(id);
    return response;
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // .addCase(fetchAllProductsAsync.pending, (state) => {
      //   state.status = "loading";
      // })
      // .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
      //   state.status = "idle";
      //   state.products = action.payload;
      // })

      //  <-- Filtered products fetch -->
      .addCase(fetchProductsByFilterAsync.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
        state.status = IDLE;
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })

      // <-- Categories fetch -->
      // .addCase(fetchAllCategory.pending, (state) => {
      //   state.status = LOADING;
      // })
      // .addCase(fetchAllCategory.fulfilled, (state, action) => {
      //   state.status = IDLE;
      //   // console.log(action.payload, ":category");
      //   // state.category = action.payload;
      // });

      // // <-- Brands fetch -->
      // .addCase(fetchAllBrands.pending, (state) => {
      //   state.status = LOADING;
      // })
      // .addCase(fetchAllBrands.fulfilled, (state, action) => {
      //   state.status = IDLE;
      //   state.brands = action.payload;
      // });

      // <-- Specific Product Fetch By ID -->
      .addCase(fetchProductByIDAsync.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(fetchProductByIDAsync.fulfilled, (state, action) => {
        state.status = IDLE;
        state.productByID = action.payload;
      });
  },
});

export const {} = productSlice.actions;

export default productSlice.reducer;

// UseSelector's
export const SelectProducts = (state) => state.productsIndex.products;
export const SelectTotalItems = (state) => state.productsIndex.totalItems;
export const SelectAllCategory = (state) => state.productsIndex.category;
export const SelectAllBrands = (state) => state.productsIndex.brands;
export const SelectProductByID = (state) => state.productsIndex.productByID;
