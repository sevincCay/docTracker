/**
 * Logged in users' profile information
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = process.env.REACT_APP_BASEURL;

export const userProfile = createAsyncThunk(
  "loggedInUser/userProfile",
  async (thunkAPI) => {
    try {
      const token = localStorage.getItem("auth-token");
      const response = await axios({
        method: "POST",
        url: `${baseUrl}/users/profile`,
        headers: {
          "auth-token": token,
        },
      });

      const {
        name,
        lastName,
        email,
        department,
        role,
        myApprovals,
        myPendings,
        userDocs,
        sharedWith,
        receivedDocs,
      } = response.data;

      const profileData = {
        name: name,
        lastName: lastName,
        email: email,
        department: department,
        role: role,
        receivedDocs: receivedDocs,
        myApprovals: myApprovals,
        myPendings: myPendings,
        docs: userDocs,
        sharedWith: sharedWith,
      };
      return profileData;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const userProfileSlice = createSlice({
  name: "loggedInUser",
  initialState: {
    isLoading: "idle",
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userProfile.pending, (state) => {
      state.isLoading = "loading";
    });
    builder.addCase(userProfile.fulfilled, (state, { payload }) => {
      state.isLoading = "loaded";
      state = Object.assign(state, payload);
    });
    builder.addCase(userProfile.rejected, (state, action) => {
      state.isLoading = "error";
      state.error = action.error.message;
    });
  },
});

export const loggedInUser = userProfileSlice.reducer;
