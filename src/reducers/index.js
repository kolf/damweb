import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from './auth';
import users from './users';
import products from './products';
import res from './res';
import sysRes from './sysRes';

const rootReducer = combineReducers({
  routing: routerReducer,
  auth,
  users,
  products,
  res,
  sysRes
});

export default rootReducer;
