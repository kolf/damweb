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
  Checkbox,
  Tabs
} from 'antd';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router';
import './style.scss';
import {updateVideo} from '../../../actions/updateVideo';
import {getVideo} from '../../../actions/getVideo';
import {TAG} from '../../../config/tags';
import Video from 'react-html5video';
import CategorySelect from '../../../components/CategorySelect';

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
      checked: false,
      categoryId: ''
    }
  }

  componentDidMount() {
    const {dispatch, routeParams} = this.props;
    dispatch(getVideo({
      id: routeParams.id
    }))
  }

  handleSubmit(e) {
    e.preventDefault();
    const {dispatch, routeParams} = this.props;
    this.props.form.validateFields((errors) => {
      if (errors) {
        return false;
      }
      const creds = (this.props.form.getFieldsValue());
      const copyRightObj = {};

      if (creds.rightsType) {
        creds.rightsType.forEach((item) => {
          copyRightObj[item] = 1
        })
      }

      copyRightObj.licenseType = creds.licenseType;
      copyRightObj.copyright = creds.copyright;

      Object.assign(creds, {
        id: routeParams.id,
        tags: creds.tags.join(','),
        category: this.state.categoryId,
        copyRightObj,
        onlineStatus: this.state.checked == true ? 1 : 0
      });

      delete creds.rightsType;

      dispatch(updateVideo(creds, (msg) => {
        browserHistory.push(`/video/details/${routeParams.id}`);
      }));
    });
  }

  selectCategoryCallback(categoryId) {
    this.setState({
      categoryId: categoryId
    })
  }

  changeStatus(e) {
    let checked = !e.target.checked;
    this.setState({
      checked: checked
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const {video: {data}} = this.props;

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
                    <source src={data.ossId} type="video/mp4"/>
                  </Video>
                </div>
              </Col>
              <Col lg={{span: 8}}>
                <Form horizontal onSubmit={this.handleSubmit}>
                  <div className="ant-row ant-col-offset-6 pad-bottom">
                    <Button size="large" type="primary" htmlType="submit">保存编辑</Button>
                    <Button size="large" className="gap-left">下载视频</Button>
                  </div>
                  <Tabs type="card" animated={false}>
                    <TabPane tab="基本信息" key="Tab_1">
                      <FormItem {...formItemLayout} label="视频标题">
                        {getFieldDecorator('displayName', {
                          rules: [
                            {required: true, message: '请填写标题'}
                          ],
                          initialValue: data.displayName
                        })(
                          <Input placeholder="请输入标题" type="textarea"/>
                        )}
                      </FormItem>

                      <FormItem {...formItemLayout} label="视频说明">
                        {getFieldDecorator('remark', {
                          rules: [
                            {required: true, message: '请填写说明'}
                          ],
                          initialValue: data.remark
                        })(
                          <Input type="textarea"/>
                        )}
                      </FormItem>

                      <FormItem {...formItemLayout} label="资源分类">
                        <CategorySelect defaultValue={data.tags && data.tags.split(',')} onChange={this.selectCategoryCallback.bind(this)}/>
                      </FormItem>

                      <FormItem {...formItemLayout} label="VCG分类">
                        {data.vcgCategory && getFieldDecorator('vcgCategory', {
                          rules: [
                            {required: true, message: '请选择VCG分类'}
                          ],
                          initialValue: data.vcgCategory + ''
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
                        {data.tags && getFieldDecorator('tags', {
                          initialValue: data.tags.split(',')
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
                          ],
                          initialValue: data.keywords
                        })(
                          <Input/>)}
                      </FormItem>

                      <FormItem {...formItemLayout} label="作者">
                        {getFieldDecorator('author', {
                          rules: [
                            {required: true, message: '请添加关健字'}
                          ],
                          initialValue: data.author
                        })(<Input/>)}
                      </FormItem>

                      <FormItem {...formItemLayout} label="内容类别">
                        {getFieldDecorator('conType', {
                          rules: [
                            {required: true, message: '请选择内容类别'}
                          ],
                          initialValue: data.conType
                        })(
                          <Select placeholder="请选择" style={{width: '100%'}}>
                            {TAG.audio.con_type.map(item =>
                              <Option key={item.key}>{item.name}</Option>
                            )}
                          </Select>)}
                      </FormItem>

                      <FormItem {...formItemLayout} label="上传时间">
                        <p className="ant-form-text">{data.orginDate}</p>
                      </FormItem>
                    </TabPane>
                    <TabPane tab="版权信息" key="Tab_2">
                      <FormItem label="版权所属" {...formItemLayout}>
                        {getFieldDecorator('copyright', {
                          initialValue: data.copyright
                        })(
                          <RadioGroup size="default">
                            <RadioButton value="0">无</RadioButton>
                            <RadioButton value="1">自有</RadioButton>
                            <RadioButton value="2">第三方</RadioButton>
                          </RadioGroup>
                        )}
                      </FormItem>

                      <FormItem label="版权授权" {...formItemLayout}>
                        {getFieldDecorator('licenseType', {
                          initialValue: data.licenseType
                        })(
                          <RadioGroup size="default">
                            <RadioButton value="rm">RM</RadioButton>
                            <RadioButton value="rf">RF</RadioButton>
                            <RadioButton value="rr">RR</RadioButton>
                          </RadioGroup>
                        )}
                      </FormItem>

                      <FormItem label="授权类型" {...formItemLayout}>
                        {getFieldDecorator('rightsType', {
                          initialValue: data.rightsType
                        })(
                          <CheckboxGroup options={TAG.rightsType} size="default"/>
                        )}
                      </FormItem>

                      <FormItem {...formItemLayout} label="版权时效">
                        <p className="ant-form-text">2016-02-26 14:56:51</p>
                      </FormItem>

                      <FormItem {...formItemLayout} label="授权文件">
                        <p className="ant-form-text"><a href="">肖像权授权文件.pdf</a></p>
                      </FormItem>
                    </TabPane>
                  </Tabs>
                  <Col xs={{offset: 6}}>
                    <Checkbox checked={this.state.checked} onChange={this.changeStatus.bind(this)}>是否在展示平台显示资源</Checkbox>
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
  const {video} = state;
  return {
    video
  };
}

export default connect(mapStateToProps)(CreateForm()(VideoUpdate));
