import {
  QUERY_CATEGORY_QERUEST, QUERY_CATEGORY_SUCCESS, QUERY_CATEGORY_FAILURE,
} from './../constants/actionTypes';

import initialState from './initialState';

export default function categorys(state = initialState.categorys, action) {
  switch (action.type) {
    case QUERY_CATEGORY_QERUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case QUERY_CATEGORY_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.categorys.data,
        errorMessage: ''
      });
    case QUERY_CATEGORY_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.categorys.message
      });
    default:
      return state;
  }
}
