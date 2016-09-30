import {
  GET_IMAGE_QERUEST, GET_IMAGE_SUCCESS, GET_IMAGE_FAILURE
} from './../constants/actionTypes';
import cFetch from './../utils/cFetch';

import { API_CONFIG } from './../config/api';
import { message } from 'antd';

function requestGetImage() {
  return {
    type: GET_IMAGE_QERUEST,
    isFetching: true
  };
}

function receiveGetImage(image) {
  return {
    type: GET_IMAGE_SUCCESS,
    isFetching: false,
    image
  };
}

function getImageError(message) {
  return {
    type: GET_IMAGE_FAILURE,
    isFetching: false,
    message
  };
}

export function getImage(params) {
  return dispatch => {
    dispatch(requestGetImage());
    return cFetch(API_CONFIG.imageDetail, { method: "GET", params: params}).then((res) => {
      if (res.jsonResult.returnCode === '1') {
        dispatch(receiveGetImage(res.jsonResult));
      } else {
        dispatch(getImageError(res.jsonResult.msg));
        message.error(res.jsonResult.msg);
      }
    });
  };
}
