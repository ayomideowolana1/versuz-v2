import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

function convertObject(inputObject) {
  let transformedObject = {};
  for (let key in inputObject) {
    if (inputObject.hasOwnProperty(key)) {
      let value = inputObject[key];
      let transformedValues = Object.values(value);
      transformedObject[key] = transformedValues;
    }
  }
  return transformedObject;
}

export const createTicketAsync = createAsyncThunk(
  "createTicketAsync",
  async (payload) => {
    // console.log(payload)
    const data = convertObject(payload.options);

    const amount = payload.amount;
    const body = {
      amount,
      data,
      
    };
    console.log(body);
    const url = "https://www.backend.versuz.co/versus";

    const config = {
      method: "POST",
      headers: {
        Authorization: `Token ${sessionStorage.getItem('vsrz').token}`,
        reactkey: process.env.REACT_APP_AUTH_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    const response = await fetch(url, config).then((data) => data.json());
    return response;
  }
);
function convertToArray(object) {
  let result = [];

  for (let key in object) {
    for (let key2 in object[key]) {
      result.push(`${key}|${key2}|${object[key][key2]}`);
    }
  }

  // console.log(result)
  return result;
}
export const ticketSlice = createSlice({
  name: "ticket",
  initialState: {
    createTicketState: {
      isErr: false,
      isLoading: false,
      errMessage: "",
      ticketCreated: false,
      ticketPaired: false,
      pairCode: false,
    },
    selectedOptions: {},
    selectedOptionsArray: [],
    totalOdds: 0,
    selectedOptionsCount: 0,
    games: [],

    pairID: 0,
    pairStake: 0,
  },
  reducers: {
    updateSelectedOptions: (state, action) => {
      const { fixtureId, group, option, odd } = action.payload;

      console.log(action.payload);

      const string = JSON.stringify(state.selectedOptions);
      const json = JSON.parse(string);

      // console.log(action.payload);

      if (json.hasOwnProperty(fixtureId)) {
        // if group exists in fixtureId
        if (json[fixtureId].hasOwnProperty(group)) {
          // update option
          if (json[fixtureId][group] == option) {
            console.log("delete option");
            delete json[fixtureId][group];
            if (JSON.stringify(json[fixtureId]) == "{}") {
              delete json[fixtureId];
            }
            console.log(json);
          } else {
            console.log("update option");
            json[fixtureId][group] = option;
          }

          return {
            selectedOptions: json,
          };
        } else {
          console.log("group doesn't exist");
          // add group
          let newState = {
            ...state,
            selectedOptions: {
              ...state.selectedOptions,
              [fixtureId]: {
                ...state.selectedOptions[fixtureId],
                [group]: option,
              },
            },
          };

          return newState;
        }
      } else {
        // console.log("not exists")
        let newState = {
          ...state,
          selectedOptions: {
            ...state.selectedOptions,
            [fixtureId]: {
              [group]: option,
            },
          },
        };

        return newState;
      }
    },
    deleteSelectedOptions: (state, action) => {
      const { fixtureId, group, option, odd } = action.payload;

      console.log(action.payload);

      const string = JSON.stringify(state.selectedOptions);
      const json = JSON.parse(string);

      // console.log(action.payload);

      if (json.hasOwnProperty(fixtureId)) {
        // if group exists in fixtureId
        if (json[fixtureId].hasOwnProperty(group)) {
          // update option
          if (json[fixtureId][group] == option) {
            console.log("delete option");
            delete json[fixtureId][group];
            if (JSON.stringify(json[fixtureId]) == "{}") {
              delete json[fixtureId];
            }
            console.log(json);
          }

          return {
            selectedOptions: json,
          };
        }
      }
    },
    updateSelectedOptionsArray: (state, action) => {
      return {
        ...state,
        selectedOptionsArray: convertToArray(state.selectedOptions),
      };
    },
    getTicketCount: (state, action) => {
      let obj = state.selectedOptions;
      let fieldCount = 0;

      for (const key in obj) {
        for (const subKey in obj[key]) {
          fieldCount++;
        }
      }

      return {
        ...state,
        selectedOptionsCount: fieldCount,
      };
    },
    updateGames: (state, action) => {
      return {
        ...state,
        games: {
          ...state.games,
          [action.payload.id]: action.payload.data,
        },
      };
    },
    setPairDetails: (state, action) => {
      const { id, stake,number_of_games } = action.payload;
      return {
        ...state,
        pairID: id,
        pairStake: stake,
        number_of_games: number_of_games,
      };
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(createTicketAsync.pending, (state, action) => {
  //     state.createTicketState.isLoading = true;
  //     console.log("loading")
  //   });
  //   builder.addCase(createTicketAsync.rejected, (state, action) => {
  //     state.createTicketState.isLoading = false;
  //     console.log("failed")

  //   });

  //   builder.addCase(createTicketAsync.fulfilled, (state, action) => {
  //     state.createTicketState.isLoading = false;
  //     console.log(action.payload)
  //     if(action.payload.error ){
  //       alert(action.payload.error)
  //     }else if(action.payload.success=="Excercise Patience, your betcode will be paired with soon") {
  //       state.createTicketState.isLoading = false;
  //       state.createTicketState.ticketCreated = true;
  //       state.createTicketState.ticketPaired = false;
  //       //  { success: "Betcode has been succesfully paired with 4LIBWJ4A", pair_code: "UN3VTXK2TXTV" }
  //     }else {
  //       state.createTicketState.isLoading = false;
  //       state.createTicketState.ticketCreated = true;
  //       state.createTicketState.ticketPaired = true;
  //       state.createTicketState.pairCode = action.payload.pair_code

  //     }

  //     console.log(action)

  //   });
  // },
});

export const {
  updateSelectedOptions,
  updateSelectedOptionsArray,
  deleteSelectedOptions,
  getTicketCount,
  updateGames,
  setPairDetails
} = ticketSlice.actions;
export default ticketSlice.reducer;
