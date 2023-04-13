import { combineReducers } from "redux";
import ComponentsReducer from "./ComponentsReducer.js";

const rootReducer = combineReducers({
  componentsStore: ComponentsReducer,
});

export default rootReducer;
