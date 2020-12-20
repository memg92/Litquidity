import { fetch } from "./csrf";

const GET_TREND_DATA = "stocks/get-data";

export const getTrendData = (stockData) => {
  return {
    type: GET_TREND_DATA,
    data: stockData,
  };
};

export const getStockData = () => {
  return async function (dispatch) {
    const res = await fetch("/api/stocks/trend");
    //res should be 3 JSON objects with "most active", "gainers" and "losers" data
    dispatch(getTrendData(res.data));
    return res;
  };
};

const stocksReducer = (state = { data: {} }, action) => {
  switch (action.type) {
    case GET_TREND_DATA:
      return { ...state, data: action.data };
    default:
      return state;
  }
};

export default stocksReducer;
