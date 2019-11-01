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
      switch (action.data) {
        case "SUCCESS":
          console.log(action.response);
          let userData = action.response;
          state = [];
          state = {
            loggedIn: true,
            username: userData.user_email,
            token: userData.access_token
          };
          return state;

        default:
          state = {
            loggedIn: false,
            username: "",
            token: ""
          };

          return state;
      }

    case ActionRedux.Types.USER_LOGOUT:
      console.log("USER_LOGOUT");
      state = {};
      return appReducer(state, action);

    default:
      // console.log("Unknown action");
      return state;
  }
};

export default loginState;
