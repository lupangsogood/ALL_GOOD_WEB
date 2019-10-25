import { combineReducers } from "redux";
import ProductReducer from "./ProductReducer";
import UserReducer from "./UserReducer";
import FetchProductReducer from "./FetchProductReducer";

const appReducer = combineReducers({
  FetchProductReducer,
  ProductReducer,
  UserReducer
});

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
