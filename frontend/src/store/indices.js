import { fetch } from "./csrf";

const GET_DATA = "indices/get-data";

export const getData = (indexData) => {
  return {
    type: GET_DATA,
    data: indexData,
  };
};

export const getIndexData = () => {
  return async function (dispatch) {
    const indexArray = ["SPY", "QQQ", "DIA"];
    const res = await fetch("/api/stocks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ indexArray }),
    });
    dispatch(getData(res.data));
    return res;
  };
};

const indicesReducer = (state = { data: {} }, action) => {
  switch (action.type) {
    case GET_DATA:
      return { ...state, data: action.data };
    default:
      return state;
  }
};

export default indicesReducer;
