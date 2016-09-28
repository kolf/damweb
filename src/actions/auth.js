import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  LOGOUT_SUCCESS, LOGOUT_REQUEST
} from './../constants/actionTypes';
import cFetch from './../utils/cFetch';
import cookie from 'js-cookie';

import { API_CONFIG } from './../config/api';

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  };
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user
  };
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  };
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  };
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false

  };
}

export function loginUser(creds, cbk) {
  return dispatch => {
    dispatch(requestLogin(creds));
    cFetch(API_CONFIG.auth, { method: "POST", body: JSON.stringify(creds) }).then((response) => {
      if (response.jsonResult.returnCode === '1') {
        cookie.set('token', response.jsonResult.data.token);
        dispatch(receiveLogin(response.jsonResult));
      } else {
        dispatch(loginError(response.jsonResult.msg));
        cbk(creds.damId, response.jsonResult.msg);
      }
    });
  };
}

export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout());
    cookie.remove('token');
    dispatch(receiveLogout());
  };
}
