import { logoutUser, setUser } from "../actions/userActions";
import { getLS } from "./localStorage";

export const onStart = () => {
  return async (dispatch) => {
    try {
      // get LocalStorage Data
      const ls = getLS();
      return await dispatch(setUser(ls));
    } catch (error) {
      console.log(error);
    }
  };
};

export const onLogout = () => {
  return async (dispatch) => {
    try {
      localStorage.clear();
      dispatch(logoutUser());
      window.location.pathname = "/";
    } catch (error) {
      console.log(error);
    }
  };
};
