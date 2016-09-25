import React, { Component, PropTypes } from 'react';
import { Form, Select, Input, DatePicker, Switch, Radio, Cascader, Button, Row, Col, Upload, Icon, Tag, Checkbox, Tabs } from 'antd';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import './style.scss';

const CreateForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;

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

const tags =[
  { key: 1, name: '娱乐' },
  { key: 2, name: '明星动态' },
  { key: 3, name: '春夏' }
];

class EditImageGroup extends Component {
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
                  <div className="edit-view-img" style={{backgroundImage:'url(https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png)'}}>
                  </div>
                </div>
              </Col>
              <Col lg={{span: 8}}>
                <div className="ant-row ant-form-item ant-col-offset-6">
                  <Button size="large" type="primary">保存编辑</Button>
                  <Button size="large" className="gap-left">下载视频</Button>
                </div>

                    <FormItem
                      {...formItemLayout}
                      label="视频标题"
                      required
                    >
                      <Input {...getFieldProps('title', {initialValue: '视频标题1'})}/>
                    </FormItem>

                    <FormItem
                      label="视频说明"
                      {...formItemLayout}
                    >
                      <Input type="textarea" {...getFieldProps('desc', {initialValue: '视频说明视频说明视频说明视频说明视频说明视频说明视频说明视频说明视频说明视频说明'})}/>
                    </FormItem>

                    <FormItem
                      {...formItemLayout}
                      label="视频分类"
                      required
                    >
                      <Select style={{ width: '100%' }} {...getFieldProps('select', {initialValue: 'jack'})}
                      >
                        <Option value="jack">电视剧</Option>
                        <Option value="lucy">美剧</Option>
                        <Option value="yiminghe">韩剧</Option>
                      </Select>
                    </FormItem>

                    <FormItem
                      {...formItemLayout}
                      label="视频标签"
                      required
                    >
                      <Select tags placeholder="请添加标签" style={{width: '100%'}} {...getFieldProps('tag1', {initialValue: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6']})}>
                        <Option key="T1">成人</Option>
                        <Option key="T2">广角拍摄</Option>
                        <Option key="T3">寒冷</Option>
                        <Option key="T4">创造力</Option>
                        <Option key="T5">活动中</Option>
                        <Option key="T6">人</Option>
                      </Select>
                    </FormItem>

                    <FormItem
                      {...formItemLayout}
                      label="上传时间"
                    >
                      <p className="ant-form-text">2016-02-26 14:56:51</p>
                    </FormItem>

                    <FormItem
                      {...formItemLayout}
                      label="作者"
                      required
                    >
                      <Input {...getFieldProps('auth', {initialValue: 'jack'})}/>
                    </FormItem>

                    <FormItem
                      {...formItemLayout}
                      label="拍摄城市"
                      required
                      hasFeedback
                    >
                      <Cascader options={areaData} {...getFieldProps('area', {initialValue: ['shanghai']})} />
                    </FormItem>

                    <FormItem
                      {...formItemLayout}
                      label="拍摄地"
                      required
                      hasFeedback
                    >
                      <Input {...addressProps}/>
                    </FormItem>

                    <FormItem
                      {...formItemLayout}
                      label="色彩"
                      required
                      hasFeedback
                    >
                      <RadioGroup size="default" disabled onChange={this.onChange} value={this.state.color}>
                        <Radio value={'colors'}>彩色</Radio>
                        <Radio value={'gray'}>黑白</Radio>
                      </RadioGroup>
                    </FormItem>
                    <FormItem
                      label="版权所属"
                      {...formItemLayout}
                    >
                      <RadioGroup size="default" {...getFieldProps('rg')}>
                        <RadioButton value="a">无</RadioButton>
                        <RadioButton value="b">自有</RadioButton>
                        <RadioButton value="c">第三方</RadioButton>
                      </RadioGroup>
                    </FormItem>

                    <FormItem
                      label="版权授权"
                      {...formItemLayout}
                    >
                      <RadioGroup size="default" {...getFieldProps('rg')}>
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
                      <RadioGroup size="default" disabled onChange={this.onChange} value={this.state.color}>
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
                      label="水印位置"
                    >

                      <div className="btn-abs" style={{marginTop: 3}}>
                        <Button className="lt">左上</Button>
                        <Button className="tr">右上</Button>
                        <Button className="c">中间</Button>
                        <Button className="lb">左下</Button>
                        <Button className="rb">右下</Button>
                      </div>

                    </FormItem>
                <Col xs={{offset: 6}}>
                  <Checkbox>是否在展示平台显示资源</Checkbox>
                </Col>

              </Col>
            </Row>
            <div className="edit-view-exif">
              <h4>EXIF信息</h4>
              <Row gutter={24}>
                <Col xs={{span: 6}}>
                  <ul className="list-v">
                    <li>拍摄时间: 索尼</li>
                    <li>制造商: 索尼</li>
                    <li>测光模式: 索尼</li>
                    <li>白平衡: 索尼</li>
                  </ul>
                </Col>
                <Col xs={{span: 6}}>
                  <ul className="list-v">
                    <li>视频格式: 索尼</li>
                    <li>曝光时间: 索尼</li>
                    <li>焦距: 索尼</li>
                    <li>曝光程序: 索尼</li>
                  </ul>
                </Col>
                <Col xs={{span: 6}}><ul className="list-v">
                  <li>原始宽度: 索尼</li>
                  <li>相机型号: 索尼</li>
                  <li>闪光灯: 索尼</li>
                  <li>曝光补偿: 索尼</li>
                </ul></Col>
                <Col xs={{span: 6}}><ul className="list-v">
                  <li>ISO: 索尼</li>
                  <li>原始高度: 索尼</li>
                  <li>光圈: 索尼</li>
                  <li>曝光模式: 索尼</li>
                </ul></Col>
              </Row>
            </div>
            </Col>
        </div>
      </div>
    );
  }
}

EditImageGroup.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps() {
  return {
  };
}

export default connect(mapStateToProps)(CreateForm()(EditImageGroup));
