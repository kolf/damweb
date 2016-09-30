import {
  GET_AUDIO_QERUEST, GET_AUDIO_SUCCESS, GET_AUDIO_FAILURE
} from './../constants/actionTypes';
import cFetch from './../utils/cFetch';

import { API_CONFIG } from './../config/api';
import { message } from 'antd';

function requestGetAudio() {
  return {
    type: GET_AUDIO_QERUEST,
    isFetching: true
  };
}

function receiveGetAudio(audio) {
  return {
    type: GET_AUDIO_SUCCESS,
    isFetching: false,
    audio
  };
}

function getAudioError(message) {
  return {
    type: GET_AUDIO_FAILURE,
    isFetching: false,
    message
  };
}

export function getAudio(params) {
  return dispatch => {
    dispatch(requestGetAudio());
    return cFetch(API_CONFIG.audioDetail, { method: "GET", params: params}).then((res) => {
      if (res.jsonResult.returnCode === '1') {
        dispatch(receiveGetAudio(res.jsonResult));
      } else {
        dispatch(getAudioError(res.jsonResult.msg));
        message.error(res.jsonResult.msg);
      }
    });
  };
}
