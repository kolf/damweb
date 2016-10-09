import {
  REVIEW_QERUEST, REVIEW_SUCCESS, REVIEW_FAILURE
} from './../constants/actionTypes';
import cFetch from './../utils/cFetch';

import { API_CONFIG } from './../config/api';
import { message } from 'antd';

function requestReview() {
  return {
    type: REVIEW_QERUEST,
    isFetching: true
  };
}

function receiveReview(result) {
  return {
    type: REVIEW_SUCCESS,
    isFetching: false,
    result
  };
}

function reviewError(message) {
  return {
    type: REVIEW_FAILURE,
    isFetching: false,
    message
  };
}

export function review(params, cb) {
  return dispatch => {
    dispatch(requestReview());
    return cFetch(API_CONFIG.review, { method: "GET", params: params}).then((res) => {
      if (res.jsonResult.returnCode === '1') {
        dispatch(receiveReview(res.jsonResult));
        cb && cb();
      } else {
        dispatch(reviewError(res.jsonResult.msg));
        message.error('审核失败！');
      }
    });
  };
}
