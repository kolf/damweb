import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Form, Select, Input, Message, Button} from 'antd';
import {browserHistory} from 'react-router';

const CreateForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;

import {updateImageGroup} from '../../../actions/updateImageGroup';

class ImageGroupFrom extends Component {
  constructor(props) {
    super(props);
  };

  handleSubmit(e) {
    e.preventDefault();
    const {dispatch, form, data} = this.props;

    let imgIds = [];

    console.log(this.props);

    data.forEach((item) => {
      item.response.data && imgIds.push(item.response.data.id);
    });

    form.validateFields((errors) => {
      if (errors) {
        return false;
      }
      const creds = (form.getFieldsValue());

      Object.assign(creds, {
        tags: creds.tags.join(','),
        imgIds: imgIds.join(',')
      });
      dispatch(updateImageGroup(creds, (msg)=> {
        Message.success('组照入库成功！');
        setTimeout(() => {
          browserHistory.push(`/review`);
        }, 2000)
      }));
    });
  };

  render() {
    const {getFieldProps} = this.props.form;

    const imgGroupTitleProps = getFieldProps('title', {
      rules: [
        {required: true, message: '请填写组照标题'}
      ]
    });

    const imgGroupDescProps = getFieldProps('caption', {
      rules: [
        {required: true, message: '请填写组照描述'}
      ]
    });

    const imgGroupTagsProps = getFieldProps('tags', {
      rules: [
        {required: true, message: '请选择组照标签', type: 'array'}
      ]
    });

    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 18}
    };

    return <div>
      <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
        <FormItem {...formItemLayout} label="组照标题">
          <Input {...imgGroupTitleProps}/>
        </FormItem>
        <FormItem {...formItemLayout} label="组照说明">
          <Input type="textarea" {...imgGroupDescProps}/>
        </FormItem>

        <FormItem {...formItemLayout} label="组照标签">
          <Select tags placeholder="请添加标签" {...imgGroupTagsProps}>
            <Option key="P1">风景</Option>
          </Select>
        </FormItem>
        <Button className="btn-block" size="large" type="primary" htmlType="submit">资源入库</Button>
      </Form>
    </div>;
  }
}

ImageGroupFrom.propTypes = {};

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(CreateForm()(ImageGroupFrom));
