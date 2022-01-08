import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SAVE_SHIPPING_INFO,
} from "../constants/Cartconstant";

import axios from "axios";
// axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

// add  to cart
export const addtocart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/product/${id}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      stock: data.product.stock,
      image: data.product.images[0].url,
      quantity,
    },
  });

  localStorage.setItem("cartitems", JSON.stringify(getState().cart.cartitems));
};

// remove from cart

export const removefromcart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: id,
  });
  localStorage.setItem("cartitems", JSON.stringify(getState().cart.cartitems));
};

// save shipping info

export const saveshippinginfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippinginfo", JSON.stringify(data));
};
