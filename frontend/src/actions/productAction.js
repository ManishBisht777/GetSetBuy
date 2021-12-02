import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_REQUEST,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERROR,
} from "../constants/ProductConstant";

import axios from "axios";

axios.defaults.baseURL = "http://192.168.0.102:5000";

export const getproduct =
  (keyword = "", currentpage = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });

      let link = `/api/products?keyword=${keyword}&page=${currentpage}`;
      const { data } = await axios.get(link);

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

export const getproductdetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/products/${id}`);

    if (data) {
      dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: data.product,
      });
    }
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearerror = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  });
};
