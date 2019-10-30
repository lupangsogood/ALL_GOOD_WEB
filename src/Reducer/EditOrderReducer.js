import ActionRedux from "../Action/action";
// import { combineReducers } from "redux";

const initialState = {
  loading: false,
  head: "",
  body: [
    {
      orderroduct: []
    }
  ],

  message: ""
};

const EditOrderReducer = (state = initialState, action) => {
  // console.log(action.type);
  switch (action.type) {
    case ActionRedux.Types.EDIT_ORDER_SUCCESS:
      // console.log(action.data);
      state = [];
      state = {
        loading: true,

        head: "200",
        body: action.data,
        message: "ดึงข้อมูลสำเร็จ"
      };
      return state;

    case ActionRedux.Types.EDIT_ORDER_FAILURE:
      state = [];
      state = {
        loading: true,
        head: "200",
        body: action.data,
        message: "ดึงข้อมูลไม่สำเร็จ"
      };
      return state;

    default:
      return state;
  }
};

export default EditOrderReducer;
