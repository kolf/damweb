import {
  GET_VIDEO_QERUEST, GET_VIDEO_SUCCESS, GET_VIDEO_FAILURE
} from './../constants/actionTypes';
import cFetch from './../utils/cFetch';

import { API_CONFIG } from './../config/api';
import { message } from 'antd';

function requestGetVideo() {
  return {
    type: GET_VIDEO_QERUEST,
    isFetching: true
  };
}

function receiveGetVideo(video) {
  return {
    type: GET_VIDEO_SUCCESS,
    isFetching: false,
    video
  };
}

function getVideoError(message) {
  return {
    type: GET_VIDEO_FAILURE,
    isFetching: false,
    message
  };
}

export function getVideo(params, cb) {
  return dispatch => {
    dispatch(requestGetVideo());
    return cFetch(API_CONFIG.videoDetail, { method: "GET", params: params}).then((res) => {
      if (res.jsonResult.returnCode === '1') {
        dispatch(receiveGetVideo(res.jsonResult));
        cb && cb(res.jsonResult.data)
      } else {
        dispatch(getVideoError(res.jsonResult.msg));
        message.error(res.jsonResult.msg);
      }
    });
  };
}

export function updateVideo(creds, cb) {
  return () => {
    return cFetch(API_CONFIG.videoUpdate, { method: "POST", body: JSON.stringify(creds) }).then((res) => {
      if (res.jsonResult.returnCode === '1') {
        cb && cb(res.jsonResult);
      } else {
        message.error(res.jsonResult.msg);
      }
    });
  };
}

export function removeVideo(creds, cb) {
  return () => {
    return cFetch(API_CONFIG.removeUpdate, { method: "GET", params: creds }).then((res) => {
      if (res.jsonResult.returnCode === '1') {
        cb && cb(res.jsonResult);
      } else {
        message.error(res.jsonResult.msg);
      }
    });
  };
}
