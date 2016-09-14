import {
  RES_QERUEST, RES_SUCCESS, RES_FAILURE
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

export function queryRes(params= {resType: 1}) {
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
