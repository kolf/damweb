import {
  UPDATE_AUDIO_QERUEST, UPDATE_AUDIO_SUCCESS, UPDATE_AUDIO_FAILURE
} from './../constants/actionTypes';
import cFetch from './../utils/cFetch';

import { API_CONFIG } from './../config/api';
import { message } from 'antd';

function requestUpdateAudio() {
  return {
    type: UPDATE_AUDIO_QERUEST,
    isFetching: true
  };
}

function receiveUpdateAudio(audio) {
  return {
    type: UPDATE_AUDIO_SUCCESS,
    isFetching: false,
    audio
  };
}

function UpdateAudioError(message) {
  return {
    type: UPDATE_AUDIO_FAILURE,
    isFetching: false,
    message
  };
}

export function updateAudio(creds, cb) {
  return dispatch => {
    dispatch(requestUpdateAudio(creds));
    return cFetch(API_CONFIG.audioUpdate, { method: "POST", body: JSON.stringify(creds) }).then((res) => {
      if (res.jsonResult.returnCode === '1') {
        dispatch(receiveUpdateAudio(res.jsonResult));
        //message.success('资源入库成功！');
        cb(res.jsonResult.msg);
      } else {
        dispatch(UpdateAudioError(res.jsonResult.msg));
        message.error(res.jsonResult.msg);
      }
    });
  };
}
