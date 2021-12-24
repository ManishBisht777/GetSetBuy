import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDER_REQUEST,
  MY_ORDER_SUCCESS,
  MY_ORDER_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
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

    console.log(data);
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

export const myorders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDER_REQUEST });

    const { data } = await axios.get("/api/myorders");

    console.log(data);
    dispatch({
      type: MY_ORDER_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: MY_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const orderdetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/order/${id}`);

    console.log(data);
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearerrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  });
};
