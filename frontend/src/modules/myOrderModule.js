import axios from "axios";

const MY_ORDER_REQUEST = "MY_ORDER_REQUEST";
const MY_ORDER_SUCCESS = "MY_ORDER_SUCCESS";
const MY_ORDER_FAIL = "MY_ORDER_FAIL";

export const myOrders = (id) => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDER_REQUEST });

    const { data } = await axios.get("/api/v1/orders/me");

    dispatch({ type: MY_ORDER_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: MY_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export default function myOrderReducer(state = { orders: {} }, action) {
  switch (action.type) {
    case MY_ORDER_REQUEST:
      return {
        loading: true,
      };

    case MY_ORDER_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case MY_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
