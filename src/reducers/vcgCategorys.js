import {
  QUERY_VCG_CATEGORY_QERUEST, QUERY_VCG_CATEGORY_SUCCESS, QUERY_VCG_CATEGORY_FAILURE,
} from './../constants/actionTypes';

import initialState from './initialState';

export default function vcgCategorys(state = initialState.vcgCategorys, action) {
  switch (action.type) {
    case QUERY_VCG_CATEGORY_QERUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case QUERY_VCG_CATEGORY_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.vcgCategorys.data,
        errorMessage: ''
      });
    case QUERY_VCG_CATEGORY_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.vcgCategorys.message
      });
    default:
      return state;
  }
}
