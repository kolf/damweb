import {
  QUERY_RESOURCE_QERUEST, QUERY_RESOURCE_SUCCESS, QUERY_RESOURCE_FAILURE
} from './../constants/actionTypes';
import initialState from './initialState';

export default function resources(state = initialState.resources, action) {
  switch (action.type) {
    case QUERY_RESOURCE_QERUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case QUERY_RESOURCE_SUCCESS:
      return Object.assign({}, {
        isFetching: false,
        errorMessage: '',
        meta: {
          total: action.resources.data.total,
          pageSize: action.resources.data.pageSize,
          pageNum: action.resources.data.pageNum
        },
        data: action.resources.data
      });
    case QUERY_RESOURCE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message
      });
    default:
      return state;
  }
}
