import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginAsync = createAsyncThunk("loginAsync", async (payload) => {
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

export const signUpAsync = createAsyncThunk("signUpAsync", async (payload) => {
  // check if user is connected to the internet
  // const isOnline = window.navigator.onLine;

  const url = process.env.REACT_APP_AUTH_ENDPOINT_REGISTER;
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

  return response;
});


    

export const authSlice = createSlice({
  // Authentication state
  name: "auth",
  initialState: {
    authenticated: sessionStorage.getItem('vsrz') || false,
    authenticationToken: sessionStorage.getItem('vsrz') ? sessionStorage.getItem('vsrz').token : "",
    login: {
      loading: false,
      errMessage: "",
      isErr: false,
    },
    user: {
      username: "",
      userAuthKey: "",
    },
    signup: {
      loading: false,
      errMessage: "",
      isErr: false,
    },
    profile:{},
    
    loggedOut: true,
  },
  reducers: {
    setAuthenticated: (state, action) => {
      return {
        ...state,
        authenticated: action.payload.status,
        authToken: action.payload.token,
      };
    },
    verify: (state, action) => {
      
      return {
        ...state,
        authenticated: action.payload.status,
        authToken: action.payload.token,
      };
    },
    setProfile: (state,action) => {
      return{
        ...state,
        profile: action.payload
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginAsync.pending, (state, action) => {
      // clean state when making a new request
      state.login = {
        loading: true,
        errMessage: "",
        isErr: false,
      };
    });
    builder.addCase(loginAsync.rejected, (state, action) => {
      //   request rejected
      state.login.loading = false;
      state.login.isErr = true;
      state.login.errMessage = "Unable to login! Try again";
    });
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      if (!action.payload.success) {
        state.login = {
          loading: false,
          errMessage: "Invalid details! Try again",
          isErr: true,
        };
      } else {
        //   state.errMessage =
        //   "Network Error! Please make sure you are connected to the internet";
        state.login = {
          loading: false,
          errMessage: "Invalid details! Try again",
          isErr: true,
        };
      }
    });
    builder.addCase(signUpAsync.pending, (state, action) => {
      // clean state when making a new request
      state.signup = {
        loading: true,
        errMessage: "",
        isErr: false,
      };
    });
    builder.addCase(signUpAsync.rejected, (state, action) => {
      //   request rejected
      state.signup.loading = false;
      state.signup.isErr = true;
      state.signup.errMessage = "Sorry we couldn't sign you up! Try again";
    });
    builder.addCase(signUpAsync.fulfilled, (state, action) => {
      console.log(action.payload);
      //   if (!action.payload.success) {
      //       state.login = {
      //           loading: false,
      //           errMessage: "Invalid details! Try again",
      //           isErr: true,
      //         };

      // } else {
      //   //   state.errMessage =
      //   //   "Network Error! Please make sure you are connected to the internet";
      //   state.login = {
      //       loading: false,
      //       errMessage: "Invalid details! Try again",
      //       isErr: true,
      //     };
      // }
    });
  },
  
});

export const { logout, getSavedCridentials, setAuthenticated, setProfile } = authSlice.actions;
export default authSlice.reducer;
