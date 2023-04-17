import { combineReducers } from "redux";
import ComponentsReducer from "./ComponentsReducer.js";
import MessagesReducer from "./MessagesReducer.js";
import OfferReducer from "./OfferReducer.js";

const rootReducer = combineReducers({
  componentsStore: ComponentsReducer,
  messagesStore: MessagesReducer,
  offerStore: OfferReducer,
});

export default rootReducer;
