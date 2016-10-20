import {
  QUERY_CATEGORY_QERUEST, QUERY_CATEGORY_SUCCESS, QUERY_CATEGORY_FAILURE,
} from './../constants/actionTypes';
import cFetch from './../utils/cFetch';

import { API_CONFIG } from './../config/api';
import { message } from 'antd';

function requestCategory() {
  return {
    type: QUERY_CATEGORY_QERUEST,
    isFetching: true
  };
}

function receiveCategory(categorys) {
  return {
    type: QUERY_CATEGORY_SUCCESS,
    isFetching: false,
    categorys
  };
}

function categoryError(message) {
  return {
    type: QUERY_CATEGORY_FAILURE,
    isFetching: false,
    message
  };
}

export function queryCategory(params) {
  return dispatch => {
    dispatch(requestCategory());
    return cFetch(API_CONFIG.queryCategory, { method: "GET", params: params }).then((res) => {
      if (res.jsonResult.returnCode === '1') {
        dispatch(receiveCategory(res.jsonResult));
      } else {
        let msg = res.jsonResult.msg || '请求失败，请稍候重试...';
        dispatch(categoryError(msg));
        message.error(msg);
      }
    });
  };
}

export function createCategory(params, cb) {
  return () => {
    return cFetch(API_CONFIG.createCategory, { method: "POST", body: JSON.stringify(params) }).then((res) => {
      if (res.jsonResult.returnCode === '1') {
        cb && cb()
      } else {
        let msg = res.jsonResult.msg || '请求失败，请稍候重试...';
        message.error(msg);
      }
    });
  };
}

export function updateCategory(params, cb) {
  return () => {
    return cFetch(API_CONFIG.updateCategory, { method: "POST", body: JSON.stringify(params) }).then((res) => {
      if (res.jsonResult.returnCode === '1') {
        cb && cb()
      } else {
        let msg = res.jsonResult.msg || '请求失败，请稍候重试...';
        message.error(msg);
      }
    });
  };
}

export function removeCategory(params, cb) {
  return () => {
    return cFetch(API_CONFIG.removeCategory, { method: "GET", params: params }).then((res) => {
      if (res.jsonResult.returnCode === '1') {
        cb && cb()
      } else {
        let msg = res.jsonResult.msg || '请求失败，请稍候重试...';
        message.error(msg);
      }
    });
  };
}
