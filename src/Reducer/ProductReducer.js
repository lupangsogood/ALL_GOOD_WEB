import ActionRedux from "../Action/action";
import { combineReducers } from "redux";

const initialState = {
  loggedOut: false,
  fetchDataSuccress: {
    head: "",
    body: "",
    message: ""
  }
};

const appReducerState = {};

const appReducer = combineReducers({
  loggedOut: (loggedOut = "true") => loggedOut
});

const ProductReducer = (state = initialState, action) => {
  // console.log(action.type);
  switch (action.type) {
    case ActionRedux.Types.FETCH_DATA_SUCCESS:
      return {
        result: action.data
      };

    case ActionRedux.Types.FETCH_DATA_FAILURE:
      return {
        result: action.data,
        loading: false
      };

    case ActionRedux.Types.CLEAR_PRODUCT_DATA:
      return appReducer(state, action);
    default:
      console.log("Unknown ACTION");
      return {
        result: action.data,
        loading: false
      };
      break;
  }
};

export default ProductReducer;
