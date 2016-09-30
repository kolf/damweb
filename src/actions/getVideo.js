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

export function getVideo(params) {
  return dispatch => {
    dispatch(requestGetVideo());
    return cFetch(API_CONFIG.videoDetail, { method: "GET", params: params}).then((res) => {
      if (res.jsonResult.returnCode === '1') {
        dispatch(receiveGetVideo(res.jsonResult));
      } else {
        dispatch(getVideoError(res.jsonResult.msg));
        message.error(res.jsonResult.msg);
      }
    });
  };
}
