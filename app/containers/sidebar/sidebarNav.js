import React, {Component} from "react";
import {Link}             from "react-router";


export default class SidebarNav extends Component {
    constructor(props) {
        super(props);
        this.navInit = [
             {
                 path: '/home',
                 text: '首页',
                 icon: 'fa-home',
                 children: []
             },
            {
                path: "/editor",
                text: '编辑类',
                icon: 'fa-pencil-square-o',
                children: [
                    {
                        path: '/editor/storage',
                        text: '全部资源',
                        icon: 'fa-list-alt'
                    },
                    {
                        path: '/editor/noEditor',
                        text: '未编审',
                        icon: 'fa-list-alt'
                    },
                    {
                        path: '/editor/secondInstance',
                        text: '二审',
                        icon: 'fa-list-alt'
                    },
                    {
                        path: '/editor/online',
                        text: '已上线',
                        icon: 'fa-list-alt'
                    },
                    {
                        path: '/editor/offline',
                        text: '已下线',
                        icon: 'fa-list-alt'
                    },
                    {
                        path: '/editor/tag',
                        text: '关键词管理',
                        icon: 'fa-list-alt'
                    }
                ]
            },
            {
                path: "/creative",
                text: '创意类',
                icon: 'fa-creative-commons',
                children: [
                    {
                        path: '/creative/noEditor',
                        text: '未编审',
                        icon: 'fa-list-alt'
                    },
                    {
                        path: '/creative/online',
                        text: '已上线',
                        icon: 'fa-list-alt'
                    },
                    {
                        path: '/creative/offline',
                        text: '已下线',
                        icon: 'fa-list-alt'
                    },
                    {
                        path: '/creative/fail',
                        text: '不通过',
                        icon: 'fa-list-alt'
                    },
                    {
                        path: '/creative/tag',
                        text: '关键词管理',
                        icon: 'fa-list-alt'
                    }
                ]
            },
            {
                path: "/cloud",
                text: '资源上传/下载',
                icon: 'fa-cloud',
                children: [
                    {
                        path: '/cloud/upload',
                        text: '上传',
                        icon: 'fa-list-alt'
                    },
                    {
                        path: '/cloud/download',
                        text: '下载',
                        icon: 'fa-list-alt'
                    }
                ]
            },
            {
                path: "/cms",
                text: '内容运营平台',
                icon: 'fa-th-large',
                children: [
                    {
                        path : '/cms/topicManage',
                        text : '专题管理',
                        icon: 'fa-list-alt'
                    },
                    {
                        path : '/cms/channelManage/page',
                        text : '首页管理',
                        icon: 'fa-list-alt'
                    },
                    {
                        path : '/cms/channelManage/channel',
                        text : '频道页管理',
                        icon: 'fa-list-alt'
                    }
                ]
            }
        ];
        this.depth = 1;
    };

    static contextTypes = {
        "router": React.PropTypes.object.isRequired
    };

    renderNav(list, depth) {
        var pathname = this.props.location.pathname;
        var arg = pathname.substring(1).split('/');
        var len = arg.length;
        return (
            <ul className={depth == 1 ? "nav nav-list" : "submenu"}>
                {list.map((item, i) => {
                    let {text, path, children} = item;
                    var icons = (depth == 1) ? "menu-icon fa " + item.icon : "menu-icon fa fa-caret-right";
                    if (children == undefined) { children = [] }
                    var isChildren = children.length ? true : false;
                    var active = "";
                    if (path == pathname) {
                        active = "active";
                    }
                    if (len == 2) {
                        if (path == '/' + arg[0]) {
                            active = "active open"
                        }
                    }
                    if (len == 3) {
                        if (path == '/' + arg[0]) {
                            active = "active open"
                        }
                        if (path == '/' + arg[0] + '/' + arg[1]) {
                            active = "active open"
                        }
                    }

                    return (
                        <li className={active} key={i}>
                            <Link to={path} className={isChildren ? "dropdown-toggle" : ""}>
                                <i className={icons}></i>
                                <span className="menu-text">{text}</span>
                                {isChildren ? <b className="arrow fa fa-angle-down"></b> : ''}
                            </Link>
                            <b ref="j_arrow" className="arrow"></b>
                            {isChildren ? this.renderNav(children, depth + 1) : ''}
                        </li>
                    )
                }) }
            </ul>
        )
    }

    render() {
        return (
            this.renderNav(this.navInit, this.depth)
        )
    }
}