import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createLoggedInUserData,
  fetchLoggedInUserData,
  updateLoggedInUserData,
} from "./UserAPI";

const IDLE = "idle";
const LOADING = "loading";

const initialState = {
  info: null,
};

export const createLoggedInUserDataAsync = createAsyncThunk(
  "user/createLoggedInUserData",
  async (data) => {
    const response = await createLoggedInUserData(data);
    return response;
  }
);

export const fetchLoggedInUserDataAsync = createAsyncThunk(
  "user/fetchLoggedInUserData",
  async (userID) => {
    const response = await fetchLoggedInUserData(userID);
    return response;
  }
);

export const updateLoggedInUserDataAsync = createAsyncThunk(
  "user/updateLoggedInUserData",
  async (data) => {
    const response = await updateLoggedInUserData(data);
    return response;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    nullifyUserIndex: (state) => {
      state.info = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserDataAsync.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(fetchLoggedInUserDataAsync.fulfilled, (state, action) => {
        state.status = IDLE;
        state.info = action.payload;
      })
      .addCase(updateLoggedInUserDataAsync.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(updateLoggedInUserDataAsync.fulfilled, (state, action) => {
        state.status = IDLE;
        state.info = action.payload;
      })
      .addCase(createLoggedInUserDataAsync.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(createLoggedInUserDataAsync.fulfilled, (state, action) => {
        state.status = IDLE;
        state.info = action.payload;
      });
  },
});

export const { nullifyUserIndex } = userSlice.actions;

export default userSlice.reducer;

// UseSelector's
export const SelectLoggedInUserInfo = (state) => state.userIndex.info;
export const SelectUserLoadingStatus = (state) => state.userIndex.status;
