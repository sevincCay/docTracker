import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = process.env.REACT_APP_BASEURL;
// get all users
export const getUsers = createAsyncThunk(
  "usersList/getUsers",
  async (thunkAPI) => {
    const token = localStorage.getItem("auth-token");
    try {
      const response = await axios({
        method: "GET",
        url: `${baseUrl}/users/users`,
        headers: {
          "auth-token": token,
        },
      });
      return await response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const usersSlice = createSlice({
  name: "list",
  initialState: {
    users: [],
    isLoading: "idle",
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.users = [];
      state.loading = "loading";
    });
    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      state.users = payload;
      state.loading = "loaded";
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.loading = "error";
      state.error = action.error.message;
    });
  },
});

export const userList = usersSlice.reducer;

/**
 * Get single user details
 */

export const getUserDetails = createAsyncThunk(
  "singleUser/getUserDetails",
  async (userId, thunkAPI) => {
    const token = localStorage.getItem("auth-token");
    try {
      const response = await axios({
        method: "GET",
        url: `${baseUrl}/users/user/${userId}`,
        headers: {
          "auth-token": token,
        },
      });
      const { name, lastName, email, Department, Role, Docs } = response.data;
      const userData = {
        name: name,
        lastName: lastName,
        email: email,
        department: Department.name,
        role: Role.name,
        docs: Docs,
      };
      return userData;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getUserDetailsSlice = createSlice({
  name: "getUserDetails",
  initialState: {
    isLoading: "idle",
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserDetails.pending, (state) => {
      state.isLoading = "loading";
    });
    builder.addCase(getUserDetails.fulfilled, (state, { payload }) => {
      state = Object.assign(state, payload);
      state.isLoading = "loaded";
    });
    builder.addCase(getUserDetails.rejected, (state, action) => {
      state.isLoading = "error";
      state.error = action.error.message;
    });
  },
});
export const singleUser = getUserDetailsSlice.reducer;
