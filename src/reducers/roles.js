/**
 * Created by lirui on 2016/9/29.
 */
import {
  ROLE_REQUEST, ROLE_LIST_SUCCESS, ROLE_LIST_FAIL
} from './../constants/actionTypes';
import initialState from './initialState';



export default function roles(state = initialState.roles, action) {

  //console.log(action);
  //console.log("actionactionactionactionactionactionactionactionactionactionactionactionactionactionactionactionaction");


  switch (action.type) {
    case ROLE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case ROLE_LIST_SUCCESS:
      return Object.assign({}, {
        isFetching: false,
        errorMessage: '',
        meta: {
          total: action.roles.total,
          pageSize: action.roles.pageSize,
          pageNum: action.roles.pageNum
        },
        data: action.roles.data
      });
    case ROLE_LIST_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message
      });
    default:
      return state;
  }
}
