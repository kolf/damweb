import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input, Checkbox, TreeSelect, InputNumber } from 'antd';

import './NewProduct.scss';

const createForm = Form.create;
const FormItem = Form.Item;
const SHOW_PARENT = TreeSelect.SHOW_PARENT;

function noop() {
  return false;
}

class NewProduct extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  handleReset(e) {
    e.preventDefault();
    this.props.form.resetFields();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        console.log('Errors in form!!!');
        return;
      }
      console.log('Submit!!!');
      console.log(values);
    });
  }

  onChange(value) {
    console.log('onChange ', value, arguments);
    this.setState({ value });
  }

  userExists(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      setTimeout(() => {
        if (value === 'JasonWood') {
          callback([new Error('抱歉，该用户名已被占用。')]);
        } else {
          callback();
        }
      }, 800);
    }
  }

  render() {
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;

    const nameProps = getFieldProps('name', {
      rules: [
        { required: true, min: 2, message: '产品名称至少为 2 个字符' },
        { validator: this.userExists },
      ],
    });

    const peopleProps = getFieldProps('people', {
      rules: [
        { required: true, min: 2, message: '产品人数至少为 2 个字符' },
        { validator: this.userExists },
      ],
    });

    const periodProps = getFieldProps('period', {
      rules: [
        { required: true, min: 4, message: '产品周期至少为 4 个字符' },
        { validator: this.userExists },
      ],
    });

    const spaceProps = getFieldProps('space', {
      rules: [
        { required: true, min: 4, message: '产品空间至少为 4 个字符' },
        { validator: this.userExists },
      ],
    });

    const priceProps = getFieldProps('price', {
      rules: [
        { required: true, min: 4, message: '产品价格至少为 4 个字符' },
        { validator: this.userExists },
      ],
    });

    const treeData = [{
      label: '功能一',
      value: '0-0',
      key: '0-0',
      children: [{
        label: '子功能一',
        value: '0-0-0',
        key: '0-0-0',
      }],
    }, {
      label: '功能二',
      value: '0-1',
      key: '0-1',
      children: [{
        label: '子功能三',
        value: '0-1-0',
        key: '0-1-0',
      }, {
        label: '子功能四',
        value: '0-1-1',
        key: '0-1-1',
      }, {
        label: '子功能五',
        value: '0-1-2',
        key: '0-1-2',
      }],
    }];

    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 },
    };

    const productFnProps = {
      treeData,
      value: ['0-0-0'],
      onChange: this.onChange,
      multiple: true,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: '请选择',
      // style: {
      //   width: 300,
      // },
    };

    const systemFnProps = {
      treeData,
      value: ['0-0-0'],
      onChange: this.onChange,
      multiple: true,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: '请选择',
      // style: {
      //   width: 300,
      // },
    };

    return (
        <Form horizontal form={this.props.form}>
          <FormItem
            {...formItemLayout}
            label="产品名称"
            hasFeedback
            help={isFieldValidating('name') ? '校验中...' : (getFieldError('name') || []).join(', ')}
          >
            <Input {...nameProps} placeholder="实时校验，输入 JasonWood 看看" />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="产品人数"
            hasFeedback
          >
            <InputNumber min={1} max={10} defaultValue={3}/>
            <span className="ant-form-text">人</span>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="产品周期"
            hasFeedback
          >
            <InputNumber min={1} max={10} defaultValue={12}/>
            <span className="ant-form-text">月</span>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="产品空间"
            hasFeedback
          >
            <InputNumber min={1} max={10} defaultValue={1}/>
            <span className="ant-form-text">G</span>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="产品价格"
            hasFeedback
          >
            <InputNumber min={1} max={10} defaultValue={100}/>
            <span className="ant-form-text">元</span>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="产品功能"
          >
            <TreeSelect {...productFnProps} />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="系统功能"
            hasFeedback
          >
            <TreeSelect {...systemFnProps} />
          </FormItem>

          <FormItem wrapperCol={{ span: 8, offset: 2 }}>
            <Button type="primary" onClick={this.handleSubmit}>确定</Button>
            &nbsp;&nbsp;&nbsp;
            <Button type="ghost" onClick={this.handleReset}>取消</Button>
          </FormItem>
        </Form>
    );
  }
}

NewProduct.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps() {
  return {
    value: ['0-0-0']
  };
}

export default connect(mapStateToProps)(createForm()(NewProduct));
