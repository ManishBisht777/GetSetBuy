import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDER_REQUEST,
  MY_ORDER_SUCCESS,
  MY_ORDER_FAIL,
  ALL_ORDER_REQUEST,
  ALL_ORDER_SUCCESS,
  ALL_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  CLEAR_ERROR,
} from "../constants/orderconstant";

import axios from "axios";

// axios.defaults.baseURL = "http://localhost:5000";
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

// use orders
export const myorders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDER_REQUEST });

    const { data } = await axios.get("/api/myorders");

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

// get all orders (admin)
export const getallorders = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDER_REQUEST });

    const { data } = await axios.get("/api/allorders");
    dispatch({
      type: ALL_ORDER_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: ALL_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// update order status (admin)
export const updateorder = (id, order) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });

    const config = {
      headers: { "Content-type": "multipart/form-data" },
    };
    const { data } = await axios.put(`/api/admin/order/${id}`, order, config);

    if (data) {
      dispatch({
        type: UPDATE_ORDER_SUCCESS,
        payload: data.success,
      });
    }
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// delete order (admin)

export const deleteorder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });

    const { data } = await axios.delete(`/api/admin/order/${id}`);

    if (data) {
      dispatch({
        type: DELETE_ORDER_SUCCESS,
        payload: data.success,
      });
    }
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// order details
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

// clear error
export const clearerrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  });
};
