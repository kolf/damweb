import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import App from './containers/App/App';
import Home from './containers/Home/Home';
import CreateUser from './containers/CreateUser/CreateUser';
import Users from './containers/Users/Users';
import Products from './containers/Products/Products';
import CreateProduct from './containers/CreateProduct/CreateProduct';
import NotFound from './components/NotFound/NotFound';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>

    <Redirect from="/user" to="user/list" />
    <Route path="user/list" component={Users} breadcrumbName="用户列表"/>
    <Route path="user/create" component={CreateUser}/>

    <Redirect from="/product" to="product/list" />
    <Route path="product/list" component={Products} breadcrumbName="产品列表"/>
    <Route path="product/create" component={CreateProduct}/>

    <Route path="*" component={NotFound}/>
  </Route>
);
