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

import './style.scss';

class Review extends Component {
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
    browserHistory.push('/imageGroup/review')
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

    const thumbItemLayout = {
      xs: { span: 6 },
      md: { span: 4},
      lg: { span: 3 }
    };

    return (
      <div>
        <div className="ant-layout-content">
        <div className="text-center">
          <Form inline className="pad-bottom search-box" onSubmit={this.handleSubmit}>
            <FormItem
              label="申请用户"
            >
              <Input {...nameProps} />
            </FormItem>

            <FormItem
              label="申请日期"
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
            <FormItem>
              <Button type="primary" htmlType="submit" size="large">搜索</Button>
              <Button className="gap-left" size="large">清空</Button>
            </FormItem>
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
          <Col {...thumbItemLayout}>
            <div className="thumb-list-item">
              <div className="thumb-list-item-img">
                <p>
                  <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" className="hidden"/>
                  <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt=""/>
                </p>
              </div>
              <div className="thumb-list-item-text">
                图片标题
              </div>
              <div className="thumb-list-item-btns">
                <Link className="ant-btn ant-btn-primary ant-btn-icon-only" to={'/image/review'}><Icon type="check" /></Link>
                <Link style={{background:'#f50',color:'#fff'}} className="ant-btn ant-btn-icon-only" to={'/image/review'}><Icon type="cross" /></Link>
              </div>
              <div className="thumb-list-item-badges">
                <Tag color="red">RM</Tag><Tag>图片</Tag>
              </div>
            </div>
          </Col><Col {...thumbItemLayout}>
          <div className="thumb-list-item">
            <div className="thumb-list-item-img">
              <p>
                <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" className="hidden"/>
                <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt=""/>
              </p>
            </div>
            <div className="thumb-list-item-text">
              图片标题
            </div>
            <div className="thumb-list-item-btns">
              <Link className="ant-btn ant-btn-primary ant-btn-icon-only" to={'/image/review'}><Icon type="check" /></Link>
              <Link style={{background:'#f50',color:'#fff'}} className="ant-btn ant-btn-icon-only" to={'/image/review'}><Icon type="cross" /></Link>
            </div>
            <div className="thumb-list-item-badges">
              <Tag color="red">RM</Tag><Tag>图片</Tag>
            </div>
          </div>
        </Col>
          <Col {...thumbItemLayout}>
            <div className="thumb-list-item">
              <div className="thumb-list-item-img">
                <p>
                  <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" className="hidden"/>
                  <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt=""/>
                </p>
              </div>
              <div className="thumb-list-item-text">
                图片标题
              </div>
              <div className="thumb-list-item-btns">
                <Link className="ant-btn ant-btn-primary ant-btn-icon-only" to={'/image/review'}><Icon type="check" /></Link>
                <Link style={{background:'#f50',color:'#fff'}} className="ant-btn ant-btn-icon-only" to={'/image/review'}><Icon type="cross" /></Link>
              </div>
              <div className="thumb-list-item-badges">
                <Tag color="red">RM</Tag><Tag>图片</Tag>
              </div>
            </div>
          </Col><Col {...thumbItemLayout}>
            <div className="thumb-list-item">
              <div className="thumb-list-item-img">
                <p>
                  <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" className="hidden"/>
                  <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt=""/>
                </p>
              </div>
              <div className="thumb-list-item-text">
                图片标题
              </div>
              <div className="thumb-list-item-btns">
                <Link className="ant-btn ant-btn-primary ant-btn-icon-only" to={'/image/review'}><Icon type="check" /></Link>
                <Link style={{background:'#f50',color:'#fff'}} className="ant-btn ant-btn-icon-only" to={'/image/review'}><Icon type="cross" /></Link>
              </div>
              <div className="thumb-list-item-badges">
                <Tag color="red">RM</Tag><Tag>图片</Tag>
              </div>
            </div>
          </Col><Col {...thumbItemLayout}>
            <div className="thumb-list-item">
              <div className="thumb-list-item-img">
                <p>
                  <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" className="hidden"/>
                  <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt=""/>
                </p>
              </div>
              <div className="thumb-list-item-text">
                图片标题
              </div>
              <div className="thumb-list-item-btns">
                <Link className="ant-btn ant-btn-primary ant-btn-icon-only" to={'/image/review'}><Icon type="check" /></Link>
                <Link style={{background:'#f50',color:'#fff'}} className="ant-btn ant-btn-icon-only" to={'/image/review'}><Icon type="cross" /></Link>
              </div>
              <div className="thumb-list-item-badges">
                <Tag color="red">RM</Tag><Tag>图片</Tag>
              </div>
            </div>
          </Col><Col {...thumbItemLayout}>
            <div className="thumb-list-item">
              <div className="thumb-list-item-img">
                <p>
                  <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" className="hidden"/>
                  <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt=""/>
                </p>
              </div>
              <div className="thumb-list-item-text">
                图片标题
              </div>
              <div className="thumb-list-item-btns">
                <Link className="ant-btn ant-btn-primary ant-btn-icon-only" to={'/image/review'}><Icon type="check" /></Link>
                <Link style={{background:'#f50',color:'#fff'}} className="ant-btn ant-btn-icon-only" to={'/image/review'}><Icon type="cross" /></Link>
              </div>
              <div className="thumb-list-item-badges">
                <Tag color="red">RM</Tag><Tag>图片</Tag>
              </div>
            </div>
          </Col><Col {...thumbItemLayout}>
            <div className="thumb-list-item">
              <div className="thumb-list-item-img">
                <p>
                  <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" className="hidden"/>
                  <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt=""/>
                </p>
              </div>
              <div className="thumb-list-item-text">
                图片标题
              </div>
              <div className="thumb-list-item-btns">
                <Link className="ant-btn ant-btn-primary ant-btn-icon-only" to={'/image/review'}><Icon type="check" /></Link>
                <Link style={{background:'#f50',color:'#fff'}} className="ant-btn ant-btn-icon-only" to={'/image/review'}><Icon type="cross" /></Link>
              </div>
              <div className="thumb-list-item-badges">
                <Tag color="red">RM</Tag><Tag>图片</Tag>
              </div>
            </div>
          </Col><Col {...thumbItemLayout}>
            <div className="thumb-list-item">
              <div className="thumb-list-item-img">
                <p>
                  <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" className="hidden"/>
                  <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt=""/>
                </p>
              </div>
              <div className="thumb-list-item-text">
                图片标题
              </div>
              <div className="thumb-list-item-btns">
                <Link className="ant-btn ant-btn-primary ant-btn-icon-only" to={'/image/review'}><Icon type="check" /></Link>
                <Link style={{background:'#f50',color:'#fff'}} className="ant-btn ant-btn-icon-only" to={'/image/review'}><Icon type="cross" /></Link>
              </div>
              <div className="thumb-list-item-badges">
                <Tag color="red">RM</Tag><Tag>图片</Tag>
              </div>
            </div>
          </Col><Col {...thumbItemLayout}>
            <div className="thumb-list-item">
              <div className="thumb-list-item-img">
                <p>
                  <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" className="hidden"/>
                  <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt=""/>
                </p>
              </div>
              <div className="thumb-list-item-text">
                图片标题
              </div>
              <div className="thumb-list-item-btns">
                <Link className="ant-btn ant-btn-primary ant-btn-icon-only" to={'/image/review'}><Icon type="check" /></Link>
                <Link style={{background:'#f50',color:'#fff'}} className="ant-btn ant-btn-icon-only" to={'/image/review'}><Icon type="cross" /></Link>
              </div>
              <div className="thumb-list-item-badges">
                <Tag color="red">RM</Tag><Tag>图片</Tag>
              </div>
            </div>
          </Col>
        </Row>
        <div className="pager pad-v text-right">
          <Pagination showQuickJumper defaultCurrent={2} total={500} />
        </div>
      </div>
        </div>
    )
  }
}

Review.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { res } = state;
  return {
    res
  };
}

export default connect(mapStateToProps)(CreateForm()(Review));
