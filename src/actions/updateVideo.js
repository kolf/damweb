import {
  UPDATE_VIDEO_QERUEST, UPDATE_VIDEO_SUCCESS, UPDATE_VIDEO_FAILURE
} from './../constants/actionTypes';
import cFetch from './../utils/cFetch';

import { API_CONFIG } from './../config/api';
import { message } from 'antd';

function requestUpdateVideo() {
  return {
    type: UPDATE_VIDEO_QERUEST,
    isFetching: true
  };
}

function receiveUpdateVideo(video) {
  return {
    type: UPDATE_VIDEO_SUCCESS,
    isFetching: false,
    video
  };
}

function UpdateVideoError(message) {
  return {
    type: UPDATE_VIDEO_FAILURE,
    isFetching: false,
    message
  };
}

export function updateVideo(creds, cb) {
  return dispatch => {
    dispatch(requestUpdateVideo(creds));
    return cFetch(API_CONFIG.videoUpdate, { method: "POST", body: JSON.stringify(creds) }).then((res) => {
      if (res.jsonResult.returnCode === '1') {
        dispatch(receiveUpdateVideo(res.jsonResult));
        cb && cb(res.jsonResult);
      } else {
        dispatch(UpdateVideoError(res.jsonResult.msg));
        message.error(res.jsonResult.msg);
      }
    });
  };
}
