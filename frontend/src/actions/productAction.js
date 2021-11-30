import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_REQUEST,
  CLEAR_ERROR,
} from "../constants/ProductConstant";

import axios from "axios";

axios.defaults.baseURL = "http://192.168.0.102:5000";

export const getproduct = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });

    const { data } = await axios.get("/api/products");

    if (data) {
      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearerror = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  });
};
