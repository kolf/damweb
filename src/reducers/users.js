import {
  USERS_QERUEST, USERS_SUCCESS, USERS_FAILURE
} from './../constants/actionTypes';
import initialState from './initialState';

export default function users(state = initialState.users, action) {
  switch (action.type) {
    case USERS_QERUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case USERS_SUCCESS:
      return Object.assign({}, {
        isFetching: false,
        errorMessage: '',
        meta: {
          total: action.users.data.total,
          pageSize: action.users.data.pageSize,
          pageNum: action.users.data.pageNum
        },
        data: action.users.data.list
      });
    case USERS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message
      });
    default:
      return state;
  }
}