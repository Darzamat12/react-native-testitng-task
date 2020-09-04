import { combineReducers } from "redux";
import {requestReducer} from './requestReducer'
import { locationReducer } from "./locationReducer";
import { weatherReducer } from "./weatherReducer";

export const rootReducer = combineReducers({
    requests: requestReducer,
    locations: locationReducer,
    weather: weatherReducer
})