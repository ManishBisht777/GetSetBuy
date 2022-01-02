import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  newproductreducer,
  newreviewreducer,
  productdetailsReducer,
  productReducer,
} from "./reducer/ProductReducer";

import {
  forgotpasswordreducer,
  profilereducer,
  userreducer,
} from "./reducer/Userreducer";
import { cartreducer } from "./reducer/Cartreducer";
import {
  myorderreducer,
  neworderreducer,
  orderdetailreducer,
} from "./reducer/orderreducer";

const reducer = combineReducers({
  products: productReducer,
  productdetails: productdetailsReducer,
  user: userreducer,
  profile: profilereducer,
  forgotpassword: forgotpasswordreducer,
  cart: cartreducer,
  neworder: neworderreducer,
  myorders: myorderreducer,
  orderdetails: orderdetailreducer,
  newreview: newreviewreducer,
  newproduct: newproductreducer,
});
const initialstate = {
  cart: {
    cartitems: localStorage.getItem("cartitems")
      ? JSON.parse(localStorage.getItem("cartitems"))
      : [],
    shippinginfo: localStorage.getItem("shippinginfo")
      ? JSON.parse(localStorage.getItem("shippinginfo"))
      : [],
  },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialstate,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
