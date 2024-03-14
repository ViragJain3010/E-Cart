import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, checkUser } from "./AuthAPI";

const IDLE = "idle";
const LOADING = "loading";

const initialState = {
  loggedInUser: null,
  status: IDLE,
  error: null,
};

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (data) => {
    const response = await createUser(data);
    console.log(response);
    return response;
  }
);

export const checkUserAsync = createAsyncThunk(
  "user/checkUser",
  async (data) => {
    const response = await checkUser(data);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: [],
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = IDLE;
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = IDLE;
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = IDLE;
        state.error = action.error;
        console.log(state.error);
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;

// UseSelector's
export const SelectLoggedInUser = (state) => state.authIndex.loggedInUser;
export const SelectError = (state) => state.authIndex.error;
