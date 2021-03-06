import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import Login from '../Login/index';
import {browserHistory, Link} from 'react-router';
import './style.scss';
import '../../assets/styles/ReactHtml5Video.css';
import {Menu, Breadcrumb, Icon} from 'antd';
import localStorage from '../../utils/localStorage';
const SubMenu = Menu.SubMenu;

import {logoutUser} from './../../actions/auth';

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

  handleLogout({key}) {
    const {dispatch} = this.props;
    if (key === 'logout') {
      browserHistory.push('/');
      dispatch(logoutUser())
    }
  }

  renderAuthenticatedPage() {
    const {routes} = this.props;

    const defaultKeys = () => {
      return routes.map((item) => {
        return item.path
      })
    };

    return (
      <div className="ant-layout-topaside">
        <div className="ant-layout-header">
          <div className="ant-layout-wrapper">
            <div className="ant-layout-logo">DAM数字资产管理系统</div>
            <Menu theme="dark" className="menu-primary" mode="horizontal" style={{lineHeight: '60px'}}
                  onClick={this.handleLogout}>
              <Menu.Item key="1"><Link to={'/resource'}><Icon type="folder"/>资源库列表</Link></Menu.Item>
              <Menu.Item key="2"><Link to={'/review'}><Icon type="laptop"/>资源审核</Link></Menu.Item>
              <SubMenu key="sub2" title={<span>
                <Icon type="user"/>用户管理</span>}>
                <Menu.Item key="5"><Link to={'/userList'}>用户列表</Link></Menu.Item>
                <Menu.Item key="6"><Link to={'/roleList'}>角色列表</Link></Menu.Item>
              </SubMenu>
              <Menu.Item key="7"><Link to={'/remark'}><Icon type="pushpin-o"/>水印管理</Link></Menu.Item>

              <SubMenu className="pull-right" title={<span><Icon type="user"/>{localStorage.get('user').damId}</span>}>
                <Menu.Item key="logout">
                  <Icon type="question"/>退出
                </Menu.Item>
              </SubMenu>
            </Menu>
          </div>
        </div>
        <div className="ant-layout-wrapper">
          <div className="ant-layout-breadcrumb">
            <Breadcrumb>{routes.map(item => <Breadcrumb.Item>{item.breadcrumbName}</Breadcrumb.Item>)}</Breadcrumb>
          </div>
          <div className="ant-layout-container">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }

  render() {
    const {isAuthenticated} = this.props;
    return (
      <div className="app-container">
        {isAuthenticated ? this.renderAuthenticatedPage() : <Login/>}
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {routing, auth: {isAuthenticated, user}} = state;
  return {
    isAuthenticated, user, routing
  };
}

export default connect(mapStateToProps)(App);
