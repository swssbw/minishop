import axios from "axios";

const ALL_PRODUCTS_REQUEST = "ALL_PRODUCTS_REQUEST";
const ALL_PRODUCTS_SUCCESS = "ALL_PRODUCTS_SUCCESS";
const ALL_PRODUCTS_FAIL = "ALL_PRODUCTS_FAIL";

export const getProducts =
  (keyword = "", currentPage = 1, category) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCTS_REQUEST });

      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}`;

      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&category=${category}`;
      }
      const { data } = await axios.get(link);

      dispatch({
        type: ALL_PRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCTS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export default function productReducers(state = { products: [] }, action) {
  switch (action.type) {
    case ALL_PRODUCTS_REQUEST:
      return {
        loading: true,
        products: [],
      };

    case ALL_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
        resPerPage: action.payload.resPerPage,
        filteredProductsCount: action.payload.filteredProductsCount,
      };

    case ALL_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
