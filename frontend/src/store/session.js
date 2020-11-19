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

export const loginUser = (credential, password) => {
  return async function (dispatch) {
    const response = await fetch("/api/session", {
      method: "POST",
      body: JSON.stringify({
        credential: credential,
        password: password,
      }),
    });
    dispatch(setUserSession(response.data.user));
  };
};

const sessionReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case SET_SESSION:
      return { ...action.user };
    case DROP_SESSION:
      return { user: null };
    default:
      return state;
  }
};

export default sessionReducer;
