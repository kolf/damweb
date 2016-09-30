import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from './auth';
import users from './users';
import resources from './resources';
import audio from './audio';
import image from './image';
import video from './video';

const rootReducer = combineReducers({
  routing: routerReducer,
  auth,
  users,
  resources,
  audio,
  image,
  video
});

export default rootReducer;
