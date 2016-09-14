import {
  PRODUCTS_OPTS_QERUEST, PRODUCTS_OPTS_SUCCESS, PRODUCTS_OPTS_FAILURE
} from './../constants/actionTypes';
import initialState from './initialState';

export default function products(state = initialState.products, action) {
  switch (action.type) {
    case PRODUCTS_OPTS_QERUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case PRODUCTS_OPTS_SUCCESS:
      return Object.assign({}, {
        isFetching: false,
        errorMessage: '',
        meta: {
          total: action.products.meta.total,
          perPage: action.products.meta.pageSize,
          page: action.products.meta.page
        },
        data: action.products.data
      });
    case PRODUCTS_OPTS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message
      });
    default:
      return state;
  }
}
