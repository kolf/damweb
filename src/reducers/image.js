import {
  GET_IMAGE_QERUEST, GET_IMAGE_SUCCESS, GET_IMAGE_FAILURE,
} from './../constants/actionTypes';

import initialState from './initialState';

export default function image(state = initialState.image, action) {
  switch (action.type) {
    case GET_IMAGE_QERUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case GET_IMAGE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.image.data,
        errorMessage: ''
      });
    case GET_IMAGE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.image.message
      });
    default:
      return state;
  }
}
