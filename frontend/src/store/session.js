import { fetch } from "./csrf";

const SET_SESSION = "users/set-session";
const DROP_SESSION = "users/drop-session";

export const setUserSession = (userDetails) => {
  return {
    type: SET_SESSION,
    user: userDetails,
  };
};

export const dropUserSession = () => {
  return {
    type: DROP_SESSION,
  };
};

export const loginUser = (credential, password) =>
  async function (dispatch) {
    const res = await fetch("/api/session", {
      method: "POST",
      body: JSON.stringify({
        credential: credential,
        password: password,
      }),
    });
    dispatch(setUserSession(res.data.user));
    return res;
  };

export const restoreUser = () =>
  async function (dispatch) {
    const res = await fetch("/api/session");
    dispatch(setUserSession(res.data.user));
    return res;
  };

const sessionReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case SET_SESSION:
      return { ...state, user: action.user };
    case DROP_SESSION:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default sessionReducer;
