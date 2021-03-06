import {
  GET_AUDIO_QERUEST, GET_AUDIO_SUCCESS, GET_AUDIO_FAILURE,
} from './../constants/actionTypes';

import initialState from './initialState';

export default function audio(state = initialState.audio, action) {
  switch (action.type) {
    case GET_AUDIO_QERUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case GET_AUDIO_SUCCESS:
      let data = action.audio.data;
      data.tags  = data.tags || '';
      return Object.assign({}, state, {
        isFetching: false,
        data: data,
        errorMessage: ''
      });
    case GET_AUDIO_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message
      });
    default:
      return state;
  }
}
