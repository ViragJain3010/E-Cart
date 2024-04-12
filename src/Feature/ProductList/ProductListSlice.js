import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createNewProduct,
  fetchProductByID,
  fetchProductsByFilter,
  updateProduct,
} from "./ProductListAPI";

const IDLE = "idle";
const LOADING = "loading";

const initialState = {
  products: [],
  status: IDLE,
  totalItems: 0,
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
  async ({ filter, sort, pagination, user }) => {
    const response = await fetchProductsByFilter(filter, sort, pagination, user);
    return response.data;
  }
);

export const fetchProductByIDAsync = createAsyncThunk(
  "products/fetchProductByID",
  async (id) => {
    const response = await fetchProductByID(id);
    return response;
  }
);

export const createNewProductAsync = createAsyncThunk(
  "product/createNewProduct",
  async (productData) => {
    const response = await createNewProduct(productData);
    return response;
  }
);

export const updateProductAsync = createAsyncThunk(
  "product/updateProduct",
  async (productData) => {
    const response = await updateProduct(productData);
    return response;
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //  <-- Filtered products fetch -->
      .addCase(fetchProductsByFilterAsync.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
        state.status = IDLE;
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })

      // <-- Specific Product Fetch By ID -->
      .addCase(fetchProductByIDAsync.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(fetchProductByIDAsync.fulfilled, (state, action) => {
        state.status = IDLE;
        state.productByID = action.payload;
      })

      .addCase(createNewProductAsync.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(createNewProductAsync.fulfilled, (state, action) => {
        state.status = IDLE;
        state.products.push(action.payload.products);
      })

      .addCase(updateProductAsync.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
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
export const SelectProductByID = (state) => state.productsIndex.productByID;
export const SelectProductListLoadingStatus = (state) =>
  state.productsIndex.status;
