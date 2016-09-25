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

    const titleProps = getFieldProps('title', {
      rules: [
        { required: true, message: '图片标题不能为空' },
        { validator: this.userExists },
      ],
      initialValue: '图片标题'
    });

    const imgClassifyProps = getFieldProps('imgClassify', {
      rules: [
        { required: true, message: '图片标题不能为空' },
        { validator: this.userExists },
      ],
      initialValue: 'jack'
    });

    const imgTagsProps = getFieldProps('imgTags', {
      rules: [
        { required: true, message: '图片标签不能为空' },
        { validator: this.userExists },
      ],
      initialValue: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6']
    });

    const descProps = getFieldProps('desc', {
      rules: [
        { required: true, message: '图片说明不能为空' },
        { validator: this.userExists },
      ],
      initialValue: '图片说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明'
    });

    const authorProps = getFieldProps('author', {
      rules: [
        { required: true, message: '作者不能为空' },
        { validator: this.userExists },
      ],
      initialValue: '视觉中国'
    });

    const addressProps = getFieldProps('address', {
      rules: [
        { required: true, message: '拍摄地至少为 2 个字符' },
        { validator: this.userExists },
      ],
      initialValue: '天安门广场'
    });

    const cityProps = getFieldProps('city', {
      rules: [
        { required: true, message: '拍摄城市不能为空' },
        { validator: this.userExists },
      ],
      initialValue: ['shanghai', 'shanghaishi']
    });

    const copyrightProps = getFieldProps('copyright', {
      rules: [
        { validator: this.userExists },
      ],
      initialValue: ['a']
    });

    const copyrightTypeProps = getFieldProps('copyrightType', {
      rules: [
        { validator: this.userExists },
      ],
      initialValue: ['rf']
    });

    const authorizedProps = getFieldProps('authorizedProps', {
      rules: [
        { validator: this.userExists },
      ],
      initialValue: ['d']
    });

    const imgGroupTitleProps = getFieldProps('imgGroupTitle', {
      rules: [
        { required: true, message: '组图标题不能为空' },
        { validator: this.userExists },
      ],
      initialValue: '标题标题标题标题标题标题标题标题标题标题标题标题'
    });

    const imgGroupDescProps = getFieldProps('imgGroupDesc', {
      rules: [
        { required: true, message: '组图说明不能为空' },
        { validator: this.userExists },
      ],
      initialValue: '重度雾霾盘踞 消散唯等风来重度雾霾盘踞 消散唯等风来重度雾霾盘踞 消散唯等风来重度雾霾盘踞 消散唯等风来'
    });

    const imgGroupTagsProps = getFieldProps('imgGroupTags', {
      rules: [
        { required: true, message: '图片标签不能为空' },
        { validator: this.userExists },
      ],
      initialValue: ['T1', 'T2', 'T3']
    });

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    };

    return (
      <div>
        <div className="ant-layout-content">
          <Row gutter={24}>
            <Col lg={{span:6}}>
              <FormItem {...formItemLayout} label="组图标题">
                <Input {...imgGroupTitleProps}/>
              </FormItem>
              <FormItem label="组图说明" {...formItemLayout}>
                <Input type="textarea" {...imgGroupDescProps}/>
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="组图标签"
              >
                <Select tags style={{ width: '100%' }} placeholder="请添加标签" {...imgGroupTagsProps}>
                  <Option key="T1">成人</Option>
                  <Option key="T2">广角拍摄</Option>
                  <Option key="T3">寒冷</Option>
                  <Option key="T4">创造力</Option>
                  <Option key="T5">活动中</Option>
                  <Option key="T6">人</Option>
                </Select>
              </FormItem>
              <hr/>
              <div className="view-thumb-list">
                <Row gutter={24}>
                  <Col lg={{span:12}}>
                    <div className='view-thumb-list-item active'></div>
                  </Col><Col lg={{span:12}}>
                    <div className='view-thumb-list-item'></div>
                  </Col><Col lg={{span:12}}>
                    <div className='view-thumb-list-item'></div>
                  </Col><Col lg={{span:12}}>
                    <div className='view-thumb-list-item'></div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col lg={{span: 18}}>
              <Row gutter={24}>
              <Col lg={{span: 16}}>
                <div className="edit-view">
                  <div className="edit-view-img" style={{backgroundImage:'url(https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png)'}}>
                  </div>
                </div>
              </Col>
              <Col lg={{span: 8}}>
                <Form>
                  <div className="ant-row ant-form-item ant-col-offset-6">
                    <Button htmlType="submit" size="large" type="primary">保存编辑</Button>
                    <Button size="large" className="gap-left">下载图片</Button>
                  </div>
                  <Tabs type="card">
                    <TabPane tab="基本信息" key="Tab_1">
                      <FormItem
                        label="图片标题"
                        {...formItemLayout}
                      >
                        <Input {...titleProps}/>
                      </FormItem>
                      <FormItem
                        label="图片说明"
                        {...formItemLayout}
                      >
                        <Input type="textarea" {...descProps}/>
                      </FormItem>
                      <FormItem
                        {...formItemLayout}
                        label="图片分类"
                      >
                        <Select style={{ width: '100%' }} {...imgClassifyProps}>
                          <Option value="jack">jack</Option>
                          <Option value="lucy">lucy</Option>
                          <Option value="yiminghe">yiminghe</Option>
                        </Select>
                      </FormItem>
                      <FormItem
                        {...formItemLayout}
                        label="图片标签"
                      >
                        <Select tags style={{ width: '100%' }} placeholder="请添加标签" {...imgTagsProps}>
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
                      >
                        <Input {...authorProps}/>
                      </FormItem>
                      <FormItem
                        {...formItemLayout}
                        label="拍摄城市"
                      >
                        <Cascader options={areaData} {...cityProps} />
                      </FormItem>
                      <FormItem
                        {...formItemLayout}
                        label="拍摄地"
                      >
                        <Input {...addressProps}/>
                      </FormItem>
                      <FormItem
                        {...formItemLayout}
                        label="色彩"
                      >
                        <RadioGroup onChange={this.onChange} value={this.state.color}>
                          <Radio value={'colors'}>彩色</Radio>
                          <Radio value={'gray'}>黑白</Radio>
                        </RadioGroup>
                      </FormItem>
                    </TabPane>
                    <TabPane tab="版权信息" key="Tab_2">
                      <FormItem
                        label="版权所属"
                        {...formItemLayout}
                      >
                        <RadioGroup size="default" {...copyrightProps}>
                          <RadioButton value="a">无</RadioButton>
                          <RadioButton value="b">自有</RadioButton>
                          <RadioButton value="c">第三方</RadioButton>
                        </RadioGroup>
                      </FormItem>
                      <FormItem
                        label="版权类型"
                        {...formItemLayout}
                      >
                        <RadioGroup size="default" {...copyrightTypeProps}>
                          <RadioButton value="rm">RM</RadioButton>
                          <RadioButton value="fr">RF</RadioButton>
                        </RadioGroup>
                      </FormItem>
                      <FormItem
                        {...formItemLayout}
                        label="版权授权"
                      >
                        <RadioGroup size="default" {...authorizedProps}>
                          <Radio value={'d'}>肖像权</Radio>
                          <Radio value={'e'}>物权</Radio>
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
                    </TabPane>
                  </Tabs>
                  <Col xs={{offset: 6}}>
                    <Checkbox>是否在展示平台显示资源</Checkbox>
                  </Col>
                </Form>
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
                      <li>图片格式: 索尼</li>
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
          </Row>
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
