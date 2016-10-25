import {
  QUERY_VCG_CATEGORY_QERUEST, QUERY_VCG_CATEGORY_SUCCESS, QUERY_VCG_CATEGORY_FAILURE,
} from './../constants/actionTypes';
import cFetch from './../utils/cFetch';

import { API_CONFIG } from './../config/api';
import { message } from 'antd';

function requestVcgCategory() {
  return {
    type: QUERY_VCG_CATEGORY_QERUEST,
    isFetching: true
  };
}

function receiveVcgCategory(vcgCategorys) {
  return {
    type: QUERY_VCG_CATEGORY_SUCCESS,
    isFetching: false,
    vcgCategorys
  };
}

function vcgCategoryError(message) {
  return {
    type: QUERY_VCG_CATEGORY_FAILURE,
    isFetching: false,
    message
  };
}

export function queryVcgCategory(params) {
  return dispatch => {
    dispatch(requestVcgCategory());
    return cFetch(API_CONFIG.queryVcgCategory, { method: "GET", params: params }).then((res) => {
      if (res.jsonResult.returnCode === '1') {
        dispatch(receiveVcgCategory(res.jsonResult));
      } else {
        let msg = res.jsonResult.msg || '请求失败，请稍候重试...';
        dispatch(vcgCategoryError(msg));
        message.error(msg);
      }
    });
  };
}
