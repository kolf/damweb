import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Login from './../Login/Login';
import { Link } from 'react-router';
import './App.scss';
import { Menu, Breadcrumb, Icon, Dropdown } from 'antd';
const SubMenu = Menu.SubMenu;

import { logoutUser } from './../../actions/auth';

class App extends Component {
  static propTypes = {
    children: PropTypes.element,
    isAuthenticated: React.PropTypes.bool,
    routing: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.renderAuthenticatedPage = this.renderAuthenticatedPage.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {

  }

  handleLogout() {
    const { dispatch } = this.props;
    dispatch(logoutUser())
  }

  renderAuthenticatedPage() {
    return (
      <div className="ant-layout-topaside">
        <div className="ant-layout-header">
          <div className="ant-layout-wrapper">
            <div className="ant-layout-logo">DAM数字资产管理系统</div>
            <Menu theme="dark" className="menu-primary" mode="horizontal" defaultSelectedKeys={['2']} style={{lineHeight: '60px'}}>
              <Menu.Item key="1"><Link to={'/resource'}><Icon type="folder" />资源库列表</Link></Menu.Item>
              <Menu.Item key="2"><Link to={'/audit'}><Icon type="laptop" />资源审核</Link></Menu.Item>
              <SubMenu key="sub2" title={<span>
                <Icon type="user" />用户管理</span>}>
                <Menu.Item key="5">用户注册</Menu.Item>
                <Menu.Item key="6">角色管理</Menu.Item>
              </SubMenu>
              <Menu.Item key="7"><Link to={'/watermark'}><Icon type="pushpin-o" />水印管理</Link></Menu.Item>

              <Menu.Item key="mail" className="pull-right">
                <Icon type="question" />帮助
              </Menu.Item>
            </Menu>
          </div>
        </div>
        <div className="ant-layout-wrapper">
          <div className="ant-layout-breadcrumb">
            <Breadcrumb>
              <Breadcrumb.Item>首页</Breadcrumb.Item>
              <Breadcrumb.Item>资源库列表</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="ant-layout-container">
            <aside className="ant-layout-sider">
              <Menu _theme="dark" mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']}>
                <SubMenu key="sub4" title={<span><Icon type="user" />精品图片</span>}>
                  <Menu.Item key="1">故事</Menu.Item>
                  <Menu.Item key="2">历史</Menu.Item>
                  <Menu.Item key="3">肖像</Menu.Item>
                  <Menu.Item key="4">乐活</Menu.Item>
                </SubMenu>
                <SubMenu key="sub5" title={<span><Icon type="laptop" />创意图片</span>}>
                  <Menu.Item key="5">平面</Menu.Item>
                  <Menu.Item key="6">插画</Menu.Item>
                  <Menu.Item key="7">动漫</Menu.Item>
                  <Menu.Item key="8">UI设计</Menu.Item>
                </SubMenu>
              </Menu>
            </aside>
            <div className="ant-layout-content" style={{minHeight: 700}}>
              {this.props.children}
            </div>
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

App.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { routing, auth: { isAuthenticated, user } } = state;
  return {
    isAuthenticated, user,routing
  };
}

export default connect(mapStateToProps)(App);
