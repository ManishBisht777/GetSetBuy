import { ADD_TO_CART } from "../constants/Cartconstant";

import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

export const addtocart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

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
