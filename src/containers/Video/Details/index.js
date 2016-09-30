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
import {getVideo} from '../../../actions/getVideo';
import {TAG} from '../../../config/tags';
import Video from 'react-html5video';

const CreateForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const TabPane = Tabs.TabPane;
class VideoDetails extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {dispatch, routeParams} = this.props;
    dispatch(getVideo({
      id: routeParams.id
    }))
  }

  render() {
    const {getFieldProps} = this.props.form;
    const {video: {data}} = this.props;
    const tagsProps = getFieldProps('tags', {
      //initialValue: data.tags.split(',')
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
                  <Video controls loop muted poster="../../../assets/images/music.png" style={{width: '100%', height: '100%'}}>
                    <source src={data.ossId} type="video/mp4"/>
                  </Video>
                </div>
              </Col>
              <Col lg={{span: 8}}>
                <div className="ant-row ant-form-item ant-col-offset-6">
                  <Button htmlType="submit" size="large" type="primary"><Link
                    to={`/video/update/${this.props.routeParams.id}`}>编辑视频</Link></Button>
                  <Button size="large" className="gap-left">下载视频</Button>
                </div>
                <Tabs type="card">
                  <TabPane tab="基本信息" key="tab_1">
                    <FormItem {...formItemLayout} label="视频标题">
                      <p className="ant-form-text">{data.displayName}</p>
                    </FormItem>

                    <FormItem label="说明" {...formItemLayout}>
                      <p className="ant-form-text">{data.remark}</p>
                    </FormItem>

                    <FormItem {...formItemLayout} label="视频分类">
                      <p className="ant-form-text">
                        {data.videoType && TAG.audio.audio_type.find(item =>
                          item.key = data.videoType
                        ).name}
                      </p>
                    </FormItem>

                    <FormItem {...formItemLayout} label="标签">
                      <Select disabled tags placeholder="请添加标签" style={{width: '100%'}} {...tagsProps} >
                        {TAG.tags.map(item =>
                          <Option key={item.key}>{item.name}</Option>
                        )}
                      </Select>
                    </FormItem>

                    <FormItem {...formItemLayout} label="上传时间">
                      <p className="ant-form-text">{data.uploadTime}</p>
                    </FormItem>

                    <FormItem {...formItemLayout} label="作者">
                      <p className="ant-form-text">{data.author}</p>
                    </FormItem>

                    <FormItem {...formItemLayout} label="内容类别">
                      <p className="ant-form-text">
                        {data.conType && TAG.audio.con_type.find(item =>
                          item.key = data.conType
                        ).name}
                      </p>
                    </FormItem>


                    <FormItem {...formItemLayout} label="风格">
                      <p className="ant-form-text">
                        {data.descrip && TAG.audio.descrip.find(item =>
                          item.key = data.descrip
                        ).name}
                      </p>
                    </FormItem>
                    <FormItem {...formItemLayout} label="视频">
                      <p className="ant-form-text">
                        {data.vocal && TAG.audio.vocal.find(item =>
                          item.key = data.vocal
                        ).name}
                      </p>
                    </FormItem>

                  </TabPane>
                  <TabPane tab="版权信息" key="2">
                    <FormItem label="版权所属" {...formItemLayout} >
                      <RadioGroup defaultValue="a" disabled size="default">
                        <RadioButton value="a">无</RadioButton>
                        <RadioButton value="b">自有</RadioButton>
                        <RadioButton value="c">第三方</RadioButton>
                      </RadioGroup>
                    </FormItem>

                    <FormItem label="版权授权" {...formItemLayout} >
                      <RadioGroup defaultValue="g" disabled size="default">
                        <RadioButton value="g">RM</RadioButton>
                        <RadioButton value="h">RF</RadioButton>
                      </RadioGroup>
                    </FormItem>

                    <FormItem label="授权类型" {...formItemLayout}>
                      <CheckboxGroup options={TAG.rightsType} size="default"/>
                    </FormItem>

                    <FormItem {...formItemLayout} label="上传时间">
                      <p className="ant-form-text"><a href="">肖像权授权文件.pdf</a></p>
                    </FormItem>

                    <FormItem {...formItemLayout} label="版权时效">
                      <p className="ant-form-text">2016-02-26 14:56:51</p>
                    </FormItem>

                  </TabPane>
                </Tabs>
              </Col>
            </Row>
            <div className="edit-view-exif">
              <h4>视频信息</h4>
              <Row gutter={24}>
                <Col xs={{span: 6}}>
                  <ul className="list-v">
                    <li>每秒帧数: 25</li>
                    <li>像素比例: 16:9</li>
                    <li>比特率: 128kbps</li>
                    <li>文件大小: 4.30MB</li>
                  </ul>
                </Col>
                <Col xs={{span: 6}}>
                  <ul className="list-v">
                    <li>视频格式: mp4</li>
                    <li>镜头长度: 00:04:41</li>
                    <li>时长: 00:04:41</li>
                    <li>彩色或黑白: 彩色</li>
                  </ul>
                </Col>
                <Col xs={{span: 6}}>
                  <ul className="list-v">
                    <li>发行者：</li>
                    <li>发行日期: 2016-01-01</li>
                    <li>拍摄时间: 2016-01-01</li>
                    <li>母带存储：</li>

                  </ul>
                </Col>
                <Col xs={{span: 6}}>
                  <ul className="list-v">
                    <li>清晰度：</li>
                    <li>镜头编号:</li>
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

VideoDetails.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {video} = state
  return {
    video
  };
}

export default connect(mapStateToProps)(CreateForm()(VideoDetails));
