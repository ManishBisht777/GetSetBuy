import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productdetailsReducer,
  productReducer,
} from "./reducer/ProductReducer";

import { profilereducer, userreducer } from "./reducer/Userreducer";

const reducer = combineReducers({
  products: productReducer,
  productdetails: productdetailsReducer,
  user: userreducer,
  profile: profilereducer,
});
const initialstate = [];
const middleware = [thunk];

const store = createStore(
  reducer,
  initialstate,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
