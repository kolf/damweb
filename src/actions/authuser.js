/**
 * Created by lirui on 2016/9/30.
 */
import {
  USER_ROLE_REQUEST, USER_ROLE_AUTH_SUCC, USER_ROLE_AUTH_FAIL
} from './../constants/actionTypes';
import cFetch from './../utils/cFetch';

import { API_CONFIG } from './../config/api';
import { message } from 'antd';


export function authuser(params) {
  return dispatch => {
    dispatch(requestAuthUser());
    return cFetch(API_CONFIG.authUser, { method: "GET", params: params }).then((res) => {
      if (res.jsonResult.returnCode === '1') {
        dispatch(receiveAuthUser(res.jsonResult));
      } else {
        dispatch(authUserError(res.jsonResult.msg));
        message.error(res.jsonResult.msg);
      }
    });
  };
}




function requestAuthUser(user) {
  return {
    type: USER_ROLE_REQUEST,
    isFetching: true,
    user
  };
}
function receiveAuthUser() {
  return {
    type: USER_ROLE_AUTH_SUCC,
    isFetching: false
  };
}
function authUserError(message) {
  return {
    type: USER_ROLE_AUTH_FAIL,
    isFetching: false,
    message
  };
}
