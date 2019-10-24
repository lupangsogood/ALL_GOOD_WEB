import ActionRedux from "../Action/action";

const initialState = {
  testFetch: "",
  fetchDataSuccress: {
    head: "",
    body: "",
    message: ""
  }
};

const testFetchAPI = (state = initialState, action) => {
  //   switch (action.type) {
  //     case ActionRedux.Types.FETCH_DATA_SUCCESS:
  //       console.log("SUCCESS");
  //       return {
  //         ...state,
  //         testFetch: "action.data"
  //       };
  //       break;
  //     default:
  //       console.log("FAILED");
  //       break;
  //   }
  return {
    ...state,
    testFetch: "testAPI"
  };
};

export default testFetchAPI;
