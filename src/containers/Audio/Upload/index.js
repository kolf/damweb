import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form, Select, Input, DatePicker, Switch, Radio, Cascader, Button, Row, Col, Upload, Icon, Tag, message} from 'antd';

const CreateForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

import { API_CONFIG } from '../../../config/api';
import { updateAudio } from '../../../actions/updateAudio';
require('../../../assets/images/audioThumb.gif');

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
    this.state= {
      fileList: [],
      attachList: [],
      audioId: '',
      thumbUrl: '../../../assets/images/audioThumb.gif'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){

  }

  handleSubmit(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    const { audioId} = this.state;

    if(!audioId){
      message.warning('请先上传文件');
      return false;
    }

    this.props.form.validateFields((errors) => {
      if (errors) {
        return false;
      }
      const creds = (this.props.form.getFieldsValue());
      Object.assign(creds, {
        id: audioId,
        tags: creds.tags.join(',')
      });
      dispatch(updateAudio(creds));
    });
  }

  render() {
    const { getFieldProps, setFieldsValue, getFieldValue } = this.props.form;

    const displayNameProps = getFieldProps('displayName', {
      rules: [
        { required: true, message: '请填写标题' }
      ],
      onChange:() =>{
        const {fileList} = this.state;
        fileList.forEach((item) => {
          if(item.selected){
            item.name=getFieldValue('displayName');
          }
        });
      }
    });

    const remarkProps = getFieldProps('remark', {
      rules: [
        { required: true, message: '请填写描述' }
      ],
      onChange:() =>{
        const {fileList} = this.state;
        fileList.forEach((item) => {
          if(item.selected){
            item.remark=getFieldValue('remark');
          }
        });
      }
    });

    const categoryProps = getFieldProps('category', {
      rules: [
        { required: true, message: '请选择分类' }
      ],
      onChange:() =>{
        const {fileList} = this.state;
        fileList.forEach((item) => {
          if(item.selected){
            item.category=getFieldValue('category');
          }
        });
      }
    });

    const tagsProps = getFieldProps('tags', {
      rules: [
        { required: true, message: '请选择标签', type: 'array' }
      ],
      onChange:() =>{
        const {fileList} = this.state;
        fileList.forEach((item) => {
          if(item.selected){
            item.tags=getFieldValue('tags');
          }
        });
      }
    });

    const authorProps = getFieldProps('author', {
      rules: [
        { required: true, message: '请填写作者' }
      ],
      onChange:() =>{
        const {fileList} = this.state;
        fileList.forEach((item) => {
          if(item.selected){
            item.author=getFieldValue('author');
          }
        });
      }
    });

    const licenseTypeProps = getFieldProps('license_type', {
      onChange:() =>{
        const {fileList} = this.state;
        fileList.forEach((item) => {
          if(item.selected){
            item.license_type=getFieldValue('license_type');
          }
        });
      }
    });

    const expireProps = getFieldProps('objrights_expire_years', {
      getValueFromEvent: (value, timeString) => timeString,
      onChange:() =>{
        const {fileList} = this.state;
        fileList.forEach((item) => {
          if(item.selected){
            item.objrights_expire_years=getFieldValue('objrights_expire_years');
          }
        });
      }
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
      action: API_CONFIG.baseUri + API_CONFIG.uploadAudio,
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
        this.state.fileList.forEach((item) => {
          if(item.selected){
            setFieldsValue({
              displayName: item.name,
              remark: item.remark,
              category: item.category,
              tags: item.tags,
              author: item.author,
              license_type: item.license_type,
            })
          }
        });

        this.setState({
          fileList: this.state.fileList,
          audioId: file.response.data.id,
          thumbUrl: file.thumbUrl
        })
      },
      onChange: ({file, fileList}) => {
        if(file.status === 'done'){
          if(file.response.data.assetType === 2){
            file.thumbUrl= file.response.data.ossid3
          }
          this.setState({
            fileList: fileList
          });
          message.success(`${file.name} 上传成功`);
        }else if(file.status === 'removed'){
          this.setState({
            fileList: fileList
          });
          message.success(`${file.name} 删除成功`);
        } else if(file.status === 'error') {
          message.error(`${file.name} 上传失败`);
        }
      }
    };

    const cpAttachProps = {
      action: API_CONFIG.baseUri + API_CONFIG.audioUploadAttach,
      accept:'application/*',
      disabled: this.state.audioId?false:true,
      handleChange(info) {
        let fileList = info.fileList;
        attachList = fileList.slice(-1);
        this.setState({ attachList });
      },
      data:{
        audioId: this.state.audioId
      },
      onChange: (file) => {
        console.log(file);
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
                <Col className="gutter-row upload-thumb upload-thumb-audio" span={6}>
                  <span style={{backgroundImage: 'url('+this.state.thumbUrl+')'}}></span>
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
                <Select placeholder="请选择音频分类" {...categoryProps}>
                  <Option value="1">流行</Option>
                  <Option value="2">古典</Option>
                  <Option value="3">欧美</Option>
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
                <RadioGroup size="default" {...licenseTypeProps}>
                  <RadioButton value="a">无</RadioButton>
                  <RadioButton value="b">自有</RadioButton>
                  <RadioButton value="c">第三方</RadioButton>
                </RadioGroup>
              </FormItem>

              <FormItem label="版权时效" {...formItemLayout}>
                <DatePicker placeholder="版权有效期" {...expireProps} />
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

const formOpts={
    mapPropsToFields: (props) =>{
      return props.fields
    },
    onFieldsChange: (props, fields) => {
      // console.log(this);
      // console.log(props)
    }
};

AudioUpload.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {fileList} = state;
  return {
    fileList
  };
}

export default connect(mapStateToProps)(CreateForm(formOpts)(AudioUpload));
