import ActionRedux from "../Action/action";
// import { combineReducers } from "redux";

const initialState = {
  head: "",
  body: {
    data: {
      data: {
        order: [
          {
            product: []
          }
        ]
      }
    }
  },
  message: ""
};

// const appReducerState = {};

// const appReducer = combineReducers({
//   loggedOut: (loggedOut = "true") => loggedOut
// });

const FetchOrderReducer = (state = initialState, action) => {
  // console.log(action.type);
  switch (action.type) {
    case ActionRedux.Types.FETCH_ORDER_SUCCESS:
      console.log(action.data);
      state = [];
      state = {
        head: "200",
        body: action.data,
        message: "ดึงข้อมูลสำเร็จ"
      };
      return state;

    case ActionRedux.Types.FETCH_DATA_FAILURE:
      state = {
        head: "200",
        body: action.data,
        message: "ดึงข้อมูลไม่สำเร็จ"
      };
      return state;

    default:
      return state;
  }
};

export default FetchOrderReducer;
