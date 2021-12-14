import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productdetailsReducer,
  productReducer,
} from "./reducer/ProductReducer";

import {
  forgotpasswordreducer,
  profilereducer,
  userreducer,
} from "./reducer/Userreducer";
import { cartreducer } from "./reducer/Cartreducer";

const reducer = combineReducers({
  products: productReducer,
  productdetails: productdetailsReducer,
  user: userreducer,
  profile: profilereducer,
  forgotpassword: forgotpasswordreducer,
  cart: cartreducer,
});
const initialstate = {
  cart: {
    cartitems: localStorage.getItem("cartitems")
      ? JSON.parse(localStorage.getItem("cartitems"))
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
