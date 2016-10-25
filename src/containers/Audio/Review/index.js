import React, {Component, PropTypes} from 'react';
import {
  Form,
  Select,
  Input,
  Radio,
  Button,
  Row,
  Col,
  Message,
  Checkbox,
  Tabs
} from 'antd';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import './style.scss';
import {updateAudio, getAudio} from '../../../actions/audio';
import {review} from '../../../actions/review';
import {TAG} from '../../../config/tags';
import Video from 'react-html5video';

const CreateForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const TabPane = Tabs.TabPane;

class AudioReview extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const {dispatch, routeParams} = this.props;
    dispatch(getAudio({
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

      Object.assign(creds, {
        id:routeParams.id,
        tags: creds.tags.join(',')
      });
      dispatch(updateAudio(creds, (msg) => this.handleReview(5)));
    });
  }

  handleReview(resultType){
    const {dispatch, routeParams, audio: {data}} = this.props;

    dispatch(review({
      audioResult: resultType,
      resId: routeParams.id,
      resType: data.assetType
    }, () => {
      Message.success('审核成功！');
      setTimeout(() => browserHistory.push('/review'), 2000)
    }))
  }

  render() {
    const {getFieldProps} = this.props.form;
    const {audio: {data}} = this.props;

    const displayNameProps = getFieldProps('displayName', {
      rules: [
        {required: true, message: '请填写标题'}
      ],
      initialValue: data.displayName
    });

    const remarkProps = getFieldProps('remark', {
      rules: [
        {required: true, message: '请填写说明'}
      ],
      initialValue: data.remark
    });

    const audioTypeProps = getFieldProps('audioType', {
      rules: [
        {required: true, message: '请选择分类'}
      ],
      initialValue: data.audioType
    });

    const tagsProps = getFieldProps('tags', {
      rules: [
        {required: true, message: '请选择标签', type: 'array'}
      ],
      initialValue: data.tags && data.tags.split(',')
    });

    const authorProps = getFieldProps('author', {
      rules: [
        {required: true, message: '请填写作者'}
      ],
      initialValue: data.author
    });

    const setDisplayProps = getFieldProps('resStatus', {});

    const conTypeProps = getFieldProps('conType', {
      initialValue: data.conType
    });

    const descripProps = getFieldProps('descrip', {
      initialValue: data.descrip
    });

    const vocalProps = getFieldProps('vocal', {
      initialValue: data.vocal
    });

    const licenseTypeProps = getFieldProps('licenseType', {
      initialValue: data.licenseType
    });

    const copyrightProps = getFieldProps('copyright', {
      initialValue: data.copyright
    });

    const rightsTypeProps = getFieldProps('rightsType', {
      initialValue: data.rightsType
    });

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
                    <source
                      src="http://kmg.oss-cn-beijing.aliyuncs.com/dam/v/63ee8de8-4bd0-486d-9dfd-523ac2d4236a.mp4?Expires=1475559159&OSSAccessKeyId=LTAId4pMnCWmqJnP&Signature=eKU5lKEioKzDP/zRkO0sLZmamAc%3D"
                      type="video/webm"/>
                  </Video>
                </div>
              </Col>
              <Col lg={{span: 8}}>
                <Form horizontal onSubmit={this.handleSubmit}>
                  <div className="ant-row ant-col-offset-6 pad-bottom">
                    <Button size="large" type="primary" htmlType="submit">审核通过</Button>
                    <Button size="large" className="gap-left" onClick={this.handleReview.bind(this, 4)}>审核拒绝</Button>
                  </div>
                  <Tabs type="card">
                    <TabPane tab="基本信息" key="Tab_1">
                      <FormItem {...formItemLayout} label="音频标题">
                        <Input placeholder="请输入标题" type="textarea" {...displayNameProps}/>
                      </FormItem>

                      <FormItem {...formItemLayout} label="音频说明">
                        <Input type="textarea" {...remarkProps}/>
                      </FormItem>

                      <FormItem {...formItemLayout} label="音频分类">
                        <Select placeholder="请选择" style={{width: '100%'}} {...audioTypeProps}>
                          {TAG.audio.audio_type.map(item =>
                            <Option key={item.key}>{item.name}</Option>
                          )}
                        </Select>
                      </FormItem>

                      <FormItem {...formItemLayout} label="标签">
                        <Select tags placeholder="请添加标签" style={{width: '100%'}} {...tagsProps} >
                          {TAG.tags.map(item =>
                            <Option key={item.key}>{item.name}</Option>
                          )}
                        </Select>
                      </FormItem>

                      <FormItem {...formItemLayout} label="上传时间">
                        <p className="ant-form-text">2016-02-26 14:56:51</p>
                      </FormItem>

                      <FormItem {...formItemLayout} label="作者">
                        <Input {...authorProps}/>
                      </FormItem>

                      <FormItem {...formItemLayout} label="内容类别">
                        <Select placeholder="请选择" style={{width: '100%'}} {...conTypeProps}>
                          {TAG.audio.con_type.map(item =>
                            <Option key={item.key}>{item.name}</Option>
                          )}
                        </Select>
                      </FormItem>

                      <FormItem {...formItemLayout} label="风格">
                        <Select placeholder="请选择" style={{width: '100%'}} {...descripProps}>
                          {TAG.audio.descrip.map(item =>
                            <Option key={item.key}>{item.name}</Option>
                          )}
                        </Select>
                      </FormItem>

                      <FormItem {...formItemLayout} label="声音">
                        <Select placeholder="请选择" style={{width: '100%'}} {...vocalProps}>
                          {TAG.audio.vocal.map(item =>
                            <Option key={item.key}>{item.name}</Option>
                          )}
                        </Select>
                      </FormItem>
                    </TabPane>
                    <TabPane tab="版权信息" key="Tab_2">
                      <FormItem label="版权所属" {...formItemLayout}>
                        <RadioGroup size="default" {...copyrightProps}>
                          <RadioButton value="a">无</RadioButton>
                          <RadioButton value="b">自有</RadioButton>
                          <RadioButton value="c">第三方</RadioButton>
                        </RadioGroup>
                      </FormItem>

                      <FormItem label="版权授权" {...formItemLayout}>
                        <RadioGroup size="default" {...licenseTypeProps}>
                          <RadioButton value="rm">RM</RadioButton>
                          <RadioButton value="rf">RF</RadioButton>
                          <RadioButton value="rr">RR</RadioButton>
                        </RadioGroup>
                      </FormItem>

                      <FormItem label="授权类型" {...formItemLayout}>
                        <CheckboxGroup {...rightsTypeProps} options={TAG.rightsType} size="default"/>
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
                    <Checkbox {...setDisplayProps}>是否在展示平台显示资源</Checkbox>
                  </Col>
                </Form>
              </Col>
            </Row>
            <div className="edit-view-exif">
              <h4>音频信息</h4>
              <Row gutter={24}>
                <Col xs={{span: 6}}>
                  <ul className="list-v">
                    <li>发行时间: 2002</li>
                    <li>艺术家: 玖月奇迹</li>
                    <li>所属专辑: 中国美</li>
                    <li>指挥或导演:</li>
                  </ul>
                </Col>
                <Col xs={{span: 6}}>
                  <ul className="list-v">
                    <li>音频格式: mp3</li>
                    <li>音频时长: 00:04:41</li>
                    <li>文件大小: 4.30MB</li>
                    <li>比特率: 128kbps</li>
                  </ul>
                </Col>
                <Col xs={{span: 6}}>
                  <ul className="list-v">
                    <li>作曲者:</li>
                    <li>氛围：</li>
                    <li>演奏器材：</li>
                    <li>音乐节拍：</li>
                  </ul>
                </Col>
                <Col xs={{span: 6}}>
                  <ul className="list-v">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                </Col>
              </Row>
            </div>
          </Col>
        </div>
      </div>
    )
  }
}

AudioReview.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {audio} = state;
  return {
    audio
  };
}

export default connect(mapStateToProps)(CreateForm()(AudioReview));
