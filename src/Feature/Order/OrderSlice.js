import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addOrder, fetchAllOrders, fetchAllOrdersByUserId, updateOrder } from "./OrderAPI";

const IDLE = "idle";
const LOADING = "loading";

const initialState = {
  status: IDLE,
  orders: [], // All orders
  currentOrder: null,
  totalOrders: 0,
};

export const addOrderAsync = createAsyncThunk(
  "order/addorder",
  async (data) => {
    const response = await addOrder(data);
    return response.data;
  }
);

export const fetchAllOrdersByUserIdAsync = createAsyncThunk(
  "order/fetchAllOrdersByUserId",
  async (data) => {
    const response = await fetchAllOrdersByUserId(data);
    return response.data;
  }
);

export const fetchAllOrdersAsync = createAsyncThunk(
  "order/fetchAllOrders",
  async ({ sort, pagination }) => {
    const response = await fetchAllOrders(sort, pagination);
    return response.data;
  }
);

export const updateOrderAsync = createAsyncThunk(
  "order/updateOrder",
  async (order ) => {
    const response = await updateOrder(order);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    nullifyOrderIndex: (state) => {
      state.currentOrder = null;
      state.orders = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // <-- Add Order -->
      .addCase(addOrderAsync.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(addOrderAsync.fulfilled, (state, action) => {
        state.status = IDLE;
        // state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })

      // <-- Fetch By User ID -->
      .addCase(fetchAllOrdersByUserIdAsync.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(fetchAllOrdersByUserIdAsync.fulfilled, (state, action) => {
        state.status = IDLE;
        state.orders = action.payload;
      })

      // <-- Fetch All Orders -->
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = IDLE;
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders;
      })

      // <-- Update Order -->
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = LOADING
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = IDLE;
        state.orders = state.orders.map((order) =>
          order.id === action.payload.id ? action.payload : order
        );
      });
  },
});

export const { resetCurrentOrder, nullifyOrderIndex } = orderSlice.actions;
export default orderSlice.reducer;

// useSelector's
export const SelectOrders = (state) => state.orderIndex.orders;
export const SelectCurrentOrder = (state) => state.orderIndex.currentOrder;
export const SelectTotalOrders = (state) => state.orderIndex.totalOrders;
export const SelectOrderLoadingStatus = (state) => state.orderIndex.status;
