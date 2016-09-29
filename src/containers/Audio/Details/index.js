import React, { Component, PropTypes } from 'react';
import { Form, Select, Input, DatePicker, Switch, Radio, Cascader, Button, Row, Col, Upload, Icon, Tag, Checkbox, Tabs} from 'antd';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import './style.scss';

const CreateForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;

const tags =[
  { key: 1, name: '娱乐' },
  { key: 2, name: '明星动态' },
  { key: 3, name: '春夏' }
];

class AudioDetails extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      color: 'colors'
    };
  }

  handleSubmit(e){
    e.preventDefault();
  }

  onChange(e){
    this.setState({
      color: e.target.value,
    });
  }

  render() {
    const { getFieldProps } = this.props.form;

    console.log(this);

    const addressProps = getFieldProps('address', {
      rules: [
        { required: true, min: 2, message: '拍摄地至少为 2 个字符' },
        { validator: this.userExists },
      ]
    });

    const avatarProps = getFieldProps('avatar', {
      rules: [
        { required: true, min: 2, message: '拍摄地至少为 2 个字符' },
        { validator: this.userExists },
      ]
    });

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    };

    return (
      <div>
        <div className="ant-layout-content">
          <Col xs={{offset: 0, span:24}} lg={{offset:3, span:18}}>
            <Row gutter={24}>
              <Col lg={{span: 16}}>
                <div className="edit-view">
                  <div className="edit-view-img" style={{backgroundImage:'url(./../../../assets/images/music.png)'}}>

                  </div>
                </div>
              </Col>
              <Col lg={{span: 8}}>
              <div className="ant-row ant-form-item ant-col-offset-6">
                <Button htmlType="submit" size="large" type="primary"><Link to={`/audio/update/${this.props.routeParams.id}`}>编辑音频</Link></Button>
                <Button size="large" className="gap-left">下载音频</Button>
              </div>
                <Tabs type="card">
                  <TabPane tab="基本信息" key="1">
                    <FormItem
                      {...formItemLayout}
                      label="音频标题"
                    >
                      <p className="ant-form-text">山水间</p>
                    </FormItem>

                    <FormItem
                      label="说明"
                      {...formItemLayout}
                    >
                      <p className="ant-form-text">音频说明</p>
                    </FormItem>

                    <FormItem
                      {...formItemLayout}
                      label="音频分类"
                    >
                      <Select disabled defaultValue="lucy"  style={{ width: '100%' }}>
                        <Option value="jack" selected>创意类</Option>
                        <Option value="lucy">编辑类</Option>
                      </Select>
                    </FormItem>

                    <FormItem
                      {...formItemLayout}
                      label="标签"
                    >
                      {tags.map(tag =>
                        <Tag key={tag.key}>
                          {tag.name}
                        </Tag>
                      )}
                    </FormItem>

                    <FormItem
                      {...formItemLayout}
                      label="上传时间"
                    >
                      <p className="ant-form-text">2016-02-26 14:56:51</p>
                    </FormItem>

                    <FormItem
                      {...formItemLayout}
                      label="发行者"
                    >
                      <p className="ant-form-text">publisher</p>
                    </FormItem>

                    <FormItem
                      {...formItemLayout}
                      label="内容类别"
                    >
                      <Select disabled defaultValue="b"  style={{ width: '100%' }}>
                        <Option value="music">音乐</Option>
                        <Option value="song">歌曲</Option>
                        <Option value="a">原创</Option>
                        <Option value="b">配音</Option>
                        <Option value="c">录音</Option>
                      </Select>
                    </FormItem>


                    <FormItem
                      {...formItemLayout}
                      label="风格"
                    >
                      <Select disabled defaultValue="h"  style={{ width: '100%' }}>
                        <Option value="jack" selected>摇滚</Option>
                        <Option value="a">乡村</Option>
                        <Option value="b">民谣</Option>
                        <Option value="c">流行</Option>
                        <Option value="d">电子乐</Option>
                        <Option value="e">HIP-POP</Option>
                        <Option value="f">说唱</Option>
                        <Option value="g">布鲁斯</Option>
                        <Option value="h">爵士</Option>
                      </Select>
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label="声音"
                    >
                      <Select disabled defaultValue="a"  style={{ width: '100%' }}>
                        <Option value="man">男声</Option>
                        <Option value="a">女声</Option>
                        <Option value="b">混合</Option>
                        <Option value="c">其他</Option>
                      </Select>
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label="语言："
                    >
                      <p className="ant-form-text">中文</p>
                    </FormItem>

                  </TabPane>
                  <TabPane tab="版权信息" key="2">
                    <FormItem
                      label="版权所属"
                      {...formItemLayout}
                    >
                      <RadioGroup defaultValue="a" disabled size="default">
                        <RadioButton value="a">无</RadioButton>
                        <RadioButton value="b">自有</RadioButton>
                        <RadioButton value="c">第三方</RadioButton>
                      </RadioGroup>
                    </FormItem>

                    <FormItem
                      label="版权授权"
                      {...formItemLayout}
                    >
                      <RadioGroup defaultValue="g" disabled size="default">
                        <RadioButton value="g">RM</RadioButton>
                        <RadioButton value="h">RF</RadioButton>
                      </RadioGroup>
                    </FormItem>

                    <FormItem
                      {...formItemLayout}
                      label="版权授权"
                      required
                      hasFeedback
                    >
                      <RadioGroup disabled onChange={this.onChange} value={this.state.color}>
                        <Radio value={'colors'}>肖像权</Radio>
                        <Radio value={'gray'}>物权</Radio>
                      </RadioGroup>
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label="上传时间"
                    >
                      <p className="ant-form-text">肖像权授权文件.pdf</p>
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label="版权时效"
                    >
                      <p className="ant-form-text">2016-02-26 14:56:51</p>
                    </FormItem>

                  </TabPane>
                </Tabs>
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
                    <li>指挥或导演: </li>
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
                <Col xs={{span: 6}}><ul className="list-v">
                  <li>作曲者: </li>
                  <li>氛围：</li>
                  <li>演奏器材：</li>
                  <li>音乐节拍：</li>
                </ul></Col>
                <Col xs={{span: 6}}><ul className="list-v">
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul></Col>
              </Row>
            </div>
          </Col>
        </div>
      </div>
    );
  }
}

AudioDetails.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps() {
  return {
  };
}

export default connect(mapStateToProps)(CreateForm()(AudioDetails));
