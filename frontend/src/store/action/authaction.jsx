import {
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
} from "../slices/auth";
import axios from "axios";

export const login = (email, password, admin) => async (dispatch) => {
  try {
    const res = await axios.post("user/login", {
      email,
      password,
      admin,
      withCredentials: true,
    });
    dispatch(loginSuccess(res.user));
    console.log(res)
  
  } catch (error) {
    dispatch(loginFailure(error));
  }
};

export const register = (name, email, password, admin) => async (dispatch) => {
  try {
    const res = await axios.post("user/register", {
      name,
      email,
      password,
      admin,
    });
    dispatch(registerSuccess(res));
  } catch (error) {
    dispatch(registerFailure(error.response.data.message));
  }
};
