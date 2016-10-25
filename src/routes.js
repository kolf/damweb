import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './containers/App/index';

import Home from './containers/Home/index';

import ReviewIndex from './containers/Review/Index/index';

import DownloadIndex from './containers/Download/Index/index';

import RemarkIndex from './containers/Remark/index';

import UserList from './containers/User/List/index';

import UploadIndex from './containers/Upload/Index/index';
import UploadList from './containers/Upload/List/index';

import ImageUpload from './containers/Image/Upload/index';
import ImageUpdate from './containers/Image/Update/index';
import ImageDetails from './containers/Image/Details/index';
import ImageReview from './containers/Image/Review/index';

import ImageGroupUpload from './containers/ImageGroup/Upload/index';
import ImageGroupUpdate from './containers/ImageGroup/Update/index';
import ImageGroupDetails from './containers/ImageGroup/Details/index';
import ImageGroupReview from './containers/ImageGroup/Review/index';

import VideoUpload from './containers/Video/Upload/index';
import VideoUpdate from './containers/Video/Update/index';
import VideoDetails from './containers/Video/Details/index';
import VideoReview from './containers/Video/Review/index';

import AudioUpload from './containers/Audio/Upload/index';
import AudioUpdate from './containers/Audio/Update/index';
import AudioDetails from './containers/Audio/Details/index';
import AudioReview from './containers/Audio/Review/index';

import Users from './containers/User/Users';
import CreateUser from './containers/User/CreateUser';
import Roles from './containers/Roles/Roles';
import CreateRole from './containers/Roles/CreateRole';
import AuthUser from './containers/User/AuthUser';

import NotFound from './components/NotFound/index';

export default (
  <Route path="/" breadcrumbName="管理首页" component={App}>
    <IndexRoute breadcrumbName="首页" component={UploadList}/>

    <Route path="resource" breadcrumbName="资源库列表" component={UploadList}/>

    <Route path="review" breadcrumbName="资源审核" component={ReviewIndex}/>

    <Route path="download" component={DownloadIndex}/>

    <Route path="remark" component={RemarkIndex}/>

    <Route path="users" component={UserList}/>

    <Route path="userList" component={Users}/>
    <Route path="addUser" component={CreateUser}/>
    <Route path="roleList" component={Roles}/>
    <Route path="addRole" component={CreateRole}/>
    <Route path="authUser/:id" component={AuthUser}/>

    <Route path="upload/index" component={UploadIndex}/>

    <Route path="image/upload" component={ImageUpload}/>
    <Route path="image/update/:id" component={ImageUpdate}/>
    <Route path="image/details/:id" component={ImageDetails}/>
    <Route path="image/review/:id" component={ImageReview}/>

    <Route path="imageGroup/upload" component={ImageGroupUpload}/>
    <Route path="imageGroup/update/:id" component={ImageGroupUpdate}/>
    <Route path="imageGroup/details/:id" component={ImageGroupDetails}/>
    <Route path="imageGroup/review/:id" component={ImageGroupReview}/>

    <Route path="video/upload" breadcrumbName="视频上传" component={VideoUpload}/>
    <Route path="video/update/:id" component={VideoUpdate}/>
    <Route path="video/details/:id" component={VideoDetails}/>
    <Route path="video/review/:id" component={VideoReview}/>

    <Route path="audio/upload" component={AudioUpload}/>
    <Route path="audio/update/:id" component={AudioUpdate}/>
    <Route path="audio/details/:id" component={AudioDetails}/>
    <Route path="audio/review/:id" component={AudioReview}/>

    <Route path="*" component={NotFound}/>
  </Route>
);
