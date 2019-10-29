import ActionRedux from "../Action/action";
// import { combineReducers } from "redux";

const initialState = {
  loggedOut: false,
  state: {
    head: "",
    body: "",
    message: ""
  }
};

// const appReducerState = {};

// const appReducer = combineReducers({
//   loggedOut: (loggedOut = "true") => loggedOut
// });

const ProductReducer = (state = initialState, action) => {
  // console.log(action.type);
  switch (action.type) {
    case ActionRedux.Types.ADD_PRODUCT_SUCCESS:
      console.log("FROM REDUCER " + action.type);
      state = {
        result: action.data,
        loading: true
      };
      return state;

    case ActionRedux.Types.EDIT_PRODUCT_SUCCESS:
      console.log("FROM REDUCER " + action.type);
      state = {
        result: action.data,
        loading: true
      };
      return state;

    case ActionRedux.Types.DELETE_PRODUCT_SUCCESS:
      console.log("FROM REDUCER " + action.type);
      state = {
        result: action.data,
        loading: true
      };
      return state;

    case ActionRedux.Types.ADD_PRODUCT_FAILURE:
      console.log("FROM REDUCER " + action.type);
      state = [];
      state = {
        result: action.data,
        loading: false
      };
      return state;

    case ActionRedux.Types.EDIT_PRODUCT_FAILURE:
      state = [];
      state = {
        result: action.data,
        loading: false
      };
      return state;

    case ActionRedux.Types.DELETE_PRODUCT_FAILURE:
      console.log("FROM REDUCER " + action.type);
      state = {
        result: action.data,
        loading: false
      };
      return state;

    default:
      return state;
  }
};

export default ProductReducer;
