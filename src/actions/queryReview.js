import {
  QUERY_REVIEW_QERUEST, QUERY_REVIEW_SUCCESS, QUERY_REVIEW_FAILURE
} from './../constants/actionTypes';
import cFetch from './../utils/cFetch';

import { API_CONFIG } from './../config/api';
import { message } from 'antd';

function requestReview() {
  return {
    type: QUERY_REVIEW_QERUEST,
    isFetching: true
  };
}

function receiveReview(review) {
  return {
    type: QUERY_REVIEW_SUCCESS,
    isFetching: false,
    review
  };
}

function resourceError(message) {
  return {
    type: QUERY_REVIEW_FAILURE,
    isFetching: false,
    message
  };
}

export function queryReview(params) {
  return dispatch => {
    dispatch(requestReview());
    return cFetch(API_CONFIG.queryResource, { method: "GET", params: params }).then((res) => {
      if (res.jsonResult.returnCode === '1') {
        dispatch(receiveReview(res.jsonResult));
      } else {
        let msg = res.jsonResult.msg || '请求失败，请稍候重试...';
        dispatch(resourceError(msg));
        message.error(msg);
      }
    });
  };
}
