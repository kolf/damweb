import React, {Component, PropTypes} from 'react';
import {Menu, Form, Button, Input, Modal, TreeSelect, Message, Tabs} from 'antd';
import {connect} from 'react-redux';
import {queryCategory, createCategory, updateCategory, removeCategory} from '../actions/category';

const SubMenu = Menu.SubMenu;
const CreateForm = Form.create;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class CategoryMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      tab: 'create'
    }
  }

  componentDidMount() {
    const {dispatch} = this.props;

    dispatch(queryCategory())
  }

  handleSubmit() {
    const {dispatch, form} = this.props;
    const {validateFieldsAndScroll, getFieldsValue, resetFields} = form;
    const {tab} = this.state;

    validateFieldsAndScroll((errors) => {
      if (errors) {
        return;
      }
      const creds = getFieldsValue();

      if (tab === 'create') {
        creds.parentCode = creds.parentCode || '0';
        dispatch(createCategory(creds, () => {
          Message.success('创建成功！');
          dispatch(queryCategory())
        }));
      } else if (tab === 'update') {
        creds.parentCode = creds.parentCode || '0';
        creds.code = creds.id;
        dispatch(updateCategory(creds, () => {
          Message.success('修改成功！');
          dispatch(queryCategory())
        }));
      } else if (tab === 'remove') {
        dispatch(removeCategory(creds, () => {
          Message.success('删除成功！');
          dispatch(queryCategory())
        }));
      }
    });

    this.hideModal();
  }

  showModal() {
    const {resetFields} = this.props.form;
    resetFields();
    this.setState({visible: true});
  }

  hideModal() {
    this.setState({visible: false});
  }

  onChange(parentCode) {
    this.setState({parentCode});
  }

  handleClick({item, key, keyPath}) {
    console.log(item)
  }

  onTabClick(tab) {
    const {resetFields} = this.props.form;
    resetFields();
    this.setState({
      tab
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form;

    const categoryData = this.props.categorys.data || [];

    const formItemLayout = {
      labelCol: {span: 4},
      wrapperCol: {span: 20},
    };

    const loop = data => data.map((item) => {
      if (item.childNode && item.childNode.length) {
        return (
          <SubMenu key={item.code} title={<span>{item.name}</span>}>
            {loop(item.childNode)}
          </SubMenu>
        );
      } else {
        return <Menu.Item key={item.code}>{item.name}</Menu.Item>;
      }
    });

    const toTreeData = data => {
      return data.map((item) => {
        let obj = {
          value: item.code + '',
          label: item.name
        };
        if (item.childNode.length) {
          obj.children = toTreeData(item.childNode)
        }
        return obj;
      })
    };

    return <aside className="ant-layout-sider">
      <div className="pad"><Button onClick={this.showModal.bind(this)} className="btn-block" size="large"
                                   type="primary">管理分类</Button></div>
      <Menu _theme="dark" mode="inline" onClick={this.handleClick.bind(this)}>
        {loop(categoryData)}
      </Menu>

      <Modal title="管理分类" visible={this.state.visible} onOk={this.handleSubmit.bind(this)}
             onCancel={this.hideModal.bind(this)}>
        <Form horizontal>
          <Tabs type="card" defaultActiveKey={this.state.tab} onTabClick={this.onTabClick.bind(this)}>
            <TabPane tab="添加分类" key="create"/>
            <TabPane tab="修改分类" key="update"/>
            <TabPane tab="删除分类" key="remove"/>
          </Tabs>
          {this.state.tab !== 'create' && <FormItem {...formItemLayout} label="选择分类">
            {getFieldDecorator('id', {
              rules: [
                {required: true, message: '请选择要操作的分类'}
              ],
              onChange: (value) => {
                console.log(value)
              }
            })(
              <TreeSelect allowClear dropdownStyle={{maxHeight: 400, overflow: 'auto'}} treeData={toTreeData(categoryData)} placeholder="请选择" treeDefaultExpandAll/>
            )}
          </FormItem>
          }

          {this.state.tab !== 'remove' && <FormItem {...formItemLayout} label="上级分类">
            {getFieldDecorator('parentCode', {})(
              <TreeSelect allowClear dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                          treeData={toTreeData(categoryData)} placeholder="请选择" treeDefaultExpandAll/>
            )}
          </FormItem>
          }

          {this.state.tab !== 'remove' &&
          <FormItem {...formItemLayout} label="分类名字">
            {getFieldDecorator('name', {})(
              <Input type="text" autoComplete="off"/>
            )}
          </FormItem>
          }
        </Form>
      </Modal>
    </aside>;
  }
}

CategoryMenu.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {categorys} = state;
  return {
    categorys
  };
}

export default connect(mapStateToProps)(CreateForm()(CategoryMenu));
