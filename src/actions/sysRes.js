import {
  SYS_RES_QERUEST, SYS_RES_SUCCESS, SYS_RES_FAILURE
} from './../constants/actionTypes';
import cFetch from './../utils/cFetch';

import { API_CONFIG } from './../config/api';
import { message } from 'antd';

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

export function querySysRes(params) {
  return dispatch => {
    dispatch(requestSysRes());
    return cFetch(API_CONFIG.querySysRes,{ method: "GET", params: params }).then((response) => {
      if (response.jsonResult.returnCode === '1') {
        dispatch(receiveSysRes(response.jsonResult));
      } else {
        dispatch(sysResError(response.jsonResult.msg));
        message.error(response.jsonResult.msg);
      }
    });
  };
}
