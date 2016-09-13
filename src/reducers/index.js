import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from './auth';
import user from './users';
import product from './products';

const rootReducer = combineReducers({
  routing: routerReducer,
  auth,
  user,
  product
});

export default rootReducer;
