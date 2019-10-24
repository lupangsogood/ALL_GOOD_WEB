import Axios from "axios";

const testAPI = "https://jsonplaceholder.typicode.com/";
const Types = {
  USER_LOGIN: "USER_LOGIN",
  USER_LOGOUT: "USER_LOGOUT",
  FETCH_DATA_SUCCESS: "FETCH_DATA_SUCCESS",
  FETCH_DATA_FAILURE: "FETCH_DATA_FAILURE"
};

export function testFetchData() {
  return dispatch => {
    Axios.get(testAPI + "posts").then(response => {
      console.log(response);
    });
  };
}

export function login() {
  return dispatch => {
    dispatch({ type: Types.USER_LOGIN, data: "USER_LOGIN" });
  };
}

export function logout() {
  return dispatch => {
    dispatch({ type: Types.USER_LOGOUT, data: "USER_LOGOUT" });
  };
}

export default {
  Types,
  testFetchData,
  login,
  logout
};
