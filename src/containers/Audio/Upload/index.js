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

import { API_CONFIG } from '../../../config/api';
import { updateAudio } from '../../../actions/updateAudio';

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

class AudioUpload extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    const { cruFile } = this.state;

    console.log(cruFile);

    this.props.form.validateFields((errors) => {
      if (errors) {
        return false;
      }
      const creds = (this.props.form.getFieldsValue());
      dispatch(updateAudio(creds));
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
        { validator: this.fileExists },
      ]
    });

    const remarkProps = getFieldProps('remark', {
      rules: [
        { required: true, min: 2, message: '请填写描述' },
        { validator: this.fileExists },
      ]
    });
    const categoryProps = getFieldProps('category', {
      rules: [
        { required: true, message: '请选择分类' },
        { validator: this.fileExists },
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
        { validator: this.fileExists },
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
      action: API_CONFIG.baseUri + API_CONFIG.uploadAudio + '?token='+ token,
      listType: 'picture-card',
      accept:'audio/*',
      multiple: true,
      onPreview: (file) => {
        this.setState({
          priviewImage: file.url,
          priviewVisible: true,
        });
      },
      onSelect: (file) => {
        this.setState({
          cruFile: file.response.data
        })
      }
    };

    const cpAttachProps = {
      action: API_CONFIG.baseUri + API_CONFIG.uploadAudio + '?token='+ token,
      accept:'application/*',
      multiple: true
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
                <Col className="gutter-row upload-thumb upload-thumb-audio" span={6}>
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

              <FormItem label="作者" {...formItemLayout}>
                <Input {...authorProps}/>
              </FormItem>

              <FormItem {...formItemLayout} label="版权所属">
                <RadioGroup size="default" {...getFieldProps('license_type')}>
                  <RadioButton value="a">无</RadioButton>
                  <RadioButton value="b">自有</RadioButton>
                  <RadioButton value="c">第三方</RadioButton>
                </RadioGroup>
              </FormItem>

              <FormItem label="版权时效" {...formItemLayout}>
                <DatePicker placeholder="版权有效期" {...getFieldProps('objrights_expire_years')} />
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

AudioUpload.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps() {
  return {
  };
}

export default connect(mapStateToProps)(CreateForm()(AudioUpload));
