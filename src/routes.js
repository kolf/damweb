import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Home from './containers/Home/Home';
import App from './containers/App/App';
import Resource from './containers/Resource/Resource';
import Audit from './containers/Audit/Audit';
import Download from './containers/Download/Download';
import Watermark from './containers/Watermark/Watermark';
import User from './containers/Users/Users';

import UploadIndex from './containers/UploadIndex/UploadIndex';
import UploadImage from './containers/UploadImage/UploadImage';
import UploadImageGroup from './containers/UploadImageGroup/UploadImageGroup';
import UploadVideo from './containers/UploadVideo/UploadVideo';
import UploadAudio from './containers/UploadAudio/UploadAudio';

import EditImage from './containers/EditImage/EditImage';
import EditImageGroup from './containers/EditImageGroup/EditImageGroup';
import EditVideo from './containers/EditVideo/EditVideo';
import EditAudio from './containers/EditAudio/EditAudio';

import DetailsImage from './containers/DetailsImage/DetailsImage';
import DetailsImageGroup from './containers/DetailsImageGroup/DetailsImageGroup';
import DetailsVideo from './containers/DetailsVideo/DetailsVideo';
import DetailsAudio from './containers/DetailsAudio/DetailsAudio';

import NotFound from './components/NotFound/NotFound';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="resource" breadcrumbName="资源库列表" component={Resource}/>
    <Route path="audit" component={Audit}/>
    <Route path="download" component={Download}/>
    <Route path="watermark" component={Watermark}/>
    <Route path="user" component={User}/>

    <Route path="upload/index" component={UploadIndex}/>
    <Route path="upload/image" component={UploadImage}/>
    <Route path="upload/imageGroup" component={UploadImageGroup}/>
    <Route path="upload/video" component={UploadVideo}/>
    <Route path="upload/audio" component={UploadAudio}/>

    <Route path="edit/image" component={EditImage}/>
    <Route path="edit/imageGroup" component={EditImageGroup}/>
    <Route path="edit/video" component={EditVideo}/>
    <Route path="edit/audio" component={EditAudio}/>

    <Route path="details/image" component={DetailsImage}/>
    <Route path="details/imageGroup" component={DetailsImageGroup}/>
    <Route path="details/video" component={DetailsVideo}/>
    <Route path="details/audio" component={DetailsAudio}/>

    <Route path="*" component={NotFound}/>
  </Route>
);
