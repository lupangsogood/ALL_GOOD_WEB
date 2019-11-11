import Axios from "axios";
// import storage from "redux-persist/lib/storage";
// import { func } from "prop-types";
import FormData from "form-data";
// import { object } from "prop-types";

const ALL_GOOD_BROWNIE_API =
  "http://ec2-3-0-89-4.ap-southeast-1.compute.amazonaws.com/api/";

let config = {
  headers: { "Content-Type": "multipart/form-data", bearer: "" }
};
let configUrlEncoded = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
};

const Types = {
  USER_LOGIN: "USER_LOGIN",
  USER_LOGOUT: "USER_LOGOUT",
  FETCH_PRODUCT_SUCCESS: "FETCH_PRODUCT_SUCCESS",
  FETCH_PRODUCT_FAILURE: "FETCH_PRODUCT_FAILURE",
  FETCH_DATA_SUCCESS: "FETCH_DATA_SUCCESS",
  FETCH_DATA_FAILURE: "FETCH_DATA_FAILURE",
  CLEAR_PRODUCT_DATA: "CLEAR_PRODUCT_DATA",
  ADD_PRODUCT_SUCCESS: "ADD_PRODUCT_SUCCESS",
  ADD_PRODUCT_FAILURE: "ADD_PRODUCT_FAILURE",
  EDIT_PRODUCT_SUCCESS: "EDIT_PRODUCT_SUCCESS",
  EDIT_PRODUCT_FAILURE: "EDIT_PRODUCT_FAILURE",
  DELETE_PRODUCT_SUCCESS: "DELETE_PRODUCT_SUCCESS",
  DELETE_PRODUCT_FAILURE: "DELETE_PRODUCT_FAILURE",
  FETCH_ORDER_SUCCESS: "FETCH_ORDER_SUCCESS",
  FETCH_ORDER_FAILURE: "FETCH_ORDER_FAILURE",
  EDIT_ORDER_SUCCESS: "EDIT_ORDER_SUCCESS",
  EDIT_ORDER_FAILURE: "EDIT_ORDER_FAILURE"
};

const API_VARIABLE = {
  product_name: "product_name",
  product_unit_name: "product_unit_name",
  product_desc: "product_desc",
  product_rating: "product_rating",
  type_id: "type_id",
  image: "image",
  product_image_url: "product_img_url",
  product_quantity: "product_quantity",
  product_price: "product_price",
  is_active: "is_active",
  order_sts_id: "order_sts_id",
  order_transfer: "order_transfer",
  ems_barcode: "ems_barcode"
};

export function testFetchData() {
  return dispatch => {
    Axios.get(ALL_GOOD_BROWNIE_API + "posts").then(response => {
      dispatch({ type: Types.FETCH_DATA_SUCCESS, data: response.data });
    });
  };
}

export function login(userLogin) {
  console.log(userLogin);
  let formData = new URLSearchParams();
  return dispatch => {
    formData.append("user_email", userLogin.username);
    formData.append("user_password", userLogin.password);

    Axios.post(ALL_GOOD_BROWNIE_API + "user/login", formData, configUrlEncoded)
      .then(response => {
        console.log(response);
        // let user_token = response.data.body.data.user.access_token;
        // Object.assign(config.headers, {
        //   ...config.headers,
        //   bearer: user_token
        // });

        // Object.assign(configUrlEncoded.headers, {
        //   ...config.headers,
        //   bearer: user_token
        // });
        dispatch({
          type: Types.USER_LOGIN,
          data: "SUCCESS",
          response: response.data.body.data.user
        });
      })
      .catch(error => {
        console.log(error.message);
        dispatch({ type: Types.USER_LOGIN, data: "FAILURE", response: "" });
      });
  };
}

export function logout() {
  return dispatch => {
    dispatch({ type: Types.USER_LOGOUT, data: "USER_LOGOUT" });
    dispatch({ type: Types.CLEAR_PRODUCT_DATA, data: [] });
    // dispatch({ type: Types.USER_LOGOUT, data: "USER_LOGOUT" });
  };
}

//-----------------------------------------------------------------

export function fetchProduct(AUTH_TOKEN) {
  Axios.defaults.headers.common["Authorization"] = "bearer " + AUTH_TOKEN;
  return dispatch => {
    Axios.get(ALL_GOOD_BROWNIE_API + "product").then(response => {
      switch (response.data.head.statusCode) {
        case 200:
          // console.log(response.data.body);
          dispatch({
            type: Types.FETCH_PRODUCT_SUCCESS,
            head: "SUCCESS",
            data: response.data.body
          });
          break;

        default:
          dispatch({ type: Types.FETCH_PRODUCT_FAILURE, data: "FAILURE" });
          break;
      }
    });
  };
}

//----------------------------------------------------------------

export function addProduct(product, access_token) {
  let formData = new FormData();
  return dispatch => {
    try {
      formData.append(API_VARIABLE.product_name, product.product_name);
      formData.append(API_VARIABLE.product_unit_name, "unit");
      formData.append(API_VARIABLE.product_desc, product.product_desc);
      formData.append(API_VARIABLE.product_rating, "0");
      formData.append(API_VARIABLE.type_id, "1");
      formData.append(
        API_VARIABLE.image,
        product.product_image_file,
        product.product_image
      );
      formData.append(API_VARIABLE.product_quantity, product.quantity);
      formData.append(API_VARIABLE.product_price, product.product_price);

      let user_token = access_token;
      Object.assign(config.headers, {
        ...config.headers,
        Authorization: "bearer " + user_token
      });
      Axios.post(ALL_GOOD_BROWNIE_API + "product", formData, config)
        .then(response => {
          // console.log(response);
          switch (response.data.head.statusCode) {
            case 200:
              dispatch({ type: Types.ADD_PRODUCT_SUCCESS, data: "SUCCESS" });
              break;

            default:
              dispatch({ type: Types.ADD_PRODUCT_FAILURE, data: "FAILURE" });
              break;
          }
        })
        .catch(error => {
          console.log(error.message);
          dispatch({ type: Types.ADD_PRODUCT_FAILURE, data: "FAILURE" });
        });
    } catch (error) {
      dispatch({ type: Types.ADD_PRODUCT_FAILURE, data: "FAILURE" });
    }
  };
}

export function editProduct(product, access_token) {
  let formData = new FormData();

  return dispatch => {
    // console.log(product);

    try {
      formData.append(API_VARIABLE.product_name, product.product_name);
      formData.append(API_VARIABLE.product_unit_name, "unit");
      formData.append(API_VARIABLE.product_desc, product.product_desc);
      formData.append(API_VARIABLE.product_rating, "0");
      formData.append(API_VARIABLE.type_id, "1");
      formData.append(API_VARIABLE.is_active, "1");

      formData.append(API_VARIABLE.product_quantity, product.product_quantity);
      formData.append(API_VARIABLE.product_price, product.product_price);

      if (typeof product.product_image_file === `undefined`) {
        // console.log("CHECK");
        formData.append(
          API_VARIABLE.product_image_url,
          product.product_img_url
        );
      } else {
        formData.append(
          API_VARIABLE.image,
          product.product_image_file,
          product.product_image_file.name
        );
        formData.append(API_VARIABLE.product_image_url, "");
      }

      // for (var test of formData.entries()) {
      //   console.log(test[0] + " " + test[1]);
      // }

      let user_token = access_token;
      Object.assign(config.headers, {
        ...config.headers,
        Authorization: "bearer " + user_token
      });
      Axios.post(
        ALL_GOOD_BROWNIE_API + "product/" + product.product_id,
        formData,
        config
      )

        .then(response => {
          // console.log(response);
          switch (response.data.head.statusCode) {
            case 200:
              dispatch({
                type: Types.EDIT_PRODUCT_SUCCESS,
                data: "SUCCESS",
                response: response.body
              });
              break;

            default:
              dispatch({ type: Types.EDIT_PRODUCT_FAILURE, data: "FAILURE" });
              break;
          }
        })
        .catch(error => {
          console.log(error.message);
          dispatch({ type: Types.EDIT_PRODUCT_FAILURE, data: "FAILURE" });
        });
    } catch (error) {
      console.log(error.message);

      dispatch({ type: Types.EDIT_PRODUCT_FAILURE, data: "FAILURE" });
    }
  };
}

export function deleteProduct(product, access_token) {
  let formData = new FormData();
  return dispatch => {
    console.log(product);

    try {
      formData.append(API_VARIABLE.product_name, product.product_name);
      formData.append(API_VARIABLE.product_unit_name, "unit");
      formData.append(API_VARIABLE.product_desc, product.product_desc);
      formData.append(API_VARIABLE.product_rating, "0");
      formData.append(API_VARIABLE.type_id, "1");
      formData.append(API_VARIABLE.is_active, "0");

      formData.append(API_VARIABLE.product_quantity, product.product_quantity);
      formData.append(API_VARIABLE.product_price, product.product_price);
      formData.append(API_VARIABLE.product_image_url, "");

      // for (var test of formData.entries()) {
      //   console.log(test[0] + " " + test[1]);
      // }
      let user_token = access_token;
      Object.assign(config.headers, {
        ...config.headers,
        Authorization: "bearer " + user_token
      });
      // console.log(config);

      Axios.post(
        ALL_GOOD_BROWNIE_API + "product/" + product.product_id,
        formData,
        config
      )

        .then(response => {
          console.log(response);
          switch (response.data.head.statusCode) {
            case 200:
              dispatch({
                type: Types.DELETE_PRODUCT_SUCCESS,
                data: "SUCCESS",
                response: response.body
              });
              break;

            default:
              dispatch({ type: Types.DELETE_PRODUCT_FAILURE, data: "FAILURE" });
              break;
          }
        })
        .catch(error => {
          console.log(error.message);
          dispatch({ type: Types.DELETE_PRODUCT_FAILURE, data: "FAILURE" });
        });
    } catch (error) {
      console.log(error.message);

      dispatch({ type: Types.DELETE_PRODUCT_FAILURE, data: "FAILURE" });
    }
  };
}

//----------------------------------------------------------------------

export function fetchOrder(access_token) {
  return dispatch => {
    let user_token = access_token;
    Object.assign(configUrlEncoded.headers, {
      ...configUrlEncoded.headers,
      Authorization: "bearer " + user_token
    });
    console.log(configUrlEncoded);

    Axios.defaults.headers.common["Authorization"] = "bearer " + user_token;
    try {
      Axios.get(ALL_GOOD_BROWNIE_API + "order")
        .then(response => {
          dispatch({
            type: Types.FETCH_ORDER_SUCCESS,
            data: response.data.body
          });
        })
        .catch(error => {
          console.log(error.message);
          dispatch({
            type: Types.FETCH_ORDER_FAILURE,
            data: "FAILURE"
          });
        });
    } catch (error) {
      console.log(error.message);

      dispatch({ type: Types.FETCH_DATA_FAILURE, data: "FAILURE" });
    }
  };
}

//----------------------------------------------------------------------

export function updateTrackCode(order_ems_barcode, order_id, access_token) {
  console.log(order_ems_barcode);
  console.log(order_id);
  return dispatch => {
    let formData = new URLSearchParams();
    // let order = orderData.editOrder.order[0];
    // let order = orderData.editOrder.order[0];
    let ems_barcode;
    try {
      if (typeof order_ems_barcode === "undefined") {
        ems_barcode = order_ems_barcode;
      } else {
        ems_barcode = order_ems_barcode;
      }

      formData.append(API_VARIABLE.order_sts_id, 4);
      formData.append(API_VARIABLE.order_transfer, 0);
      formData.append(API_VARIABLE.ems_barcode, ems_barcode);

      // for (var test of formData.entries()) {
      //   console.log(test[0] + " " + test[1]);
      // }

      let user_token = access_token;
      Object.assign(configUrlEncoded.headers, {
        ...configUrlEncoded.headers,
        Authorization: "bearer " + user_token
      });

      console.log(configUrlEncoded);
      Axios.post(
        ALL_GOOD_BROWNIE_API + "order/status/" + order_id,
        formData,
        configUrlEncoded
      )
        .then(response => {
          switch (response.data.head.statusCode) {
            case 200:
              dispatch({
                type: Types.EDIT_ORDER_SUCCESS,
                data: "SUCCESS",
                response: response.body
              });
              break;

            default:
              dispatch({ type: Types.EDIT_ORDER_FAILURE, data: "FAILURE" });
              break;
          }
        })
        .catch(error => {
          console.log(error.message);

          console.log(config);
          dispatch({ type: Types.EDIT_ORDER_FAILURE, data: "FAILURE" });
        });
    } catch (error) {
      console.log(error.message);

      dispatch({ type: Types.EDIT_ORDER_FAILURE, data: "FAILURE" });
    }
  };
}

export function cancelOrder(orderData, access_token) {
  console.log(orderData);
  return dispatch => {
    let formData = new URLSearchParams();
    let order = orderData;
    let ems_barcode;
    try {
      if (typeof orderData.ems_barcode === "undefined") {
        ems_barcode = order.ems_barcode;
      } else {
        ems_barcode = orderData.ems_barcode;
      }

      formData.append(API_VARIABLE.order_sts_id, 7);
      formData.append(API_VARIABLE.order_transfer, 0);
      formData.append(API_VARIABLE.ems_barcode, ems_barcode);
      let user_token = access_token;
      Object.assign(configUrlEncoded.headers, {
        ...configUrlEncoded.headers,
        Authorization: "bearer " + user_token
      });
      for (var test of formData.entries()) {
        console.log(test[0] + " " + test[1]);
      }

      console.log(configUrlEncoded);
      Axios.post(
        ALL_GOOD_BROWNIE_API + "order/status/" + order.order_id,
        formData,
        configUrlEncoded
      )
        .then(response => {
          switch (response.data.head.statusCode) {
            case 200:
              dispatch({
                type: Types.EDIT_ORDER_SUCCESS,
                data: "SUCCESS",
                response: response.body
              });
              break;

            default:
              dispatch({ type: Types.EDIT_ORDER_FAILURE, data: "FAILURE" });
              break;
          }
        })
        .catch(error => {
          console.log(error.message);

          console.log(config);
          dispatch({ type: Types.EDIT_ORDER_FAILURE, data: "FAILURE" });
        });
    } catch (error) {
      console.log(error.message);

      dispatch({ type: Types.EDIT_ORDER_FAILURE, data: "FAILURE" });
    }
  };
}

export default {
  Types,
  testFetchData,
  login,
  logout,
  addProduct,
  fetchProduct,
  fetchOrder,
  deleteProduct,
  editProduct,
  updateTrackCode,
  cancelOrder
};
