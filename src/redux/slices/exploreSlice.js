import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getAvailableGamesAsync = createAsyncThunk(
  "getAvailableGamesAsync",
  async (payload) => {
    const url = "https://www.backend.versuz.co/";
    const config = {
      method: "GET",
      headers: {
        reactkey: process.env.REACT_APP_AUTH_KEY,
        "Content-Type": "application/json",
        "Authorization": `Token ${JSON.parse(sessionStorage.getItem("vsrz")).token}`
      },
      // body: JSON.stringify(payload),
    };

    const response = await fetch(url, config)
      .then((data) => data.json())
      .catch((err) => err);

    return response;
  }
);

export const exploreSlice = createSlice({
  // Authentication state
  name: "explore",
  initialState: {
    games: [],
    loading:false,
    error:false,
    errMessage: ""

  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAvailableGamesAsync.pending, (state, action) => {
      // clean state when making a new request
      state.loading = true
    });
    builder.addCase(getAvailableGamesAsync.rejected, (state, action) => {
      //   request rejected
      state.login.loading = false;
      state.login.isErr = true;
      state.login.errMessage = "Unable to fetch games";
    });
    builder.addCase(getAvailableGamesAsync.fulfilled, (state, action) => {
        state.loading = false
      if (!action.payload.success) {
        state.error = true;
        state.errMessage = "Unable to fetch games"
      } else {
        console.log(action.payload)
        state.games = action.payload.unpaired_betcodes
        
      }
    });
  },
});

export const { logout, getSavedCridentials } = exploreSlice.actions;
export default exploreSlice.reducer;
