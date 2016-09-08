import React, {Component} from "react";
import {Link}             from "react-router";
import {getStorage}       from "app/api/auth_token";
import {invalid}          from "app/action_creators/session_action_creator";

import Menu from "antd/lib/menu";
import Dropdown from "antd/lib/dropdown";
import {clearStorage}     from "app/api/auth_token";

export default class Header extends Component {
    constructor(props) {
        super(props);
        //console.log(props);
    };

    static contextTypes = {
        "router": React.PropTypes.object.isRequired
    };

    static contextTypes = {
        "router": React.PropTypes.object.isRequired
    };

    render() {
        // console.log('header')
        // console.log(this.state)
        // console.log(this.props)
        const avatarImage = require('app/assets/avatars/avatar.png');
        const avatarImage1 = require('app/assets/avatars/avatar1.png');
        const avatarImage2 = require('app/assets/avatars/avatar2.png');
        const avatarImage3 = require('app/assets/avatars/avatar3.png');
        const avatarImage4 = require('app/assets/avatars/avatar4.png');
        const avatarImage5 = require('app/assets/avatars/avatar5.png');
        //const userImage = require('app/assets/avatars/user.jpg');
        return (
            <div id="navbar" className="navbar navbar-default">
                <div id="navbar-container" className="navbar-container">
                    <div className="navbar-header pull-left">
                        <Link className="navbar-brand" to="/home">
                            <small><i className="fa fa-leaf"></i> VCG 内容管理系统</small>
                        </Link>
                    </div>
                    <div className="navbar-buttons navbar-header pull-right" role="navigation">
                        <ul className="nav ace-nav">
                            <li className="purple">
                                <Link to="/user/news" data-toggle="dropdown" className="dropdown-toggle">
                                    消息
                                    <i className="ace-icon fa fa-bell icon-animated-bell"></i>
                                    <span className="badge badge-important">8</span>
                                </Link>
                            </li>
                            <li className="grey">
                                <Link to="/user/favorites" data-toggle="dropdown" className="dropdown-toggle">
                                    <i className="ace-icon fa fa-star icon-animated-vertical" ></i>
                                </Link>
                            </li>
                            <li className="green">
                                <Link to="/user/drafts" data-toggle="dropdown" className="dropdown-toggle">
                                    <i className="ace-icon fa fa-envelope icon-animated-vertical"></i>
                                </Link>
                            </li>

                            <li className="light-blue">
                                <Dropdown className="light-blue"
                                    overlay={
                                        <Menu>
                                            <Menu.Item>
                                                <a href="/user">
                                                    <i className="ace-icon fa fa-user"></i> 用户中心
                                                </a>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <a onClick={() => this._handleLoginOut() }>
                                                    <i className="ace-icon fa fa-power-off"></i> 登出
                                                </a>
                                            </Menu.Item>
                                        </Menu>
                                    }>
                                    <a data-toggle="dropdown" className="dropdown-toggle">
                                        <img className="nav-user-photo" src={avatarImage5} alt="Jason's Photo" />
                                        <span className="user-info">
                                            {getStorage('userName')}
                                        </span>
                                        <i className="ace-icon fa fa-caret-down"></i>
                                    </a>
                                </Dropdown>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

    _handleLoginOut() {
        clearStorage();
        this.context.router.push("/login");
    };
}




