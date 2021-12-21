import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  CLEAR_ERROR,
} from "../constants/orderconstant";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

export const createorder = (order) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const config = {
      headers: { "Content-type": "application/json" },
    };
    const { data } = await axios.post("/api/order/new", order, config);

    if (data) {
      dispatch({
        type: CREATE_ORDER_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearerrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  });
};
