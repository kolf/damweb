import React from 'react';
import { Route, IndexRoute } from 'react-router';

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

import AudioUpload from './containers/Audio/Upload/index';
import AudioUpdate from './containers/Audio/Update/index';
import AudioDetails from './containers/Audio/Details/index';

//add by lirui@2016-9-29
import Users from './containers/User/Users';
import CreateUser from './containers/User/CreateUser';

import NotFound from './components/NotFound/index';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>

    <Route path="resource" breadcrumbName="资源库列表" component={UploadList}/>

    <Route path="review" component={ReviewIndex}/>

    <Route path="download" component={DownloadIndex}/>

    <Route path="remark" component={RemarkIndex}/>

    <Route path="users" component={UserList} />
    //add by lirui@2016-9-29
    <Route path="userList" component={Users} />
    <Route path="addUser" component={CreateUser} />

    <Route path="upload/index" component={UploadIndex}/>

    <Route path="image/upload" component={ImageUpload}/>
    <Route path="image/update" component={ImageUpdate}/>
    <Route path="image/details" component={ImageDetails}/>
    <Route path="image/review" component={ImageReview}/>

    <Route path="imageGroup/upload" component={ImageGroupUpload}/>
    <Route path="imageGroup/update" component={ImageGroupUpdate}/>
    <Route path="imageGroup/details" component={ImageGroupDetails}/>
    <Route path="imageGroup/review" component={ImageGroupReview}/>

    <Route path="video/upload" component={VideoUpload}/>
    <Route path="video/update" component={VideoUpdate}/>
    <Route path="video/details" component={VideoDetails}/>

    <Route path="audio/upload" component={AudioUpload}/>
    <Route path="audio/update" component={AudioUpdate}/>
    <Route path="audio/details" component={AudioDetails}/>

    <Route path="*" component={NotFound}/>
  </Route>
);
