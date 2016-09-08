import React                           from "react";
import {Router, Route, Redirect, useRouterHistory} from "react-router";
import createHashHistory               from 'history/lib/createHashHistory';
import createBrowserHistory            from 'history/lib/createBrowserHistory';
import useScroll                       from 'scroll-behavior/lib/useStandardScroll';

import Application                     from "app/containers/application";
import SecuredContainer                from "app/containers/SecuredContainer";

import HomeContainer                   from "app/containers";
import LoginContainer                  from "app/containers/login";
import PageNotFound                    from "app/containers/pageNotFound";

import EditorStorageContainer         from "app/containers/editor/storage";
import EditorNoEditorContainer        from "app/containers/editor/noEditor";
import EditorSecondInstanceContainer  from "app/containers/editor/secondInstance";
import EditorOnlineContainer          from "app/containers/editor/online";
import EditorOfflineContainer         from "app/containers/editor/offline";
import EditorEditContainer            from "app/containers/editor/edit";
import EditorPushContainer            from "app/containers/editor/push";
import EditorViewContainer            from "app/containers/editor/view";

import CreativeNoEditorContainer       from "app/containers/creative/noEditor";
import CreativeOnlineContainer         from "app/containers/creative/online";
import CreativeOfflineContainer        from "app/containers/creative/offline";
import CreativeFailContainer           from "app/containers/creative/fail";
import CreateAuthorityContainer        from "app/containers/creative/authority";

import CmsContainer                    from "app/containers/cms/topicManage";
import TopicCfg                        from "app/containers/cms/topicManage/topicConfig";
import ContentCfg                      from "app/containers/cms/topicManage/contentCfg";
import PreviewContainer                from "app/containers/cms/topicManage/topicPreview";
import ChannelList                     from "app/containers/cms/channelManage";
import ChannelConfig                   from "app/containers/cms/channelManage/pageEdit";

import UserContainer                   from "app/containers/user";
import FavoritesContainer              from "app/containers/user/favorites";
import DraftsContainer                 from "app/containers/user/drafts";
import NewsContainer                   from "app/containers/user/news";

import CloudUpload                     from "app/containers/cloud/upload";
import CloudDownload                   from "app/containers/cloud/download";

import TagEditorContainer              from "app/containers/tag/editor"
import TagCreativeContainer            from "app/containers/tag/creative"

export default function renderRoutes (store) {

    const history = useRouterHistory(createHashHistory)({ queryKey: false });
    const appHistory = useScroll(useRouterHistory(createBrowserHistory))();

    return (
        <Router history={appHistory}>
            <Redirect from="/" to="/login" />

            <Route path="/" component={Application}>
            
                <Route component={SecuredContainer}>
                    <Route path="home" component={HomeContainer} />

                    <Redirect from="/editor" to="editor/storage" />
                    <Route path="editor/storage" component={EditorStorageContainer} />
                    <Route path="editor/noEditor" component={EditorNoEditorContainer} />
                    <Route path="editor/secondInstance" component={EditorSecondInstanceContainer} />
                    <Route path="editor/online" component={EditorOnlineContainer} />
                    <Route path="editor/offline" component={EditorOfflineContainer} />
                    <Route path="editor/edit/:type/:operate/:ids" component={EditorEditContainer} />
                    <Route path="editor/push/:id" component={EditorPushContainer} />
                    <Route path="editor/view/:id" component={EditorViewContainer} />

                    <Redirect from="/creative" to="creative/noEditor" />
                    <Route path="creative/noEditor" component={CreativeNoEditorContainer} />
                    <Route path="creative/online" component={CreativeOnlineContainer} />
                    <Route path="creative/offline" component={CreativeOfflineContainer} />
                    <Route path="creative/fail" component={CreativeFailContainer} />
                    <Route path="file/i=:id&type=:type" component={CreateAuthorityContainer} />

                    <Redirect from="/cms" to="cms/topicManage" />
                    <Route path="cms/topicManage" component={CmsContainer} />
                    <Route path="cms/topicManage/topicPreview" component={PreviewContainer} />
                    <Route path="cms/topicManage/:topicId" component={TopicCfg} />
                    <Route path="cms/topicManage/:topicId/:tabIndex" component={TopicCfg} />
                    <Route path="cms/topicManage/contentManage/:id" component={ContentCfg} />
                    <Redirect from="/cms/channelManage" to="cms/channelManage/:pageClass" />
                    <Route path="cms/channelManage/:pageClass" component={ChannelList} />
                    <Route path="cms/channelManage/config/:id" component={ChannelConfig} />

                    <Redirect from="/cloud" to="/cloud/upload" />
                    <Route path="/cloud/upload" component={CloudUpload}/>
                    <Route path="/cloud/download" component={CloudDownload}/>

                    <Route path="editor/tag" component={TagEditorContainer} />
                    <Route path="creative/tag" component={TagCreativeContainer} />

                    <Route path="user" component={UserContainer} />
                    <Route path="user/favorites" component={FavoritesContainer} />
                    <Route path="user/drafts" component={DraftsContainer} />
                    <Route path="user/news" component={NewsContainer} />
                </Route>

                <Route path="login" component={LoginContainer} />

                <Route path="*" component={PageNotFound} status={404} />

            </Route>
        </Router>
    );
}
              

