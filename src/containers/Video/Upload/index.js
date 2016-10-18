import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {
  Form,
  Checkbox,
  Select,
  Input,
  DatePicker,
  Switch,
  Radio,
  Cascader,
  Button,
  Row,
  Col,
  Upload,
  Icon,
  Tag,
  message
} from 'antd';

const CreateForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

import {TAG} from '../../../config/tags';
import {API_CONFIG} from '../../../config/api';
import {updateVideo} from '../../../actions/updateVideo';
import CategorySelect from '../../../components/CategorySelect';

import './style.scss';

class VideoUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      attachList: [],
      videoId: '',
      thumbUrl: '../../../assets/images/audioThumb.gif'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {

  }

  handleSubmit(e) {
    e.preventDefault();
    const {dispatch} = this.props;
    const {videoId} = this.state;

    if (!videoId) {
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

  selectCategoryCallback(categoryId) {
    this.setState({
      categoryId: categoryId
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form;

    // const displayNameProps = getFieldProps('displayName', {
    //   rules: [
    //     { required: true, message: '请填写标题' }
    //   ],
    //   onChange:() =>{
    //     const {fileList} = this.state;
    //     fileList.forEach((item) => {
    //       if(item.selected){
    //         item.name=getFieldValue('displayName');
    //       }
    //     });
    //   }
    // });
    //
    // const remarkProps = getFieldProps('remark', {
    //   rules: [
    //     { required: true, message: '请填写描述' }
    //   ],
    //   onChange:() =>{
    //     const {fileList} = this.state;
    //     fileList.forEach((item) => {
    //       if(item.selected){
    //         item.remark=getFieldValue('remark');
    //       }
    //     });
    //   }
    // });
    // const categoryProps = getFieldProps('category', {
    //   rules: [
    //     { required: true, message: '请选择分类' }
    //   ],
    //   onChange:() =>{
    //     const {fileList} = this.state;
    //     fileList.forEach((item) => {
    //       if(item.selected){
    //         item.category=getFieldValue('category');
    //       }
    //     });
    //   }
    // });
    //
    // const tagsProps = getFieldProps('tags', {
    //   rules: [
    //     { required: true, message: '请选择标签', type: 'array' }
    //   ],
    //   onChange:() =>{
    //     const {fileList} = this.state;
    //     fileList.forEach((item) => {
    //       if(item.selected){
    //         item.tags=getFieldValue('tags');
    //       }
    //     });
    //   }
    // });
    // const authorProps = getFieldProps('author', {
    //   rules: [
    //     { required: true, message: '请填写作者' }
    //   ],
    //   onChange:() =>{
    //     const {fileList} = this.state;
    //     fileList.forEach((item) => {
    //       if(item.selected){
    //         item.author=getFieldValue('author');
    //       }
    //     });
    //   }
    // });
    //
    // const licenseTypeProps = getFieldProps('license_type', {
    //   onChange:() =>{
    //     const {fileList} = this.state;
    //     fileList.forEach((item) => {
    //       if(item.selected){
    //         item.license_type=getFieldValue('license_type');
    //       }
    //     });
    //   }
    // });
    //
    // const expireProps = getFieldProps('objrights_expire_years', {
    //   getValueFromEvent: (value, timeString) => timeString,
    //   onChange:() =>{
    //     const {fileList} = this.state;
    //     fileList.forEach((item) => {
    //       if(item.selected){
    //         item.objrights_expire_years=getFieldValue('objrights_expire_years');
    //       }
    //     });
    //   }
    // });

    const formItemLayout = {
      labelCol: {span: 7},
      wrapperCol: {span: 17}
    };

    const thumbItemLayout = {
      xs: {span: 6},
      lg: {span: 4}
    };

    const uploadListProps = {
      action: API_CONFIG.baseUri + API_CONFIG.uploadVideo,
      listType: 'picture-card',
      accept: 'video/*',
      multiple: true,
      onPreview: (file) => {
        this.setState({
          priviewImage: file.url,
          priviewVisible: true,
        });
      },
      onSelect: (file) => {
        this.state.fileList.forEach((item) => {
          if (item.selected) {
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
        if (file.status === 'done') {
          this.setState({
            fileList: fileList
          });
          message.success(`${file.name} 上传成功`);
          file.thumbUrl = this.state.thumbUrl
        } else if (file.status === 'removed') {
          this.setState({
            fileList: fileList
          });
          message.success(`${file.name} 删除成功`);
        } else if (file.status === 'error') {
          message.error(`${file.name} 上传失败`);
        }
      }
    };

    const cpAttachProps = {
      action: API_CONFIG.baseUri + API_CONFIG.videoUploadAttach,
      accept: 'application/*',
      disabled: this.state.videoId ? false : true,
      handleChange(info) {
        let fileList = info.fileList;
        attachList = fileList.slice(-1);
        this.setState({attachList});
      },
      data: {
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
                <Icon type="plus"/>
                <div className="ant-upload-text">点击上传</div>
              </Upload>
            </div>
          </div>
          <div className="upload-sidebar">
            <Form horizontal onSubmit={this.handleSubmit}>
              <FormItem {...formItemLayout} label="视频标题">
                {getFieldDecorator('displayName', {
                  rules: [
                    {required: true, message: '请填写标题'}
                  ]
                })(
                  <Input placeholder="请输入标题" type="textarea"/>
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="视频说明">
                {getFieldDecorator('remark', {
                  rules: [
                    {required: true, message: '请填写说明'}
                  ]
                })(
                  <Input type="textarea"/>
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="资源分类">
                {getFieldDecorator('vcgCategory', {
                  rules: [
                    {required: true, message: '请选择VCG分类'}
                  ]
                })(
                  <CategorySelect onChange={this.selectCategoryCallback.bind(this)}/>
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="VCG分类">
                {getFieldDecorator('vcgCategory', {
                  rules: [
                    {required: true, message: '请选择VCG分类'}
                  ]
                })(
                  <Select placeholder="请选择" style={{width: '100%'}}>
                    {TAG.audio.audio_type.map(item =>
                      <Option key={item.key}>{item.name}</Option>
                    )}
                  </Select>
                )}
                <div className="ant-form-explain">(全局分类)</div>
              </FormItem>

              <FormItem {...formItemLayout} label="标签">
                {getFieldDecorator('tags', {
                  rules: [
                    {required: true, message: '请添加标签'}
                  ]
                })(
                  <Select tags placeholder="请添加标签" style={{width: '100%'}}>
                    {TAG.tags.map(item =>
                      <Option key={item.key}>{item.name}</Option>
                    )}
                  </Select>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="关健字">
                {getFieldDecorator('keywords', {
                  rules: [
                    {required: true, message: '请添加关健字'}
                  ]
                })(
                  <Input/>)}
              </FormItem>
              <FormItem {...formItemLayout} label="作者">
                {getFieldDecorator('author', {
                  rules: [
                    {required: true, message: '请添加关健字'}
                  ]
                })(<Input/>)}
              </FormItem>
              <FormItem {...formItemLayout} label="内容类别">
                {getFieldDecorator('conType', {
                  rules: [
                    {required: true, message: '请选择内容类别'}
                  ]
                })(
                  <Select placeholder="请选择" style={{width: '100%'}}>
                    {TAG.audio.con_type.map(item =>
                      <Option key={item.key}>{item.name}</Option>
                    )}
                  </Select>)}
              </FormItem>


              <FormItem label="版权所属" {...formItemLayout}>
                {getFieldDecorator('copyright', {})(
                  <RadioGroup size="default">
                    <RadioButton value="0">无</RadioButton>
                    <RadioButton value="1">自有</RadioButton>
                    <RadioButton value="2">第三方</RadioButton>
                  </RadioGroup>
                )}
              </FormItem>

              <FormItem label="版权授权" {...formItemLayout}>
                {getFieldDecorator('licenseType', {})(
                  <RadioGroup size="default">
                    <RadioButton value="rm">RM</RadioButton>
                    <RadioButton value="rf">RF</RadioButton>
                    <RadioButton value="rr">RR</RadioButton>
                  </RadioGroup>
                )}
              </FormItem>

              <FormItem label="授权类型" {...formItemLayout}>
                {getFieldDecorator('rightsType', {})(
                  <CheckboxGroup options={TAG.rightsType} size="default"/>
                )}
              </FormItem>
              <FormItem label="授权文件" {...formItemLayout}>
                <Upload {...cpAttachProps}>
                  <Button type="ghost" size="large">
                    <Icon type="upload"/> 点击上传
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
  return {};
}

export default connect(mapStateToProps)(CreateForm()(VideoUpload));
