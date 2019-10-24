import ActionRedux from "../Action/action";
import { combineReducers } from "redux";

const appReducer = combineReducers({
  state: (state = {}) => state
});

const initialState = {
  userState: {
    loggedIn: false,
    username: "",
    password: ""
  }
};

const loginState = (state = initialState, action) => {
  //   console.log(action.type);
  switch (action.type) {
    case ActionRedux.Types.USER_LOGIN:
      console.log("USER_LOGIN");
      state = {
        loggedIn: false,
        username: "",
        password: ""
      };
      return {
        ...state.userState,
        loggedIn: true,
        username: "test",
        password: "testpassword"
      };

    case ActionRedux.Types.USER_LOGOUT:
      console.log("USER_LOGOUT");
      state = [];
      return appReducer(state, action);

    default:
      console.log("Unknown action");
      return appReducer(state, action);
  }
};

export default loginState;
