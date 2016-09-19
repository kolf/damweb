import {
  PRODUCTS_QERUEST, PRODUCTS_SUCCESS, PRODUCTS_FAILURE,
  CREATE_PRODUCT_QERUEST, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAILURE,
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
function requestCreateProduct() {
  return {
    type: CREATE_PRODUCT_QERUEST,
    isFetching: true
  };
}

function receiveCreateProduct(products) {
  return {
    type: CREATE_PRODUCT_SUCCESS,
    isFetching: false,
    products
  };
}

function CreateProductError(message) {
  return {
    type: CREATE_PRODUCT_FAILURE,
    isFetching: false,
    message
  };
}

export function queryProducts(params = { pageNum: 1, pageSize: 10 }) {
  return dispatch => {
    dispatch(requestProducts());
    return cFetch(API_CONFIG.products, { method: "GET", params: params }).then((response) => {
      if (response.jsonResult.returnCode === '1') {
        dispatch(receiveProducts(response.jsonResult));
      } else {
        dispatch(productsError(response.jsonResult.error_message));
        message.error(response.jsonResult.error_message);
      }
    });
  };
}

export function createProduct(params, cb) {
  return dispatch => {
    dispatch(requestCreateProduct());
    return cFetch(API_CONFIG.createProduct, { method: "POST", body: JSON.stringify(params) }).then((response) => {
      if (response.jsonResult.returnCode === '1') {
        dispatch(receiveCreateProduct(response.jsonResult));
        cb(response.jsonResult.msg);
      } else {
        dispatch(CreateProductError(response.jsonResult.msg));
        message.error(response.jsonResult.msg);
      }
    });
  };
}
