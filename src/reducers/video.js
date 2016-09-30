import {
  GET_VIDEO_QERUEST, GET_VIDEO_SUCCESS, GET_VIDEO_FAILURE,
} from './../constants/actionTypes';

import initialState from './initialState';

export default function video(state = initialState.video, action) {
  switch (action.type) {
    case GET_VIDEO_QERUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case GET_VIDEO_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.video.data,
        errorMessage: ''
      });
    case GET_VIDEO_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message
      });
    default:
      return state;
  }
}
