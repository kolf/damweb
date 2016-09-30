/**
 * Created by lirui on 2016/9/30.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input, Select, Switch } from 'antd';
import { createUser } from './../../actions/users';
import { queryProducts } from './../../actions/products';
import { authuser } from './../../actions/authuser';
import { listOrgRoles } from './../../actions/roles';


import './CreateUser.scss';

const CreateForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;

import { Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;

class AuthUser extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("handle-submit.");
    const creds = (this.props.form.getFieldsValue());
    console.log(creds);
    const { dispatch } = this.props;

    console.log(creds.sele);

    Object.assign(creds, {
      sele: ''+ creds.sele
    });

    dispatch(authuser(creds));
  }

  onChange()  {

  }

  handleReset(e) {
    e.preventDefault();
    this.props.form.resetFields();
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(listOrgRoles());
  }


  render() {

    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
    const { roles } = this.props.state;
    const plainOptions = [];

    roles.data.forEach((item) => {
      plainOptions.push({
        label: item.roleName,
        value: item.id
      })
    });

    console.log(plainOptions);

    const accountProps = getFieldProps('damId', {
      initialValue:this.props.routeParams.id ,
      trigger: 'onBlur',
    });


    const roleProps = getFieldProps('sele', {
    });

      const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 10 }
      };


      return (
        <Form horizontal className="ant-col-offset-5" onSubmit={this.handleSubmit}>
            <FormItem
              {...formItemLayout}
              label="用户"
              value={this.props.routeParams.damId}
              hasFeedback
            >
            <Input {...accountProps} />
            </FormItem>

            <FormItem
                {...formItemLayout}
                label="备选角色"
                hasFeedback
                >
            <CheckboxGroup options={plainOptions}  onChange={this.onChange} {...getFieldProps('sele')} />
      </FormItem>


          <FormItem wrapperCol={{ span: 8, offset: 4 }}>
              <Button type="primary" htmlType="submit">确定</Button><span className="gap-inline"></span><Button type="ghost" onClick={this.handleReset}>取消</Button>
          </FormItem>

        </Form>
      );
  }

}



AuthUser.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};


function mapStateToProps(state) {
  const { roles } = state;
  return {
    state
  };
}


export default connect(mapStateToProps)(CreateForm()(AuthUser));
