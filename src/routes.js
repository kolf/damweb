import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App/App';
import HomePage from './containers/HomePage/HomePage';
import NewUser from './containers/NewUser/NewUser';
import ConnectedUsersPage from './containers/UsersPage/UsersPage';
import Products from './containers/ProductList/ProductList';
import NewProduct from './containers/NewProduct/NewProduct';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="users" component={ConnectedUsersPage} breadcrumbName="用户列表"/>
    <Route path="user/new" component={NewUser}/>

    <Route path="products" component={Products} breadcrumbName="产品列表"/>
    <Route path="product/new" component={NewProduct}/>

    <Route path="*" component={NotFoundPage}/>
  </Route>
);
