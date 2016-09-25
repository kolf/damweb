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
          <Row gutter={24}>
            <Col lg={{span:6}}>
              <FormItem
                {...formItemLayout}
                label="组图标题"
                required
                hasFeedback
              >
                <Input {...avatarProps}/>
              </FormItem>
              <FormItem
                label="组图说明"
                {...formItemLayout}
              >
                <Input type="textarea" {...addressProps}/>
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="组图标签"
                required
                hasFeedback
              >
                {tags.map(tag =>
                  <Tag key={tag.key} closable={tag.key !== 1} afterClose={() => this.handleClose(tag.key)}>
                    {tag.name}
                  </Tag>
                )}
              </FormItem>
              <hr/>
              <div className="view-thumb-list">
                <Row gutter={24}>
                  <Col lg={{span:12}}>
                    <div className='view-thumb-list-item'></div>
                  </Col><Col lg={{span:12}}>
                    <div className='view-thumb-list-item'></div>
                  </Col><Col lg={{span:12}}>
                    <div className='view-thumb-list-item active'></div>
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
                  <div className="ant-row ant-form-item ant-col-offset-6">
                    <Button size="large" type="primary">保存编辑</Button>
                    <Button size="large" className="gap-left">下载图片</Button>
                  </div>

                  <Tabs type="card" style={{height: 526}}>
                    <TabPane tab="基本信息" key="Tab_1">
                      <FormItem
                        {...formItemLayout}
                        label="图片标题"
                        required
                        hasFeedback
                      >
                        <Input {...avatarProps}/>
                      </FormItem>

                      <FormItem
                        label="图片说明"
                        {...formItemLayout}
                      >
                        <Input type="textarea" {...addressProps}/>
                      </FormItem>

                      <FormItem
                        {...formItemLayout}
                        label="图片分类"
                        required
                      >
                        <Select style={{ width: '100%' }} {...getFieldProps('select')}
                        >
                          <Option value="jack">jack</Option>
                          <Option value="lucy">lucy</Option>
                          <Option value="disabled" disabled>disabled</Option>
                          <Option value="yiminghe">yiminghe</Option>
                        </Select>
                      </FormItem>

                      <FormItem
                        {...formItemLayout}
                        label="图片标签"
                        required
                        hasFeedback
                      >
                        {tags.map(tag =>
                          <Tag key={tag.key} closable={tag.key !== 1} afterClose={() => this.handleClose(tag.key)}>
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
                        label="作者"
                        required
                        hasFeedback
                      >
                        <Input {...avatarProps}/>
                      </FormItem>

                      <FormItem
                        {...formItemLayout}
                        label="拍摄城市"
                        required
                        hasFeedback
                      >
                        <Cascader options={areaData} {...getFieldProps('area')} />
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
                    </TabPane>
                    <TabPane tab="版权信息" key="Tab_2">
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
                    </TabPane>
                  </Tabs>

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
