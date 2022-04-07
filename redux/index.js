import { combineReducers } from "redux";
// import all reducer
import appReducer from "./reducers/app";

const appsReducer = combineReducers({
    app: appReducer
})

export default appsReducer;