import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
// import gamesReducer from "./slices/gamesSlice";
// import selectReducer from "./slices/selectSlice";
// import ticketReducer from "./slices/ticketSlice"


export default configureStore({
  reducer: {
    // ticket: ticketReducer,
    auth: authReducer,
    // games: gamesReducer,
    // select: selectReducer,
  },
});
