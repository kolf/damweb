import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from './auth';
import users from './users';
import resources from './resources';
import audio from './audio';
import image from './image';
import video from './video';
import categorys from './categorys';

const rootReducer = combineReducers({
  routing: routerReducer,
  auth,
  users,
  resources,
  audio,
  image,
  video,
  categorys
});

export default rootReducer;
