import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form, Select, Input, DatePicker, Switch, Radio, Cascader, Button, Row, Col, Upload, Icon, Tag} from 'antd';
import cookie from 'js-cookie';

const CreateForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const token = cookie.get('token');


import {API_CONFIG} from '../../../config/api';
import { updateImage } from '../../../actions/updateImage';

import './style.scss';

const areaData = [{
  value: 'shanghai',
  label: '中国',
  children: [{
    value: 'shanghaishi',
    label: '上海市',
    children: [{
      value: 'pudongxinqu',
      label: '浦东新区',
    }]
  }],
}];

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    this.props.form.validateFields((errors) => {
      if (errors) {
        return false;
      }
      const creds = (this.props.form.getFieldsValue());
      dispatch(updateImage(creds));
    });
  }

  normFile(e) {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  render() {
    const { getFieldProps } = this.props.form;

    const displayNameProps = getFieldProps('displayName', {
      rules: [
        { required: true, min: 2, message: '请填写标题' },
        { validator: this.userExists },
      ]
    });

    const remarkProps = getFieldProps('remark', {
      rules: [
        { required: true, min: 2, message: '请填写描述' },
        { validator: this.userExists },
      ]
    });
    const categoryProps = getFieldProps('category', {
      rules: [
        { required: true, message: '请选择分类' },
        { validator: this.userExists },
      ],
      initialValue: 'jack'
  });
    const tagsProps = getFieldProps('tags', {
      rules: [
        { required: true, message: '请选择标签', type: 'array' }
      ]
    });
    const authorProps = getFieldProps('author', {
      rules: [
        { required: true, min: 2, message: '请填写作者' },
        { validator: this.userExists },
      ]
    });

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    };

    const thumbItemLayout = {
      xs: { span: 6 },
      lg: { span: 4 }
    };

    const uploadListProps = {
      action: API_CONFIG.baseUri + API_CONFIG.uploadImg + '?token='+ token,
      listType: 'picture-card',
      accept:'image/*',
      multiple: true,
      onPreview: (file) => {
        this.setState({
          priviewImage: file.url,
          priviewVisible: true,
        });
      },
      onSelect: (file) => {
        console.log(file)
      }
    };

    const cpAttachProps = {
      action: API_CONFIG.baseUri + API_CONFIG.uploadAudio + '?token='+ token,
      accept:'application/*',
      multiple: true,
      onPreview: (file) => {
        this.setState({
          priviewImage: file.url,
          priviewVisible: true,
        });
      },
      onSelect: (file) => {
        console.log(file)
      }
    };

    return (
      <div className="ant-layout-content">
      <div className="upload-container">
        <div className="upload-main">
          <div className="upload-thumbs">
            <Upload className="upload-list-btn" {...uploadListProps}>
              <Icon type="plus" />
              <div className="ant-upload-text">点击上传</div>
            </Upload>
          </div>
        </div>
        <div className="upload-sidebar">
          <Form horizontal onSubmit={this.handleSubmit} >
            <Row>
              <Col className="gutter-row upload-thumb" span={6}>
                <span></span>
              </Col>
              <Col className="gutter-row" span={18}>
                  <FormItem>
                    <Input placeholder="请输入标题" type="textarea" {...displayNameProps}/>
                  </FormItem>
              </Col>
            </Row>

              <FormItem label="音频说明" {...formItemLayout}>
                <Input type="textarea" {...remarkProps}/>
              </FormItem>

              <FormItem label="音频分类" {...formItemLayout}>
                <Select {...categoryProps}>
                  <Option value="jack">jack</Option>
                  <Option value="lucy">lucy</Option>
                  <Option value="yiminghe">yiminghe</Option>
                </Select>
              </FormItem>

              <FormItem label="音频标签" {...formItemLayout}>
                <Select tags placeholder="请添加标签"  {...tagsProps}>
                  <Option value="1">风景</Option>
                </Select>
              </FormItem>

            <FormItem
              {...formItemLayout}
              label="作者"
              required
              hasFeedback
            >
              <Input {...avatarProps}/>
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="拍摄城市"
              required
              hasFeedback
            >
              <Cascader options={areaData} {...getFieldProps('area')} />
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="拍摄地"
              required
              hasFeedback
            >
              <Input {...addressProps}/>
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="版权所属"
            >
              <RadioGroup size="default" {...getFieldProps('rg')}>
                <RadioButton value="a">无</RadioButton>
                <RadioButton value="b">自有</RadioButton>
                <RadioButton value="c">第三方</RadioButton>
              </RadioGroup>
            </FormItem>

            <FormItem
              label="版权类型"
              {...formItemLayout}
            >
              <RadioGroup size="default" {...getFieldProps('rg')}>
                <RadioButton value="d">RM</RadioButton>
                <RadioButton value="f">RF</RadioButton>
              </RadioGroup>
            </FormItem>

            <FormItem
              label="版权时效"
              {...formItemLayout}
            >
              <Col span="11">
                <FormItem>
                  <DatePicker placeholder="起始日期" {...getFieldProps('startDate')} />
                </FormItem>
              </Col>
              <Col span="2">
                <p className="ant-form-split">-</p>
              </Col>
              <Col span="11">
                <FormItem>
                  <DatePicker placeholder="结束日期" {...getFieldProps('endDate')} />
                </FormItem>
              </Col>
            </FormItem>

              <FormItem label="授权文件" {...formItemLayout}>
                <Upload {...cpAttachProps}>
                  <Button type="ghost" size="large">
                    <Icon type="upload" /> 点击上传
                  </Button>
                </Upload>
              </FormItem>

            <FormItem>
              <Button className="btn-block" type="primary" htmlType="submit">资源入库</Button>
            </FormItem>
          </Form>
        </div>
      </div>
        </div>
    );
  }
}

ImageUpload.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps() {
  return {
  };
}

export default connect(mapStateToProps)(CreateForm()(ImageUpload));
