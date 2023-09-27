import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import exploreReducer from "./slices/exploreSlice";
import selectReducer from "./slices/selectSlice";
import ticketReducer from "./slices/ticketSlice"
import gamesReducer from "./slices/gamesSlice"


export default configureStore({
  reducer: {
    ticket: ticketReducer,
    auth: authReducer,
    explore: exploreReducer,
    select: selectReducer,
    games: gamesReducer,
  },
});
