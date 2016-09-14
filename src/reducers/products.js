import {
  PRODUCTS_QERUEST, PRODUCTS_SUCCESS, PRODUCTS_FAILURE
} from './../constants/actionTypes';
import initialState from './initialState';

export default function products(state = initialState.products, action) {
  console.log(action);
  switch (action.type) {
    case PRODUCTS_QERUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case PRODUCTS_SUCCESS:
      return Object.assign({}, {
        isFetching: false,
        errorMessage: '',
        meta: {
          total: action.products.data.total,
          pageSize: action.products.data.pageSize,
          pageNum: action.products.data.pageNum
        },
        data: action.products.data.list
      });
    case PRODUCTS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message
      });
    default:
      return state;
  }
}
