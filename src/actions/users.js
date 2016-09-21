import {
  USERS_QERUEST, USERS_SUCCESS, USERS_FAILURE
} from './../constants/actionTypes';
import cFetch from './../utils/cFetch';

import { API_CONFIG } from './../config/api';
import { message } from 'antd';

function requestUsers() {
  return {
    type: USERS_QERUEST,
    isFetching: true
  };
}

function receiveUsers(users) {
  return {
    type: USERS_SUCCESS,
    isFetching: false,
    users
  };
}

function usersError(message) {
  return {
    type: USERS_FAILURE,
    isFetching: false,
    message
  };
}

export function queryUsers(params) {
  return dispatch => {
    dispatch(requestUsers());
    return cFetch(API_CONFIG.queryUser, { method: "GET", params: params }).then((res) => {
      if (res.jsonResult.returnCode === '1') {
        dispatch(receiveUsers(res.jsonResult));
      } else {
        dispatch(usersError(res.jsonResult.msg));
        message.error(res.jsonResult.msg);
      }
    });
  };
}
