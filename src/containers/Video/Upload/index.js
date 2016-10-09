import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form, Select, Input, DatePicker, Switch, Radio, Cascader, Button, Row, Col, Upload, Icon, Tag, message} from 'antd';

const CreateForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

import { API_CONFIG } from '../../../config/api';
import { updateVideo } from '../../../actions/updateVideo';
require('../../../assets/images/audioThumb.gif');

import './style.scss';
import Video from "react-h5-video";

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

class VideoUpload extends Component {
  constructor(props) {
    super(props);
    this.state= {
      fileList: [],
      attachList: [],
      videoId: '',
      thumbUrl: '../../../assets/images/audioThumb.gif'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){

  }

  handleSubmit(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    const { videoId} = this.state;

    if(!videoId){
      message.warning('请先上传文件');
      return false;
    }

    this.props.form.validateFields((errors) => {
      if (errors) {
        return false;
      }
      const creds = (this.props.form.getFieldsValue());
      Object.assign(creds, {
        id: videoId,
        tags: creds.tags.join(',')
      });
      dispatch(updateVideo(creds, () => message.success('资源入库成功！')));
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
      action: API_CONFIG.baseUri + API_CONFIG.uploadVideo,
      listType: 'picture-card',
      accept:'video/*',
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
            console.log(item);
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
          videoId: file.response.data.id
        })
      },
      onChange: ({file, fileList}) => {
        if(file.status === 'done'){
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
      action: API_CONFIG.baseUri + API_CONFIG.videoUploadAttach,
      accept:'application/*',
      disabled: this.state.videoId?false:true,
      handleChange(info) {
        let fileList = info.fileList;
        attachList = fileList.slice(-1);
        this.setState({ attachList });
      },
      data:{
        videoId: this.state.videoId
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
              <FormItem label="视频标题" {...formItemLayout}>
                <Input type="textarea" {...displayNameProps}/>
              </FormItem>

              <FormItem label="视频说明" {...formItemLayout}>
                <Input type="textarea" {...remarkProps}/>
              </FormItem>

              <FormItem label="视频分类" {...formItemLayout}>
                <Select placeholder="请选择视频分类" {...categoryProps}>
                  <Option value="1">流行</Option>
                  <Option value="2">古典</Option>
                  <Option value="3">欧美</Option>
                </Select>
              </FormItem>

              <FormItem label="视频标签" {...formItemLayout}>
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

VideoUpload.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps() {
  return {
  };
}

export default connect(mapStateToProps)(CreateForm()(VideoUpload));
