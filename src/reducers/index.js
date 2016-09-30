import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from './auth';
import users from './users';
import resources from './resources';
import roles from './roles';
import userroles from './userroles';


const rootReducer = combineReducers({
  routing: routerReducer,
  auth,
  users,
  resources,
  roles,
  userroles
});

export default rootReducer;
