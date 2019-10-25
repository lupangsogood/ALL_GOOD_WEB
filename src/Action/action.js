import Axios from "axios";
// import storage from "redux-persist/lib/storage";
// import { func } from "prop-types";
import FormData from "form-data";

const ALL_GOOD_BROWNIE_API = "http://allgood-brownie.herokuapp.com/api/";
const config = { headers: { "Content-Type": "multipart/form-data" } };

const Types = {
  USER_LOGIN: "USER_LOGIN",
  USER_LOGOUT: "USER_LOGOUT",
  FETCH_PRODUCT_SUCCESS: "FETCH_PRODUCT_SUCCESS",
  FETCH_PRODUCT_FAILURE: "FETCH_PRODUCT_FAILURE",
  FETCH_DATA_SUCCESS: "FETCH_DATA_SUCCESS",
  FETCH_DATA_FAILURE: "FETCH_DATA_FAILURE",
  CLEAR_PRODUCT_DATA: "CLEAR_PRODUCT_DATA",
  ADD_PRODUCT_SUCCESS: "ADD_PRODUCT_SUCCESS",
  ADD_PRODUCT_FAILURE: "ADD_PRODUCT_FAILURE"
};

const API_VARIABLE = {
  product_name: "product_name",
  product_unit_name: "product_unit_name",
  product_desc: "product_desc",
  product_rating: "product_rating",
  type_id: "type_id",
  image: "image",
  product_quantity: "product_quantity",
  product_price: "product_price"
};

export function testFetchData() {
  return dispatch => {
    Axios.get(ALL_GOOD_BROWNIE_API + "posts").then(response => {
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

//-----------------------------------------------------------------

export function fetchProduct() {
  return dispatch => {
    Axios.get(ALL_GOOD_BROWNIE_API + "product").then(response => {
      switch (response.data.head.statusCode) {
        case 200:
          console.log(response.data.body);
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

export function addProduct(product) {
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

      Axios.post(ALL_GOOD_BROWNIE_API + "product", formData, config)
        .then(response => {
          console.log(response);
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

export function editProduct(
  productName,
  productDesc,
  productCost,
  productPrice,
  productQuan,
  productImage
) {}

export default {
  Types,
  testFetchData,
  login,
  logout,
  addProduct,
  fetchProduct
};
