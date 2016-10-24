import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {
  Form,
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
  message,
  TreeSelect,
  Checkbox
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
import {queryCategory} from '../../../actions/category';
import CategorySelect from '../../../components/CategorySelect';
import defaultVideoThmmb from '../../../assets/images/shipin.png';
import cookie from 'js-cookie';

import './style.scss';

class VideoUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      attachList: [],
      attachId: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(queryCategory());
  }

  handleSubmit(e) {
    e.preventDefault();
    const {dispatch} = this.props;
    const {fileList} = this.state;

    if (!fileList.length) {
      message.warning('请先上传文件');
      return false;
    }

    this.props.form.validateFieldsAndScroll((errors) => {
      if (errors) {
        return false;
      }
      const creds = (this.props.form.getFieldsValue());

      const copyrightObj = {};

      if (creds.rightsType) {
        creds.rightsType.forEach((item) => {
          copyrightObj[item] = 1
        })
      }

      if(typeof creds.expireDate === 'object'){
        copyrightObj.expireDate = JSON.stringify(creds.expireDate).substr(1, 10)
      }

      copyrightObj.authType = creds.authType;
      copyrightObj.ownerType = creds.ownerType;

      delete creds.rightsType;

      Object.assign(creds, {
        id: this.state.attachId,
        tags: creds.tags.join(','),
        copyrightObj
      });

      dispatch(updateVideo(creds, () => message.success('资源入库成功！')));
    });
  }

  setValues(file) {
    const {setFieldsValue} = this.props.form;
    setFieldsValue({
      displayName: file.displayName,
      remark: file.remark,
      vcgCategory: file.vcgCategory || [],
      category: file.category || [],
      tags: file.tags || [],
      keywords: file.keywords,
      author: file.author,
      conType: file.conType || [],
      ownerType: file.ownerType,
      authType: file.authType,
      rightsType: file.rightsType,
      expireDate: file.expireDate,
    })
  }

  render() {
    const {getFieldDecorator, getFieldsValue} = this.props.form;
    const categoryData = this.props.categorys.data || [];

    const toTreeData = data => {
      return data.map((item) => {
        let obj = {
          value: item.code + '',
          label: item.name
        };
        if (item.childNode.length) {
          obj.children = toTreeData(item.childNode)
        }
        return obj;
      })
    };

    const formItemLayout = {
      labelCol: {span: 7},
      wrapperCol: {span: 17}
    };

    const uploadListProps = {
      action: API_CONFIG.baseUri + API_CONFIG.uploadVideo + '?token='+ cookie.get('token'),
      listType: 'picture-card',
      accept: 'video/*',
      multiple: true,
      onChange: ({file}) => {
        if (file.status === 'done') {
          const fileList = this.state.fileList.concat(file);
          this.setState({fileList});
          message.success(`${file.name} 上传成功`);
        } else if (file.status === 'removed') {
          const fileList = this.state.fileList.filter((item) => {
            return item.uid !== file.uid
          });
          this.setState({
            fileList
          });
          message.success(`${file.name} 删除成功`);
        } else if (file.status === 'error') {
          message.error(`${file.name} 上传失败`);
        }
      },
      onSelect: (file, prevFile) => {
        const creds = getFieldsValue();

        this.setState({
          attachId: file.response.data.id
        });

        this.state.fileList.forEach((item) => {
          if (item.uid === file.uid) {
            this.setValues(item.response.data);
          }
        });

        if (prevFile) {
          this.state.fileList.forEach((item) => {
            item.uid === prevFile.uid && Object.assign(item.response.data, creds);
          })
        }
      },
      onRemove: () => {
        console.log('remove')
      }
    };

    const cpAttachProps = {
      action: API_CONFIG.baseUri + API_CONFIG.videoUploadAttach + '?token='+ cookie.get('token'),
      accept: 'application/*',
      showUploadList: false,
      disabled: this.state.attachId ? false : true,
      handleChange(info) {
        let fileList = info.fileList;
        attachList = fileList.slice(-1);
        this.setState({attachList});
      },
      data: {
        videoId: this.state.attachId
      },
      onChange: ({file}) => {
        if (file.status === 'done') {
          message.success(`${file.name} 附件上传成功`);
        }
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
                  <Input placeholder="请填写标题" type="textarea"/>
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="视频说明">
                {getFieldDecorator('remark', {
                  rules: [
                    {required: true, message: '请填写说明'}
                  ]
                })(
                  <Input placeholder="请填写说明" type="textarea"/>
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="资源分类">
                {getFieldDecorator('category', {
                  rules: [
                    {required: true, message: '请选择资源分类'}
                  ]
                })(
                  <TreeSelect size="large" allowClear dropdownStyle={{maxHeight: 400, overflow: 'auto'}} treeData={toTreeData(categoryData)} placeholder="请选择" treeDefaultExpandAll/>
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
                    {required: true, message: '请添加标签', type: 'array'}
                  ]
                })(
                  <Select tags placeholder="请添加标签" style={{width: '100%'}}>
                    {TAG.tags.map(item =>
                      <Option value={item.key} key={item.key}>{item.name}</Option>
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
                  <Input placeholder="请添加关健字"/>)}
              </FormItem>
              <FormItem {...formItemLayout} label="作者">
                {getFieldDecorator('author', {
                  rules: [
                    {required: true, message: '请填写作者'}
                  ]
                })(<Input placeholder="请填写作者"/>)}
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
                {getFieldDecorator('ownerType', {})(
                  <RadioGroup size="default">
                    <RadioButton value="0">无</RadioButton>
                    <RadioButton value="1">自有</RadioButton>
                    <RadioButton value="2">第三方</RadioButton>
                  </RadioGroup>
                )}
              </FormItem>

              <FormItem label="版权授权" {...formItemLayout}>
                {getFieldDecorator('authType', {})(
                  <RadioGroup size="default">
                    <RadioButton value="1">RM</RadioButton>
                    <RadioButton value="2">RF</RadioButton>
                    <RadioButton value="3">RR</RadioButton>
                  </RadioGroup>
                )}
              </FormItem>

              <FormItem label="授权类型" {...formItemLayout}>
                {getFieldDecorator('rightsType', {})(
                  <CheckboxGroup options={TAG.rightsType} size="default"/>
                )}
              </FormItem>

              <FormItem label="版权时效" {...formItemLayout}>
                {getFieldDecorator('expireDate', {

                })(
                  <DatePicker />
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

function mapStateToProps(state) {
  const {categorys} = state;
  return {
    categorys
  };
}

export default connect(mapStateToProps)(CreateForm()(VideoUpload));
