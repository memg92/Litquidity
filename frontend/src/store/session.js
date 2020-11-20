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
        credential,
        password,
      }),
    });
    dispatch(setUserSession(res.data.user));
    return res;
  };

export const signUpUser = (username, email, password) =>
  async function (dispatch) {
    const res = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    dispatch(setUserSession(res.data.user));
    return res;
  };

export const restoreUser = () =>
  async function (dispatch) {
    const res = await fetch("/api/session");
    if (res.data.user) {
      dispatch(setUserSession(res.data.user));
      return res;
    } else {
      return setUserSession(null);
    }
  };

export const logoutUser = () =>
  async function (dispatch) {
    const res = await fetch("/api/session", {
      method: "DELETE",
    });
    dispatch(dropUserSession());
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
