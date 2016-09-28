import {
  QUERY_RESOURCE_QERUEST, QUERY_RESOURCE_SUCCESS, QUERY_RESOURCE_FAILURE
} from './../constants/actionTypes';
import cFetch from './../utils/cFetch';

import { API_CONFIG } from './../config/api';
import { message } from 'antd';

function requestResource() {
  return {
    type: QUERY_RESOURCE_QERUEST,
    isFetching: true
  };
}

function receiveResource(resources) {
  return {
    type: QUERY_RESOURCE_SUCCESS,
    isFetching: false,
    resources
  };
}

function resourceError(message) {
  return {
    type: QUERY_RESOURCE_FAILURE,
    isFetching: false,
    message
  };
}

export function queryResource(params = {pageNum: 1, pageSize: 18}) {
  return dispatch => {
    dispatch(requestResource());
    return cFetch(API_CONFIG.queryResource, { method: "GET", params: params }).then((res) => {
      if (res.jsonResult.returnCode === '1') {
        dispatch(receiveResource(res.jsonResult));
      } else {
        dispatch(resourceError(res.jsonResult.msg));
        message.error(res.jsonResult.msg);
      }
    });
  };
}
