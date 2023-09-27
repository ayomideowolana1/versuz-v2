import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const selectSlice = createSlice({
  // Authentication state
  name: "select",
  initialState: {
    // region,competition,fixtures
    current: "regions",
    previous: "",
    regions: [],
    competitions: [],
    currentRegion: {
      id: "",
      name: "",
    },
    competition: {
      id: "",
      name: "",
      emblem: "",
    },
    currentFixture: {
      id: "",
      name: "",
      data: {},
    },
    selectionState: {
      game_type : "new",
    },
    // navigationLoading
    dataLoading: true

  },
  reducers: {
    setDataLoading: (state, action) => {
      console.log(action.payload)
      return {
        ...state,
        dataLoading: action.payload
      };
    },
    setView: (state, action) => {
      return {
        ...state,
        previous: state.current,
        current: action.payload,
      };
    },

    setCurrentRegion: (state, action) => {
      return {
        ...state,
        currentRegion: action.payload,
      };
    },

    setRegions: (state, action) => {
      return {
        ...state,
        regions: action.payload,
      };
    },

    setCompetition: (state, action) => {
      return {
        ...state,
        competition: action.payload,
      };
    },
    setCompetitions: (state, action) => {
      return {
        ...state,
        competitions: action.payload,
      };
    },

    setCurrentFixture: (state, action) => {
      return {
        ...state,
        currentFixture: action.payload,
      };
    },
  },
});

export const {
  setView,
  setCurrentRegion,
  setCompetition,
  setRegions,
  setCompetitions,
  setCurrentFixture,
  setDataLoading
} = selectSlice.actions;
export default selectSlice.reducer;
