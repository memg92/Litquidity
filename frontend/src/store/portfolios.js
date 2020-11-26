import { fetch } from "./csrf";

const GET_PORTFOLIOS = "portfolios/get-portfolios";

export const getPortfolios = (portfolios) => {
  return {
    type: GET_PORTFOLIOS,
    portfolios,
  };
};

export const getUserPortfolios = (userId) => {
  return async function (dispatch) {
    const res = await fetch(`/api/portfolios/${userId}`);
    dispatch(getPortfolios(res.data));
    return res;
  };
};

export const createUserPortfolio = (userId, title) => {
  return async function (dispatch) {
    const res = await fetch("/api/portfolios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, title }),
    });
    dispatch(getPortfolios(res.data));
    return res;
  };
};
const portfoliosReducer = (state = { portfolios: {} }, action) => {
  switch (action.type) {
    case GET_PORTFOLIOS:
      return { ...state, portfolios: action.portfolios };
    default:
      return state;
  }
};

export default portfoliosReducer;
