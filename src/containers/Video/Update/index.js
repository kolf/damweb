import React, {Component, PropTypes} from 'react';
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
  Message,
  TreeSelect,
  Tabs,
  Checkbox
} from 'antd';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router';
import './style.scss';
import {updateVideo} from '../../../actions/updateVideo';
import {getVideo} from '../../../actions/getVideo';
import {queryCategory} from '../../../actions/category';
import {TAG} from '../../../config/tags';
import {API_CONFIG} from '../../../config/api';
import Video from 'react-html5video';
import moment from 'moment';
import cookie from 'js-cookie';

const CreateForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const TabPane = Tabs.TabPane;

class VideoUpdate extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      id: this.props.routeParams.id
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(queryCategory());
    dispatch(getVideo({
      id: this.state.id
    }, (videoData) => {
      this.setValues(videoData)
    }))
  }

  handleSubmit(e) {
    e.preventDefault();
    const {dispatch} = this.props;
    this.props.form.validateFieldsAndScroll((errors) => {
      if (errors) {
        return false;
      }
      const creds = (this.props.form.getFieldsValue());

      const copyrightObj = {
        objRights: '0',
        portraitRights: '0',
      };

      if (creds.rightsType) {
        creds.rightsType.forEach((item) => {
          copyrightObj[item] = '1'
        })
      }

      if (typeof creds.expireDate === 'object') {
        copyrightObj.expireDate = JSON.stringify(creds.expireDate).substr(1, 10)
      }

      copyrightObj.authType = creds.authType;
      copyrightObj.ownerType = creds.ownerType;

      delete creds.rightsType;

      Object.assign(creds, {
        id: this.state.id,
        tags: creds.tags.join(','),
        copyrightObj
      });

      dispatch(updateVideo(creds, (res) => {
        Message.success(res.msg);
        setTimeout(() => browserHistory.push(`/video/details/${this.state.id}`))
      }));
    });
  }

  setValues(file) {
    const {setFieldsValue} = this.props.form;
    let rightsType = [];
    let expireDate = file.copyrightObj.expireDate? moment(file.copyrightObj.expireDate.substr(0, 10)) : '';

    if (file.copyrightObj.objRights === 1) rightsType.push(`objRights`);
    if (file.copyrightObj.portraitRights === 1) rightsType.push(`portraitRights`);

    setFieldsValue({
      displayName: file.displayName,
      remark: file.remark,
      vcgCategory: file.vcgCategory || [],
      category: file.category || [],
      tags: file.tags ? file.tags.split(',') : [],
      keywords: file.keywords,
      author: file.author,
      conType: file.conType || [],
      ownerType: file.copyrightObj.ownerType + '',
      authType: file.copyrightObj.authType + '',
      rightsType: rightsType,
      expireDate: expireDate,
    })
  }


  render() {
    const {getFieldDecorator} = this.props.form;
    const categoryData = this.props.categorys.data || [];
    const {video: {data}} = this.props;

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

    const cpAttachProps = {
      action: API_CONFIG.baseUri + API_CONFIG.videoUploadAttach + '?token='+ cookie.get('token'),
      accept: 'application/*',
      showUploadList: false,
      disabled: this.state.id ? false : true,
      handleChange(info) {
        let fileList = info.fileList;
        attachList = fileList.slice(-1);
        this.setState({attachList});
      },
      data: {
        videoId: this.state.id
      },
      onChange: (file) => {
        if (file.status === 'done') {
          message.success(`${file.name} 附件上传成功`);
        }
      }
    };

    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 18}
    };

    return (
      <div>
        <div className="ant-layout-content">
          <Col xs={{offset: 0, span: 24}} lg={{offset: 3, span: 18}}>
            <Row gutter={24}>
              <Col lg={{span: 16}}>
                <div className="edit-view">
                  <Video controls loop muted poster="../../../assets/images/music.png"
                         style={{width: '100%', height: '100%'}}>
                    <source src={data.ossidUrl} type="video/mp4"/>
                  </Video>
                </div>
              </Col>
              <Col lg={{span: 8}}>
                <Form horizontal onSubmit={this.handleSubmit}>
                  <div className="ant-row ant-col-offset-6 pad-bottom">
                    <Button size="large" type="primary" htmlType="submit">保存编辑</Button>
                    <Button size="large" className="gap-left"><a href={data.ossidUrl}>下载视频</a></Button>
                  </div>
                  <Tabs type="card" animated={false}>
                    <TabPane tab="基本信息" key="Tab_1">
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
                          <TreeSelect size="large" allowClear dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                                      treeData={toTreeData(categoryData)} placeholder="请选择" treeDefaultExpandAll/>
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


                    </TabPane>
                    <TabPane tab="版权信息" key="Tab_2">
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
                        {getFieldDecorator('expireDate', {})(
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
                    </TabPane>
                  </Tabs>
                  <Col xs={{offset: 6}}>
                    {getFieldDecorator('agreement', {initialValue: false, valuePropName: 'checked'})(
                      <Checkbox>是否在展示平台显示资源</Checkbox>
                    )}
                  </Col>
                </Form>
              </Col>
            </Row>
            <div className="edit-view-exif">
              <h4>视频信息</h4>
              <Row gutter={24}>
                <Col xs={{span: 6}}>
                  <ul className="list-v">
                    <li>时长: {data.length}</li>
                    <li>大小: {data.size}</li>
                  </ul>
                </Col>
                <Col xs={{span: 6}}>
                  <ul className="list-v">
                    <li>比特率: {data.bps}</li>
                  </ul>
                </Col>
                <Col xs={{span: 6}}>
                  <ul className="list-v">
                    <li>每秒帧数: {data.fps}</li>
                  </ul>
                </Col>
                <Col xs={{span: 6}}>
                  <ul className="list-v">
                    <li>像素比例: {data.pixPropotion}</li>
                  </ul>
                </Col>
              </Row>
            </div>
          </Col>
        </div>
      </div>
    );
  }
}

VideoUpdate.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {video, categorys} = state;
  return {
    video,
    categorys
  };
}

export default connect(mapStateToProps)(CreateForm()(VideoUpdate));
