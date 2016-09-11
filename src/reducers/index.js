import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from './auth';
import users from './users';
import products from './products';

const rootReducer = combineReducers({
  routing: routerReducer,
  auth,
  users,
  products
});

export default rootReducer;
