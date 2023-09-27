import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";




    

export const gamesSlice = createSlice({
  // Authentication state
  name: "games",
  initialState: {
    unpaired:[],
    paired:[],
    loading:true
  },
  reducers: {
    setBetCodes: (state, action) => {
      return {
        ...state,
        unpaired: action.payload.unpaired,
        paired: action.payload.paired,
        
      };
    },
    setLoading: (state, action) => {
      return {
        ...state,
        loading: action.payload
        
      };
    },
    
  },
  extraReducers: (builder) => {
    
  },
});

export const { setBetCodes,setLoading } = gamesSlice.actions;
export default gamesSlice.reducer;
