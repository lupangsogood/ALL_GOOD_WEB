import Axios from "axios";
import storage from "redux-persist/lib/storage";

const testAPI = "https://jsonplaceholder.typicode.com/";
const Types = {
  USER_LOGIN: "USER_LOGIN",
  USER_LOGOUT: "USER_LOGOUT",
  FETCH_DATA_SUCCESS: "FETCH_DATA_SUCCESS",
  FETCH_DATA_FAILURE: "FETCH_DATA_FAILURE",
  CLEAR_PRODUCT_DATA: "CLEAR_PRODUCT_DATA"
};

export function testFetchData() {
  return dispatch => {
    Axios.get(testAPI + "posts").then(response => {
      dispatch({ type: Types.FETCH_DATA_SUCCESS, data: response.data });
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
    dispatch({ type: Types.CLEAR_PRODUCT_DATA, data: [] });
    // dispatch({ type: Types.USER_LOGOUT, data: "USER_LOGOUT" });
  };
}

export default {
  Types,
  testFetchData,
  login,
  logout
};
