import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App/App';
import Home from './containers/Home/Home';
import Users from './containers/Users/Users';
import UploadImage from './containers/UploadImage/UploadImage';
import UploadImageGroup from './containers/UploadImageGroup/UploadImageGroup';
import NotFound from './components/NotFound/NotFound';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="users" component={Users}/>
    <Route path="upload/image" component={UploadImage}/>
    <Route path="upload/imageGroup" component={UploadImageGroup}/>
    <Route path="*" component={NotFound}/>
  </Route>
);
