import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  deleteItemFromCart,
  fetchItemsByUserId,
  resetCart,
  updateCart,
} from "./CartAPI";

const IDLE = "idle";
const LOADING = "loading";

const initialState = {
  status: IDLE,
  items: [],
  cartLoaded: false,
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (data) => {
    const response = await addToCart(data);
    return response.data;
  }
);

export const fetchItemsByUserIdAsync = createAsyncThunk(
  "cart/fetchItemsByUserId",
  async (data) => {
    const response = await fetchItemsByUserId(data);
    return response;
  }
);

export const updateCartAsync = createAsyncThunk(
  "cart/updateCart",
  async (update) => {
    const response = await updateCart(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const deleteItemFromCartAsync = createAsyncThunk(
  "cart/deleteItemFromCart",
  async (itemId) => {
    const response = await deleteItemFromCart(itemId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const resetCartAsync = createAsyncThunk(
  "cart/resetCart",
  async (userId) => {
    const response = await resetCart(userId);
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    nullifyCartIndex: (state) => {
      state.cartLoaded = false;
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = IDLE;
        state.items.push(action.payload);
      })
      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = IDLE;
        state.items = action.payload;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = IDLE;
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
      })
      .addCase(deleteItemFromCartAsync.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
        state.status = IDLE;
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(resetCartAsync.fulfilled, (state) => {
        state.status = IDLE;
        state.items = [];
      });
  },
});

export const { nullifyCartIndex } = cartSlice.actions;

export default cartSlice.reducer;

// UseSelector's
export const SelectCartItems = (state) => state.cartIndex.items;
export const SelectCartLoadingStatus = (state) => state.cartIndex.status;