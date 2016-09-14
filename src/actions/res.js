import {
  RES_QERUEST, RES_SUCCESS, RES_FAILURE,
  SYS_RES_QERUEST, SYS_RES_SUCCESS, SYS_RES_FAILURE
} from './../constants/actionTypes';
import cFetch from './../utils/cFetch';

import { API_CONFIG } from './../config/api';
import { message } from 'antd';

function requestRes() {
  return {
    type: RES_QERUEST,
    isFetching: true
  };
}

function receiveRes(res) {
  return {
    type: RES_SUCCESS,
    isFetching: false,
    res
  };
}

function resError(message) {
  return {
    type: RES_FAILURE,
    isFetching: false,
    message
  };
}

function requestSysRes() {
  return {
    type: SYS_RES_QERUEST,
    isFetching: true
  };
}

function receiveSysRes(sysRes) {
  return {
    type: SYS_RES_SUCCESS,
    isFetching: false,
    sysRes
  };
}

function sysResError(message) {
  return {
    type: SYS_RES_FAILURE,
    isFetching: false,
    message
  };
}

export function queryRes(params) {
  return dispatch => {
    dispatch(requestRes());
    return cFetch(API_CONFIG.queryRes,{ method: "GET", params: params }).then((response) => {
      if (response.jsonResult.returnCode === '1') {
        dispatch(receiveRes(response.jsonResult));
      } else {
        dispatch(resError(response.jsonResult.msg));
        message.error(response.jsonResult.msg);
      }
    });
  };
}

export function querySysRes(params) {
  return dispatch => {
    dispatch(requestSysRes());
    return cFetch(API_CONFIG.queryRes,{ method: "GET", params: params }).then((response) => {
      if (response.jsonResult.returnCode === '1') {
        dispatch(receiveSysRes(response.jsonResult));
      } else {
        dispatch(sysResError(response.jsonResult.msg));
        message.error(response.jsonResult.msg);
      }
    });
  };
}
