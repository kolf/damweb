import {
  UPDATE_IMG_QERUEST, UPDATE_IMG_SUCCESS, UPDATE_IMG_FAILURE
} from './../constants/actionTypes';
import cFetch from './../utils/cFetch';

import { API_CONFIG } from './../config/api';
import { message } from 'antd';

function requestUpdateImage() {
  return {
    type: UPDATE_IMG_QERUEST,
    isFetching: true
  };
}

function receiveUpdateImage(image) {
  return {
    type: UPDATE_IMG_SUCCESS,
    isFetching: false,
    image
  };
}

function UpdateImageError(message) {
  return {
    type: UPDATE_IMG_FAILURE,
    isFetching: false,
    message
  };
}

export function updateImage(creds, cb) {
  return dispatch => {
    dispatch(requestUpdateImage(creds));
    return cFetch(API_CONFIG.updateImg, { method: "POST", body: JSON.stringify(creds) }).then((res) => {
      if (res.jsonResult.returnCode === '1') {
        dispatch(receiveUpdateImage(res.jsonResult));
        // message.success('资源入库成功！');
        cb && cb(res.jsonResult.msg);
      } else {
        dispatch(UpdateImageError(res.jsonResult.msg));
        message.error(res.jsonResult.msg);
      }
    });
  };
}
