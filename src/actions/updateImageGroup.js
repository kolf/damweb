import {
  UPDATE_IMG_QERUEST, UPDATE_IMG_SUCCESS, UPDATE_IMG_FAILURE
} from './../constants/actionTypes';
import cFetch from './../utils/cFetch';

import { API_CONFIG } from './../config/api';
import { message } from 'antd';

function requestUpdateImageGroup() {
  return {
    type: UPDATE_IMG_QERUEST,
    isFetching: true
  };
}

function receiveUpdateImageGroup(imageGroup) {
  return {
    type: UPDATE_IMG_SUCCESS,
    isFetching: false,
    imageGroup
  };
}

function UpdateImageGroupError(message) {
  return {
    type: UPDATE_IMG_FAILURE,
    isFetching: false,
    message
  };
}

export function updateImageGroup(creds, cb) {
  return dispatch => {
    dispatch(requestUpdateImageGroup(creds));
    return cFetch(API_CONFIG.updateImageGroup, { method: "POST", body: JSON.stringify(creds) }).then((res) => {
      if (res.jsonResult.returnCode === '1') {
        dispatch(receiveUpdateImageGroup(res.jsonResult));
        cb && cb(res.jsonResult.msg);
      } else {
        dispatch(UpdateImageGroupError(res.jsonResult.msg));
        message.error(res.jsonResult.msg);
      }
    });
  };
}
