import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

// Handles asynchronus updates of authentication state
 const loginAsync = createAsyncThunk("loginAsync", async (payload) => {
  // check if user is connected to the internet
  // const isOnline = window.navigator.onLine;
  
  const url = process.env.REACT_APP_AUTH_ENDPOINT_LOGIN;
  const config = {
    method: "POST",
    headers: {
      reactkey: process.env.REACT_APP_AUTH_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  const response = await fetch(url, config)
    .then((data) => data.json())
    .catch((err) => err);

  const authObj = JSON.stringify({
    username: response.user.username,
    token: response.token,
  });

  sessionStorage.setItem("vsrz", authObj);

  return response;
});

 const authSlice = createSlice({
  name: "auth",
  // Authentication state
  initialState: {
    isLoading: false,
    isErr: false,
    errMessage: "",
    loggedIn: false,
    loggedOut: true,
    userAuthKey: "",
    username: "",
  },
  reducers: {
    // Reset authentication state
    logout: (state) => {
      console.log("logout");
      sessionStorage.setItem("vsrz", null);

      return {
        ...state,
        loggedIn: false,
        loggedOut: true,
        userAuthKey: "",
        username: "",
      };
    },
    getSavedCridentials: (state) => {
      const data = JSON.parse(sessionStorage.getItem("vsrz"));
      // simulate checking if auth key is expired or valid
      if (data != null) {
        const { username, token } = data;
        return {
          ...state,
          username,
          userAuthKey: token,
          loggedIn: true,
          loggedOut: false,
        };
      }

      // console.log(username,token);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAsync.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(loginAsync.rejected, (state, action) => {
      state.isErr = true;
      state.isLoading = false;
      
      // if (action.payload.error == "User Does Not Exist") {
        state.isErr = true;
        state.errMessage = "You are not a registered user!";
      // } else {
      //   state.errMessage =
      //     "Network Error! Please make sure you are connected to the internet";
      // }
    });

    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.isLoading = false;

      if (action.payload.token != "") {
        state.loggedIn = true;
        state.loggedOut = false;
        state.userAuthKey = action.payload.token;
        state.username = action.payload.user.username;
      }
    });
  },
});

// export const { logout, getSavedCridentials } = authSlice.actions;
// export default authSlice.reducer;
