import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
  "users/login",
  async (userData, thunkAPI) => {
    const baseUrl = process.env.REACT_APP_BASEURL;
    console.log(baseUrl);
    try {
      const response = await axios({
        method: "POST",
        url: `${baseUrl}/login`,
        data: userData,
      });

      localStorage.setItem("auth-token", response.headers["auth-token"]);
      const loginData = {
        name: response.data.name,
        token: response.headers["auth-token"],
      };

      return loginData;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const logout = createAsyncThunk("users/logout", async (thunkAPI) => {
  try {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("persist:root");
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

const initialState = {
  name: "",
  isLoading: "idle",
  isAuthenticated: false,
  "auth-token": "",
};

export const userLoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.name = "";
      state.isLoading = "loading";
      state.isAuthenticated = false;
      state["auth-token"] = "";
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.name = payload.name;
      state.isLoading = "loaded";
      state.isAuthenticated = true;
      state.authorization = payload.token;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = "error";
      state.isAuthenticated = false;
      state.error = action.error.message;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.name = "";
      state.isLoading = "idle";
      state.isAuthenticated = false;
      state["auth-token"] = "";
      state.authorization = "";
    });
  },
});

export const auth = userLoginSlice.reducer;
