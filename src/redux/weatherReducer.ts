const initialState = {
  weather: [],
};

export const weatherReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "FETCH_WEATHER": {
      return {
        ...state,
        weather: [...state.weather, action.payload],
      };
    }
    default:
      return state;
  }
};
