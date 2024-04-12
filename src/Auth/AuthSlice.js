import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, checkUser, updateUser, signOut } from "./AuthAPI";

const IDLE = "idle";
const LOADING = "loading";

const initialState = {
  loggedInUser: null,
  status: IDLE,
  error: null,
};

export const createUserAsync = createAsyncThunk(
  "auth/createUser",
  async (data) => {
    const response = await createUser(data);
    return response;
  }
);

export const updateUserAsync = createAsyncThunk(
  "auth/updateUser",
  async (data) => {
    const response = await updateUser(data);
    return response;
  }
);

export const checkUserAsync = createAsyncThunk(
  "auth/checkUser",
  async (data) => {
    const response = await checkUser(data);
    return response.data;
  }
);

export const signOutAsync = createAsyncThunk(
  'user/signOut',
  async () => {
    const response = await signOut();
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    nullifyAuth: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = IDLE;
        state.loggedInUser = action.payload;
        state.error = null;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = IDLE;
        state.loggedInUser = action.payload;
        state.error = null;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = IDLE;
        state.error = action.error;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = IDLE;
        state.loggedInUser = action.payload;
        state.error = null;

      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(signOutAsync.fulfilled, (state) => {
        state.status = IDLE;
        state.loggedInUser = null;
        state.error = null;
      });
  },
});

export const {nullifyAuth} = userSlice.actions;

export default userSlice.reducer;

// UseSelector's
export const SelectLoggedInUser = (state) => state.authIndex.loggedInUser;
export const SelectError = (state) => state.authIndex.error;