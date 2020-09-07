import { ADD_LOCATION, CLEAR_HISTORY, FETCH_WEATHER } from "./types";

export const addLocation = (location: any) => {
  return {
    type: ADD_LOCATION,
    payload: location,
  };
};

export const clearHistory = () => {
  return {
    type: CLEAR_HISTORY,
  };
};

export const fetchWeather = (coords: any) => {
  return async (dispatch: (arg0: { type: string; payload: any }) => void) => {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&type=like&&APPID=56c5a38b11c4c56fbcf54f474a72d731`
    );
    const json = await response.json();
    dispatch({
      type: FETCH_WEATHER,
      payload: {
        temp: json.list[0].main.temp,
        feels_like: json.list[0].main.feels_like,
        humidity: json.list[0].main.humidity,
        description: json.list[0].weather[0].description,
        wind: json.list[0].wind.speed,
        icon: json.list[0].weather[0].icon,
      },
    });
  };
};
