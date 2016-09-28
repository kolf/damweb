import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input, Select, Switch } from 'antd';
import { createUser } from './../../actions/users';
import { queryProducts } from './../../actions/products';

import './CreateUser.scss';

const CreateForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(queryProducts());
  }

  handleReset(e) {
    e.preventDefault();
    this.props.form.resetFields();
  }

  handleSubmit(e) {
    e.preventDefault();

    const { dispatch } = this.props;

    this.props.form.validateFields((errors) => {
      if (errors) {
        return;
      }
      const creds = (this.props.form.getFieldsValue());
      dispatch(createUser(creds));
    });
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
    const accountProps = getFieldProps('damId', {
      rules: [
        { required: true, min: 4, message: '用户名至少为 4 个字符' },
        { validator: this.userExists },
      ],
      trigger: 'onBlur',
    });

    const nameProps = getFieldProps('userName', {
      rules: [
        { required: true, min: 2, message: '姓名至少为 2 个字符' },
        { validator: this.userExists },
      ],
      trigger: 'onBlur',
    });

    const passwordProps = getFieldProps('damPasswd', {
      rules: [
        { required: true, min: 6, message: '密码至少为 6 个字符' },
        { validator: this.userExists },
      ],
      trigger: 'onBlur',
    });

    const companyProps = getFieldProps('orgName', {
      rules: [
        { required: true, min: 4, message: '公司名称至少为 4 个字符' },
        { validator: this.userExists },
      ],
      trigger: 'onBlur',
    });

    const phoneProps = getFieldProps('tel', {
      rules: [
        { required: true, message: '手机号不正确' },
        { validator: this.userExists },
      ],
      trigger: 'onBlur',
    });

    const emailProps = getFieldProps('mail', {
      validate: [{
        rules: [
          { required: true, message: '邮箱为必填项' },
        ],
        trigger: 'onBlur',
      }, {
        rules: [
          { type: 'email', message: '请输入正确的邮箱地址' },
        ],
        trigger: ['onBlur', 'onChange'],
      }],
    });

    let productsOpts = [];

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 10 }
    };

    return (
        <Form horizontal className="ant-col-offset-5" onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label="用户名"
            hasFeedback
            required
            help={isFieldValidating('damId') ? '校验中...' : (getFieldError('damId') || []).join(', ')}
          >
            <Input {...accountProps} />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="密码"
            hasFeedback
            required
          >
            <Input type="password" {...passwordProps} />
          </FormItem>

          <FormItem
            label="是否是管理员"
            {...formItemLayout}
          >
            <Switch checkedChildren="是" unCheckedChildren="否" {...getFieldProps('isAdmin', { valuePropName: 'checked' })} />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="姓名"
            hasFeedback
            required
          >
            <Input {...nameProps} />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="手机"
            hasFeedback
            required
          >
            <Input {...phoneProps} type="tel" />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="公司名称"
            hasFeedback
            required
          >
            <Input {...companyProps} />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="邮箱"
            hasFeedback
            required
          >
            <Input {...emailProps} type="email" />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="产品选择"
          >
            <Select
              multiple
              placeholder="请选择产品"
            >
              {productsOpts}
            </Select>
          </FormItem>

          <FormItem wrapperCol={{ span: 8, offset: 4 }}>
            <Button type="primary" htmlType="submit">确定</Button><span className="gap-inline"></span><Button type="ghost" onClick={this.handleReset}>取消</Button>
          </FormItem>
        </Form>
    );
  }
}

CreateUser.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { products } = state;
  return {
    products
  };
}

export default connect(mapStateToProps)(CreateForm()(CreateUser));
