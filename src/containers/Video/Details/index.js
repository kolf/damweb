import React, { Component, PropTypes } from 'react';
import { Form, Select, Input, DatePicker, Switch, Radio, Cascader, Button, Row, Col, Upload, Icon, Tag, Checkbox, Tabs} from 'antd';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

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


class DetailsImage extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      color: 'colors'
    }

    console.log(this.state)
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
                  <video id="video1"    controls="controls" width={640} height={400} autoPlay="autoPlay">
                    <source src="http://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_480p_h264.mov" type="video/mp4" />
                  </video>

                </div>
              </Col>
              <Col lg={{span: 8}}>
                <Tabs type="card">
                  <TabPane tab="基本信息" key="1">
                    <FormItem
                      {...formItemLayout}
                      label="视频标题"
                    >
                      <p className="ant-form-text">山水间</p>
                    </FormItem>

                    <FormItem
                      label="说明"
                      {...formItemLayout}
                    >
                      <p className="ant-form-text">视频说明</p>
                    </FormItem>

                    <FormItem
                      {...formItemLayout}
                      label="视频分类"
                    >
                      <Select name="audio_type" defaultValue="lucy"  style={{ width: '100%' }}>
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
                      label="上传者"
                    >
                      <p className="ant-form-text">上传者姓名</p>
                    </FormItem>


                    <FormItem
                      {...formItemLayout}
                      label="内容类别"
                    >
                      <Select name="descrip" defaultValue="b"  style={{ width: '100%' }}>
                        <Option value="tv">电视剧</Option>
                        <Option value="film">电影</Option>
                        <Option value="a">演唱会</Option>
                        <Option value="b">纪录片</Option>
                        <Option value="c">片花</Option>
                        <Option value="c">缩编</Option>
                      </Select>
                    </FormItem>


                    <FormItem
                      {...formItemLayout}
                      label="拍摄国别"
                    >
                      <Select defaultValue="a"  style={{ width: '100%' }}>
                        <Option value="jack" selected>中国</Option>
                        <Option value="a">欧美</Option>
                        <Option value="b">日韩</Option>
                      </Select>
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
                    <FormItem
                      {...formItemLayout}
                      label="许可"
                    >
                      <p className="ant-form-text"></p>
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
                    <li>镜头编号: </li>

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

DetailsImage.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps() {
  return {
  };
}

export default connect(mapStateToProps)(CreateForm()(DetailsImage));
