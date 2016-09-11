import {
  PRODUCTS_QERUEST, PRODUCTS_SUCCESS, PRODUCTS_FAILURE
} from './../constants/actionTypes';
import initialState from './initialState';

export default function products(state = initialState.products, action) {
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
          total: action.products.meta.total,
          perPage: action.products.meta.per_page,
          page: action.products.meta.page
        },
        data: action.products.data
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
