import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import cartReducer from "./modules/cartModule";
import authReducer from "./modules/userModule";
import productReducers from "./modules/productModule";
import productDetailsReducer from "./modules/productDetailModule";
import myOrderReducer from "./modules/myOrderModule";
import newOrderReducer from "./modules/orderModule";

const reducer = combineReducers({
  products: productReducers,
  productDetails: productDetailsReducer,
  auth: authReducer,
  cart: cartReducer,
  myOrder: myOrderReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
