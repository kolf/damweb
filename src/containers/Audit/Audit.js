import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Row, Col, Menu, Dropdown, Button, Icon, Select, Card, Tag, Pagination, Tabs, DatePicker } from 'antd';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

const CreateForm = Form.create;
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const Option = Select.Option;
const InputGroup = Input.Group;
const TabPane = Tabs.TabPane;

import './Audit.scss';

class Audit extends Component {
  constructor(props) {
    super(props);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.state = {
      startValue: null,
      endValue: null,
      endOpen: false
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    console.log(dispatch)
  }

  handleTableChange() {
    const { dispatch } = this.props;
    console.log(dispatch)
  }

  goToReview(e) {
    console.log('click', e);
    browserHistory.push('/details/image')
  }

  disabledStartDate(startValue) {
    if (!startValue || !this.state.endValue) {
      return false;
    }
    return startValue.getTime() >= this.state.endValue.getTime();
  }

  disabledEndDate(endValue) {
    if (!endValue || !this.state.startValue) {
      return false;
    }
    return endValue.getTime() <= this.state.startValue.getTime();
  }

  onChange(field, value) {
    this.setState({
      [field]: value,
    });
  }

  onStartChange(value) {
    this.onChange('startValue', value);
  }

  onEndChange(value) {
    this.onChange('endValue', value);
  }

  handleStartToggle({ open }) {
    if (!open) {
      this.setState({ endOpen: true });
    }
  }

  handleEndToggle({ open }) {
    this.setState({ endOpen: open });
  }

  render() {
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
    const nameProps = getFieldProps('userName', {
      rules: [
        { min: 2, message: '姓名至少为 2 个字符' }
      ]
    });

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 10 }
    };

    return (
      <div>
        <div className="text-center">
          <Form inline className="pad-bottom" onSubmit={this.handleSubmit}>
            <FormItem
              label="申请用户"
              hasFeedback
            >
              <Input {...nameProps} />
            </FormItem>

            <FormItem
              label="申请日期"
              hasFeedback
            >
              <DatePicker
                disabledDate={this.disabledStartDate.bind(this)}
                value={this.state.startValue}
                placeholder="开始日期"
                onChange={this.onStartChange.bind(this)}
                toggleOpen={this.handleStartToggle.bind(this)}
                style={{marginRight: 12}}
              />
              <DatePicker
                disabledDate={this.disabledEndDate.bind(this)}
                value={this.state.endValue}
                placeholder="结束日期"
                onChange={this.onEndChange.bind(this)}
                open={this.state.endOpen}
                toggleOpen={this.handleEndToggle.bind(this)}
              />
            </FormItem>
            <Button type="primary" htmlType="submit" size="large">搜索</Button><Button className="gap-left" size="large">清空</Button>
          </Form>
        </div>
        <Tabs type="card">
          <TabPane tab="未审核资源" key="auditTab1"/>
          <TabPane tab="已拒绝的资源" key="auditTab2"/>
        </Tabs>
        <div style={{marginBottom:14}}>
          <Select size="large" style={{ width: 160 }} placeholder="请选择上传类型" >
            <Option value="s1">所有资源</Option>
            <Option value="s2">内部上传</Option>
            <Option value="s3">用户上传</Option>
          </Select>
          <Select size="large" style={{ width: 160,marginLeft:10 }} placeholder="请选择上传时间" >
            <Option value="s4">所有时间</Option>
            <Option value="s5">最近一天</Option>
            <Option value="s6">最近三天</Option>
            <Option value="s7">最近一周</Option>
            <Option value="s8">最近半月</Option>
            <Option value="s9">最近一月</Option>
          </Select>
        </div>
        <Row gutter={24}>
          <Col xs={{ span: 6}} lg={{ span: 4 }} className="thumb-list-item">
            <Card bodyStyle={{ padding: 6 }}>
              <div className="custom-image" style={{backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png)'}}></div>
              <div className="custom-card">
                <h3>图片标题，超出隐藏...</h3>
                <p><Tag>图片</Tag><Tag color="red">RM</Tag>
                  <ButtonGroup size="small" className="pull-right">
                    <Button type="ghost" icon="eye-o" onClick={this.goToReview}/>
                    <Button type="ghost" icon="download"/>
                  </ButtonGroup>
                </p>
              </div>
            </Card>
          </Col>
          <Col xs={{ span: 6}} lg={{ span: 4 }} className="thumb-list-item">
            <Card bodyStyle={{ padding: 6 }}>
              <div className="custom-image" style={{backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png)'}}></div>
              <div className="custom-card">
                <h3>图片标题，超出隐藏...</h3>
                <p><Tag>图片</Tag><Tag color="red">RM</Tag>
                  <ButtonGroup size="small" className="pull-right">
                    <Button type="ghost" icon="eye-o" onClick={this.goToReview}/>
                    <Button type="ghost" icon="download"/>
                  </ButtonGroup>
                </p>
              </div>
            </Card>
          </Col>
          <Col xs={{ span: 6}} lg={{ span: 4 }} className="thumb-list-item">
            <Card bodyStyle={{ padding: 6 }}>
              <div className="custom-image" style={{backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png)'}}></div>
              <div className="custom-card">
                <h3>图片标题，超出隐藏...</h3>
                <p><Tag>图片</Tag><Tag color="red">RM</Tag>
                  <ButtonGroup size="small" className="pull-right">
                    <Button type="ghost" icon="eye-o" onClick={this.goToReview}/>
                    <Button type="ghost" icon="download"/>
                  </ButtonGroup>
                </p>
              </div>
            </Card>
          </Col>
          <Col xs={{ span: 6}} lg={{ span: 4 }} className="thumb-list-item active">
            <Card bodyStyle={{ padding: 6 }}>
              <div className="custom-image" style={{backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png)'}}></div>
              <div className="custom-card">
                <h3>图片标题，超出隐藏...</h3>
                <p><Tag>图片</Tag><Tag color="red">RM</Tag>
                  <ButtonGroup size="small" className="pull-right">
                    <Button type="ghost" icon="eye-o" onClick={this.goToReview}/>
                    <Button type="ghost" icon="download"/>
                  </ButtonGroup>
                </p>
              </div>
            </Card>
          </Col>
          <Col xs={{ span: 6}} lg={{ span: 4 }} className="thumb-list-item">
            <Card bodyStyle={{ padding: 6 }}>
              <div className="custom-image" style={{backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png)'}}></div>
              <div className="custom-card">
                <h3>图片标题，超出隐藏...</h3>
                <p><Tag>图片</Tag><Tag color="red">RM</Tag>
                  <ButtonGroup size="small" className="pull-right">
                    <Button type="ghost" icon="eye-o" onClick={this.goToReview}/>
                    <Button type="ghost" icon="download"/>
                  </ButtonGroup>
                </p>
              </div>
            </Card>
          </Col>
          <Col xs={{ span: 6}} lg={{ span: 4 }} className="thumb-list-item">
            <Card bodyStyle={{ padding: 6 }}>
              <div className="custom-image" style={{backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png)'}}></div>
              <div className="custom-card">
                <h3>图片标题，超出隐藏...</h3>
                <p><Tag>图片</Tag><Tag color="red">RM</Tag>
                  <ButtonGroup size="small" className="pull-right">
                    <Button type="ghost" icon="eye-o" onClick={this.goToReview}/>
                    <Button type="ghost" icon="download"/>
                  </ButtonGroup>
                </p>
              </div>
            </Card>
          </Col>
          <Col xs={{ span: 6}} lg={{ span: 4 }} className="thumb-list-item">
            <Card bodyStyle={{ padding: 6 }}>
              <div className="custom-image" style={{backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png)'}}></div>
              <div className="custom-card">
                <h3>图片标题，超出隐藏...</h3>
                <p><Tag>视频</Tag><Tag color="red">RM</Tag>
                  <ButtonGroup size="small" className="pull-right">
                    <Button type="ghost" icon="eye-o" onClick={this.goToReview}/>
                    <Button type="ghost" icon="download"/>
                  </ButtonGroup>
                </p>
              </div>
            </Card>
          </Col>
          <Col xs={{ span: 6}} lg={{ span: 4 }} className="thumb-list-item">
            <Card bodyStyle={{ padding: 6 }}>
              <div className="custom-image" style={{backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png)'}}></div>
              <div className="custom-card">
                <h3>图片标题，超出隐藏...</h3>
                <p><Tag>音频</Tag>
                  <ButtonGroup size="small" className="pull-right">
                    <Button type="ghost" icon="eye-o" onClick={this.goToReview}/>
                    <Button type="ghost" icon="download"/>
                  </ButtonGroup>
                </p>
              </div>
            </Card>
          </Col>
          <Col xs={{ span: 6}} lg={{ span: 4 }} className="thumb-list-item">
            <Card bodyStyle={{ padding: 6 }}>
              <div className="custom-image" style={{backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png)'}}></div>
              <div className="custom-card">
                <h3>图片标题，超出隐藏...</h3>
                <p><Tag>图片</Tag><Tag color="red">RM</Tag>
                  <ButtonGroup size="small" className="pull-right">
                    <Button type="ghost" icon="eye-o" onClick={this.goToReview}/>
                    <Button type="ghost" icon="download"/>
                  </ButtonGroup>
                </p>
              </div>
            </Card>
          </Col>
          <Col xs={{ span: 6}} lg={{ span: 4 }} className="thumb-list-item">
            <Card bodyStyle={{ padding: 6 }}>
              <div className="custom-image" style={{backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png)'}}></div>
              <div className="custom-card">
                <h3>Lorem ipsum dolor</h3>
                <p><Tag>图片</Tag><Tag color="red">RM</Tag>
                  <ButtonGroup size="small" className="pull-right">
                    <Button type="ghost" icon="eye-o" onClick={this.goToReview}/>
                    <Button type="ghost" icon="download"/>
                  </ButtonGroup>
                </p>
              </div>
            </Card>
          </Col>
          <Col xs={{ span: 6}} lg={{ span: 4 }} className="thumb-list-item">
            <Card bodyStyle={{ padding: 6 }}>
              <div className="custom-image" style={{backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png)'}}></div>
              <div className="custom-card">
                <h3>图片标题，超出隐藏...</h3>
                <p><Tag>图片</Tag><Tag color="red">RM</Tag>
                  <ButtonGroup size="small" className="pull-right">
                    <Button type="ghost" icon="eye-o" onClick={this.goToReview}/>
                    <Button type="ghost" icon="download"/>
                  </ButtonGroup>
                </p>
              </div>
            </Card>
          </Col>
          <Col xs={{ span: 6}} lg={{ span: 4 }} className="thumb-list-item">
            <Card bodyStyle={{ padding: 6 }}>
              <div className="custom-image" style={{backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png)'}}></div>
              <div className="custom-card">
                <h3>图片标题，超出隐藏...</h3>
                <p><Tag>图片</Tag><Tag color="red">RM</Tag>
                  <ButtonGroup size="small" className="pull-right">
                    <Button type="ghost" icon="eye-o" onClick={this.goToReview}/>
                    <Button type="ghost" icon="download"/>
                  </ButtonGroup>
                </p>
              </div>
            </Card>
          </Col>
          <Col xs={{ span: 6}} lg={{ span: 4 }} className="thumb-list-item">
            <Card bodyStyle={{ padding: 6 }}>
              <div className="custom-image" style={{backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png)'}}></div>
              <div className="custom-card">
                <h3>图片标题，超出隐藏...</h3>
                <p><Tag>图片</Tag><Tag color="red">RM</Tag>
                  <ButtonGroup size="small" className="pull-right">
                    <Button type="ghost" icon="eye-o" onClick={this.goToReview}/>
                    <Button type="ghost" icon="download"/>
                  </ButtonGroup>
                </p>
              </div>
            </Card>
          </Col>
          <Col xs={{ span: 6}} lg={{ span: 4 }} className="thumb-list-item">
            <Card bodyStyle={{ padding: 6 }}>
              <div className="custom-image" style={{backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png)'}}></div>
              <div className="custom-card">
                <h3>图片标题，超出隐藏...</h3>
                <p><Tag>图片</Tag><Tag color="red">RM</Tag>
                  <ButtonGroup size="small" className="pull-right">
                    <Button type="ghost" icon="eye-o" onClick={this.goToReview}/>
                    <Button type="ghost" icon="download"/>
                  </ButtonGroup>
                </p>
              </div>
            </Card>
          </Col>
          <Col xs={{ span: 6}} lg={{ span: 4 }} className="thumb-list-item">
            <Card bodyStyle={{ padding: 6 }}>
              <div className="custom-image" style={{backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png)'}}></div>
              <div className="custom-card">
                <h3>图片标题，超出隐藏...</h3>
                <p><Tag>视频</Tag><Tag color="red">RM</Tag>
                  <ButtonGroup size="small" className="pull-right">
                    <Button type="ghost" icon="eye-o" onClick={this.goToReview}/>
                    <Button type="ghost" icon="download"/>
                  </ButtonGroup>
                </p>
              </div>
            </Card>
          </Col>
          <Col xs={{ span: 6}} lg={{ span: 4 }} className="thumb-list-item">
            <Card bodyStyle={{ padding: 6 }}>
              <div className="custom-image" style={{backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png)'}}></div>
              <div className="custom-card">
                <h3>图片标题，超出隐藏...</h3>
                <p><Tag>音频</Tag>
                  <ButtonGroup size="small" className="pull-right">
                    <Button type="ghost" icon="eye-o" onClick={this.goToReview}/>
                    <Button type="ghost" icon="download"/>
                  </ButtonGroup>
                </p>
              </div>
            </Card>
          </Col>
        </Row>
        <div className="pager pad-v text-right">
          <Pagination showQuickJumper defaultCurrent={2} total={500} />
        </div>
      </div>
    )
  }
}

Audit.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { res } = state;
  return {
    res
  };
}

export default connect(mapStateToProps)(CreateForm()(Audit));
