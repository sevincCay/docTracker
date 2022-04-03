import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BASEURL;
export const getDocData = createAsyncThunk(
  "doc/getDocData",
  async (docName, thunkAPI) => {
    try {
      const token = localStorage.getItem("auth-token");
      const response = await axios({
        method: "POST",
        url: `${baseUrl}/docs/byUser`,
        data: docName,
        headers: {
          "auth-token": token,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const documentSlice = createSlice({
  name: "documentData",
  initialState: {
    isLoading: "idle",
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDocData.pending, (state) => {
      state.isLoading = "loading";
    });
    builder.addCase(getDocData.fulfilled, (state, { payload }) => {
      state.isLoading = "loaded";
      state = Object.assign(state, payload);
    });
    builder.addCase(getDocData.rejected, (state, action) => {
      state.isLoading = "rejected";
      state.error = action.error.message;
    });
  },
});
export const documentData = documentSlice.reducer;

export const approveDoc = createAsyncThunk(
  "doc/approveDoc",
  async (docName, thunkAPI) => {
    try {
      const token = localStorage.getItem("auth-token");
      const response = await axios({
        method: "PUT",
        url: `${baseUrl}/docs/approve`,
        data: docName,
        headers: {
          "auth-token": token,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.isRejectedWithValue({ error: error.message });
    }
  }
);

export const approvalSlice = createSlice({
  name: "approveDocument",
  initialState: {
    isLoading: "idle",
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(approveDoc.pending, (state) => {
      state.isLoading = "loading";
    });
    builder.addCase(approveDoc.fulfilled, (state, { payload }) => {
      state.isLoading = "loaded";
      state = Object.assign(state, payload);
    });
    builder.addCase(approveDoc.rejected, (state, action) => {
      state.isLoading = "error";
      state.error = action.error.message;
    });
  },
});

export const approveDocument = approvalSlice.reducer;
