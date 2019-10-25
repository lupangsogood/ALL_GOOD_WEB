import ActionRedux from "../Action/action";
import { combineReducers } from "redux";

const initialState = {
  loggedOut: false,
  state: {
    loggedIn: false,
    username: "",
    password: ""
  }
};

const appReducer = combineReducers({
  loggedOut: (loggedOut = "true") => loggedOut
});

const loginState = (state = initialState, action) => {
  switch (action.type) {
    case ActionRedux.Types.USER_LOGIN:
      console.log("USER_LOGIN");
      state = [];
      state = {
        loggedIn: true,
        username: "test",
        password: "test"
      };
      return state;

    case ActionRedux.Types.USER_LOGOUT:
      console.log("USER_LOGOUT");
      state = {};
      return appReducer(state, action);

    default:
      console.log("Unknown action");
      return state;
  }
};

export default loginState;
