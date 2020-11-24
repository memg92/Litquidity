import { fetch } from "./csrf";

const GET_DATA = "indices/get-data";

export const getData = (indexData) => {
  return {
    type: GET_DATA,
    indices: indexData,
  };
};

export const getIndexData = () =>
  async function (dispatch) {
    const indexArray = ["SPY", "QQQ", "DIA"];
    const res = await fetch("/api/stocks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ indexArray }),
    });
    dispatch(getData(res.data));
    return res;
  };

const indicesReducer = (state = { indices: {} }, action) => {
  switch (action.type) {
    case GET_DATA:
      return { ...state, indices: action.indices };
    default:
      return state;
  }
};

export default indicesReducer;
