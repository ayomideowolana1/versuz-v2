import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const getUserGamesAsync = createAsyncThunk(
  "getUnpairedGames",
  async (payload) => {

    const url = process.env.REACT_APP_BASE_URL;
    const config = {
      method: "GET",
      headers: {
        reactkey: process.env.REACT_APP_AUTH_KEY,
        Authorization: `Token ${payload}`
      },
    };
    const response = await fetch(url, config).then((data) => data.json());

    // console.log(config) ;

    
  }
);

export const userGamesSlice = createSlice({
  name: "userGames",
  initialState: {
    isLoading: false,
    isErr: false,
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserGamesAsync.pending, (state, action) => {
      state.isLoading = true;
      state.isErr = false;
    });
    builder.addCase(getUserGamesAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.isErr = true;
    });
    builder.addCase(getUserGamesAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isErr = false;
    //   state.data = action.payload.unpaired_betcodes;
    });
  },
});

// Action creators are generated for each case reducer function
export const { } = userGamesSlice.actions;

export default userGamesSlice.reducer;
