import {
  PRODUCTS_QERUEST, PRODUCTS_SUCCESS, PRODUCTS_FAILURE
} from './../constants/actionTypes';
import cFetch from './../utils/cFetch';

import { API_CONFIG } from './../config/api';
import { message } from 'antd';

function requestProducts() {
  return {
    type: PRODUCTS_QERUEST,
    isFetching: true
  };
}

function receiveProducts(products) {
  return {
    type: PRODUCTS_SUCCESS,
    isFetching: false,
    products
  };
}

function productsError(message) {
  return {
    type: PRODUCTS_FAILURE,
    isFetching: false,
    message
  };
}

export function fetchProducts(params = { page: 1, per_page: 10 }) {
  return dispatch => {
    dispatch(requestProducts());
    return cFetch(API_CONFIG.products, { method: "GET", params: params }).then((response) => {
      if (response.jsonResult.error_code === 4001) {
        dispatch(productsError(response.jsonResult.error_message));
        message.error(response.jsonResult.error_message);
      } else {
        dispatch(receiveProducts(response.jsonResult));
      }
    });
  };
}
