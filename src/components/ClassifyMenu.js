import React, {Component} from 'react';
import {Menu, Icon} from 'antd';

const SubMenu = Menu.SubMenu;

class ClassifyMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <aside className="ant-layout-sider">
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
    </aside>;
  }
}

export default ClassifyMenu;
