import { ADD_LOCATION, CLEAR_HISTORY } from "./types";

const initialState = {
  locations: [],
};

export const locationReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_LOCATION: {
      return {
        ...state,
        locations: [...state.locations, action.payload],
      };
    }

    case CLEAR_HISTORY: {
      return {
        ...state,
        locations: [],
        weather: [],
      };
    }
    default:
      return state;
  }
};
