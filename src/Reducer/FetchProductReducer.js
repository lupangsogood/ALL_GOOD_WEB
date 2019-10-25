import ActionRedux from "../Action/action";
// import { combineReducers } from "redux";

const initialState = {
  head: "",
  body: {
    data: {
      product: []
    }
  },
  message: ""
};

// const appReducerState = {};

// const appReducer = combineReducers({
//   loggedOut: (loggedOut = "true") => loggedOut
// });

const FetchProductReducer = (state = initialState, action) => {
  // console.log(action.type);
  switch (action.type) {
    case ActionRedux.Types.FETCH_PRODUCT_SUCCESS:
      state = [];
      state = {
        head: action.head,
        body: action.data,
        message: "ดึงข้อมูลสำเร็จ"
      };
      return state;

    case ActionRedux.Types.FETCH_PRODUCT_FAILURE:
      state = {
        head: action.head,
        body: action.data,
        message: "ดึงข้อมูลไม่สำเร็จ"
      };
      return state;

    default:
      return state;
  }
};

export default FetchProductReducer;
