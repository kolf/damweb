import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Login from './../Login/Login';
import { Link } from 'react-router';

import "../../style/index.less";

import './App.scss';
import { Menu, Breadcrumb, Icon, Dropdown } from 'antd';
const SubMenu = Menu.SubMenu;

class App extends Component {
  static propTypes = {
    children: PropTypes.element,
    isAuthenticated: React.PropTypes.bool,
    routing: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.renderAuthenticatedPage = this.renderAuthenticatedPage.bind(this);

    this.state = {
      collapse: false
    };
  }

  componentDidMount() {
  }

  renderAuthenticatedPage() {
    return (
      <div className="ant-layout-aside">
        <aside className="ant-layout-sider">
          <div className="ant-layout-logo">DAM 运营管理系统</div>
          <Menu mode="inline" theme="dark" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']}>
            <SubMenu key="sub1" title={<span><Icon type="user" />用户管理</span>}>
              <Menu.Item key="1">
                <Link to={'/users'}>
                  用户列表
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="cloud" />产吕管理</span>}>
              <Menu.Item key="2">
                <Link to={'/products'}>
                  产品列表
                </Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </aside>
        <div className="ant-layout-main">
          <div className="ant-layout-header">
          <Menu mode="horizontal">
              <SubMenu className="pull-right" title={<span><Icon type="user" />Kolf</span>}>
                <Menu.Item key="setting:1">选项1</Menu.Item>
                <Menu.Item key="setting:2">选项2</Menu.Item>
                <Menu.Divider />
                <Menu.Item key="setting:3">退出</Menu.Item>
              </SubMenu>
            </Menu>
          </div>
          <div className="ant-layout-breadcrumb">
            <Breadcrumb>
              <Breadcrumb.Item>首页</Breadcrumb.Item>
              <Breadcrumb.Item>用户管理</Breadcrumb.Item>
              <Breadcrumb.Item>用户列表</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="ant-layout-container">
            <div className="ant-layout-content">
              {this.props.children}
            </div>
          </div>
          <div className="ant-layout-footer">
             视觉中国 © 2016 DAM 运营管理系统
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { isAuthenticated } = this.props;
    return (
      <div className="app-container">
        {isAuthenticated? this.renderAuthenticatedPage() : <Login/>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { routing, auth: { isAuthenticated, user } } = state;
  return {
    isAuthenticated, user,routing
  };
}

export default connect(mapStateToProps)(App);
