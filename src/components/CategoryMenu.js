import React, {Component, PropTypes} from 'react';
import {Menu, Form, Button, Input, Modal, TreeSelect, Message } from 'antd';
import {connect} from 'react-redux';
import {queryCategory, createCategory} from '../actions/category';

const SubMenu = Menu.SubMenu;
const CreateForm = Form.create;
const FormItem = Form.Item;

function toTreeData(data, resultArr){
  data.forEach((item) => {
    let temp ={};
    temp.label= item.name;
    temp.value= item.code;
    temp.key= item.code;
    if(item.childNode) {
      temp.children=[];
      toTreeData(item.childNode, temp.children)
    }
    resultArr.push(temp)
  })
}

function toTreeMenu(data, resultArr){
  data.forEach((item) => {
    let temp = <SubMenu key={item.code} title={<span><span>{item.name}</span></span>}>
      {((item)=> {
          "use strict";
          let childArr=[];
          if(item.childNode.length){
            item.childNode.forEach(child => {
              toTreeMenu(child.childNode, childArr)
            })
          }else{
            childArr.push(<Menu.Item key={item.code}>{item.name}</Menu.Item>);
          }
          return childArr
        })(item)}
    </SubMenu>;

    resultArr.push(temp)
  })
}

class CategoryMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      parentCode: ''
    }
  }

  componentDidMount(){
    const { dispatch } = this.props;

    dispatch(queryCategory())
  }

  handleSubmit() {
    const { dispatch, form } = this.props;
    const {validateFields, getFieldsValue} = form;

    validateFields((errors) => {
      if (errors) {
        return;
      }
      const creds = getFieldsValue();
      creds.parentCode = this.state.parentCode;
      dispatch(createCategory(creds, () => {
        Message.success('创建成功！');
        dispatch(queryCategory())
      }));
    });

    this.hideModal();
  }

  showModal() {
    this.setState({ visible: true });
  }

  hideModal() {
    this.setState({ visible: false });
  }

  onChange(parentCode) {
    this.setState({ parentCode });
  }

  render() {
    const { getFieldProps } = this.props.form;

    const categorys = this.props.categorys.data || [];

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };

    const categoryOpts = [];
    const categoryMenu = [];

    toTreeData(categorys, categoryOpts);
    toTreeMenu(categorys, categoryMenu);

    return <aside className="ant-layout-sider">
      <div className="pad"><Button onClick={this.showModal.bind(this)} className="btn-block" size="large" type="primary">添加分类</Button></div>
      <Menu _theme="dark" mode="inline">
        {categoryMenu}
      </Menu>

      <Modal title="添加分类" visible={this.state.visible} onOk={this.handleSubmit.bind(this)} onCancel={this.hideModal.bind(this)}>
        <Form horizontal wrapClassName="vertical-center-modal" form={this.props.form}>
          <FormItem {...formItemLayout} label="父级菜单">
            <TreeSelect allowClear dropdownStyle={{ maxHeight: 400, overflow: 'auto' }} treeData={categoryOpts} placeholder="请选择" treeDefaultExpandAll onChange={this.onChange.bind(this)} />
          </FormItem>
          <FormItem {...formItemLayout} label="菜单名字">
            <Input {...getFieldProps('name', {})} type="text" autoComplete="off" />
          </FormItem>
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
