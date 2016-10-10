/**
 * Created by lirui on 2016/9/29.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Button, Form, Input, Select, Switch} from 'antd';
import {createUser} from './../../actions/users';
import {queryProducts} from './../../actions/products';
import {createRole} from './../../actions/roles';

const CreateForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;


class CreateRole extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }


  handleSubmit(e) {
    e.preventDefault();
    const {dispatch} = this.props;


    const creds = (this.props.form.getFieldsValue());
    dispatch(createRole(creds));
  }

  handleReset(e) {
    console.log("reset");
    e.preventDefault();
    this.props.form.resetFields();
  }


  render() {

    const {getFieldProps, getFieldError, isFieldValidating} = this.props.form;

    const accountProps = getFieldProps('roleName', {
      rules: [
        {required: true, min: 2, message: '角色名至少为 2个字符'},
      ],
      trigger: 'onBlur',
    });


    const passwordProps = getFieldProps('roleCode', {
      rules: [
        {required: true, min: 4, message: '角色代码至少为 4个字符'},
      ],
      trigger: 'onBlur',
    });


    const phoneProps = getFieldProps('remark', {
      rules: [
        {required: false},
      ],
      trigger: 'onBlur',
    });


    const formItemLayout = {
      labelCol: {span: 4},
      wrapperCol: {span: 10}
    };

    return (
      <div>
        <div className="ant-layout-content">
          <Form horizontal className="ant-col-offset-5" onSubmit={this.handleSubmit}>
            <FormItem
              {...formItemLayout}
              label="角色名"
              hasFeedback
              required
            >
              <Input {...accountProps} />
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="角色代码"
              hasFeedback
              required
            >
              <Input  {...passwordProps} />
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="角色说明"
              hasFeedback
              required
            >
              <Input {...phoneProps}  />
            </FormItem>

            <FormItem wrapperCol={{span: 8, offset: 4}}>
              <Button type="primary" htmlType="submit">确定</Button><Button
              type="ghost" className="gap-left" onClick={this.handleReset}>重置</Button>
            </FormItem>

          </Form>
        </div>
      </div>
    );
  }

}

CreateRole.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};


function mapStateToProps(state) {
}


export default connect(mapStateToProps)(CreateForm()(CreateRole));
