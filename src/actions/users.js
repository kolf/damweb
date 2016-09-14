import {
  USERS_QERUEST, USERS_SUCCESS, USERS_FAILURE,
  CREATE_USER_QERUEST, CREATE_USER_SUCCESS, CREATE_USER_FAILURE
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

function requestCreateUser(user) {
  return {
    type: CREATE_USER_QERUEST,
    isFetching: true,
    user
  };
}

function receiveCreateUser() {
  return {
    type: CREATE_USER_SUCCESS,
    isFetching: false
  };
}

function createUserError(message) {
  return {
    type: CREATE_USER_FAILURE,
    isFetching: false,
    message
  };
}

export function queryUsers(params) {
  return dispatch => {
    dispatch(requestUsers());
    return cFetch(API_CONFIG.queryUser, { method: "GET", params: params }).then((response) => {
      if (response.jsonResult.returnCode === '1') {
        dispatch(receiveUsers(response.jsonResult));
      } else {
        dispatch(usersError(response.jsonResult.msg));
        message.error(response.jsonResult.msg);
      }
    });
  };
}

export function createUser(creds) {
  return dispatch => {
    dispatch(requestCreateUser());
    return cFetch(API_CONFIG.createUser,{ method: "POST", body: JSON.stringify(creds) }).then((response) => {
      if (response.jsonResult.returnCode === '1') {
        dispatch(receiveCreateUser(response.jsonResult));
      } else {
        dispatch(createUserError(response.jsonResult.msg));
        message.error(response.jsonResult.msg);
      }
    });
  };
}
