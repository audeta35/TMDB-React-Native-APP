import { combineReducers } from "redux";
// import all reducer
import appReducer from "./reducers/app";
import ListReducers from "./reducers/list";

const appsReducer = combineReducers({
    app: appReducer,
    list: ListReducers,
})

export default appsReducer;