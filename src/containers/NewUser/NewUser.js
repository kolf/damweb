import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input, Checkbox } from 'antd';

import './NewUser.scss';

const createForm = Form.create;
const FormItem = Form.Item;

function noop() {
  return false;
}

class NewUser extends Component {
  constructor(props) {
    super(props);
  }

  handleReset(e) {
    e.preventDefault();
    this.props.form.resetFields();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      console.log('Submit!!!');
      console.log(values);
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
    const accountProps = getFieldProps('account', {
      rules: [
        { required: true, min: 4, message: '用户名至少为 4 个字符' },
        { validator: this.userExists },
      ],
    });

    const nameProps = getFieldProps('name', {
      rules: [
        { required: true, min: 2, message: '用户名至少为 2 个字符' },
        { validator: this.userExists },
      ],
    });

    const companyProps = getFieldProps('company', {
      rules: [
        { required: true, min: 4, message: '用户名至少为 4 个字符' },
        { validator: this.userExists },
      ],
    });

    const phoneProps = getFieldProps('phone', {
      rules: [
        { required: true, min: 4, message: '用户名至少为 4 个字符' },
        { validator: this.userExists },
      ],
    });

    const emailProps = getFieldProps('email', {
      validate: [{
        rules: [
          { required: true },
        ],
        trigger: 'onBlur',
      }, {
        rules: [
          { type: 'email', message: '请输入正确的邮箱地址' },
        ],
        trigger: ['onBlur', 'onChange'],
      }],
    });

    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 },
    };

    return (
        <Form horizontal form={this.props.form}>
          <FormItem
            {...formItemLayout}
            label="用户名"
            hasFeedback
            help={isFieldValidating('account') ? '校验中...' : (getFieldError('account') || []).join(', ')}
          >
            <Input {...accountProps} placeholder="实时校验，输入 JasonWood 看看" />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="姓名"
            hasFeedback
          >
            <Input {...nameProps} type="name" autoComplete="off"
              onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
            />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="手机"
            hasFeedback
          >
            <Input {...phoneProps} type="phone" autoComplete="off"
              onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
            />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="公司名称"
            hasFeedback
          >
            <Input {...companyProps} type="company" autoComplete="off"
              onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
            />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="邮箱"
            hasFeedback
          >
            <Input {...emailProps} type="email" placeholder="onBlur 与 onChange 相结合" />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="产品选择"
          >
            <Checkbox className="ant-checkbox-inline">产品一</Checkbox>
            <Checkbox className="ant-checkbox-inline">产品二</Checkbox>
            <Checkbox className="ant-checkbox-inline">产品三</Checkbox>
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

NewUser.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps() {
  return {
  };
}

export default connect(mapStateToProps)(createForm()(NewUser));
