import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_FAIL,
} from "../constants/UserConstant";

import { CLEAR_ERROR } from "../constants/UserConstant";
import axios from "axios";
axios.defaults.baseURL = "http://192.168.0.102:5000";
axios.defaults.withCredentials = true;

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = { headers: { "Content-type": "application/json" } };

    const { data } = await axios.post("api/login", { email, password }, config);

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const register = (userdata) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = { headers: { "Content-type": "multipart/form-data" } };

    const { data } = await axios.post("api/register", userdata, config);

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearerror = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  });
};
