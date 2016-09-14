import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from './auth';
import users from './users';
import products from './products';
import resOpts from './resOpts';

const rootReducer = combineReducers({
  routing: routerReducer,
  auth,
  users,
  products,
  resOpts
});

export default rootReducer;
