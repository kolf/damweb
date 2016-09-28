import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from './auth';
import users from './users';
import resources from './resources';

const rootReducer = combineReducers({
  routing: routerReducer,
  auth,
  users,
  resources
});

export default rootReducer;
