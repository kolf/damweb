import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {
  Form,
  Input,
  Row,
  Col,
  Menu,
  Dropdown,
  Button,
  Icon,
  Select,
  Card,
  Tag,
  Pagination,
  Tabs,
  DatePicker,
  Tooltip,
  Message
} from 'antd';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';

import {queryResource} from '../../../actions/queryResource';
import {review} from '../../../actions/review';

import Video from 'react-html5video';

const CreateForm = Form.create;
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const Option = Select.Option;
const InputGroup = Input.Group;
const TabPane = Tabs.TabPane;
const RangePicker = DatePicker.RangePicker;

import './style.scss';

class ReviewIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: {
        auditStatus: 1,
        pageNum: 1,
        pageSize: '24',
        phrase: '',
        mediaSum: {
          resType: '',
        }
      }
    };
  }

  componentDidMount() {
    this.queryList();
  }

  queryList() {
    const {dispatch} = this.props;
    dispatch(queryResource(this.state.query));
  }

  refresh(type, params) {
    let query = this.state.query;
    if (type === 'pager') {
      Object.assign(query, this.state.query, params);
    } else if (type === 'auditStatus') {
      Object.assign(query, this.state.query, params, {'pageNum': 1});
    }
    this.setState({query});
    this.queryList();
  }

  goToDetails(assetType, id) {
    browserHistory.push(`/${this.getAssetTypeName(assetType)}/review/${id}`);
  }

  getAssetTypeName(assetType) {
    switch (assetType) {
      case 1:
        return `image`;
      case 2:
        return `audio`;
      case 3:
        return `video`;
      case 4:
        return `imageGroup`;
    }
  }

  handleSubmit(e){
    e.preventDefault();

    const {form} = this.props;

    form.validateFields((errors) => {
      if (errors) {
        return;
      }
      const creds = (form.getFieldsValue());
      this.state.query.phrase = creds.phrase;
      // Object.assign(this.state.query, creds);
      this.queryList();
    });
  }

  handleReset(e) {
    e.preventDefault();
    const {form} = this.props;
    form.resetFields();

    const creds = (form.getFieldsValue());
    this.state.query.phrase = creds.phrase;

    this.queryList()
  }

  handleReview(resultType, id, assetType) {
    const {dispatch} = this.props;

    dispatch(review({
      audioResult: resultType,
      resId: id,
      resType: assetType
    }, () => {
      Message.success('审核成功！');
      setTimeout(this.refresh(), 1000)
    }));
  }

  assetTypeTab(activeKey) {
    this.refresh('auditStatus', {"auditStatus": activeKey});
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const {resources:{data, meta:{total}}} = this.props;

    const thumbItemLayout = {
      xs: {span: 6},
      lg: {span: 3}
    };

    const pager = {
      "page": this.state.query.pageNum,
      "pageSize": this.state.query.pageSize,
      "total": total,
      "pageSizeOptions": ['24', '48', '96'],
      "showSizeChanger": true,
      "showQuickJumper": true,
      "showTotal": () => {
        return '共 ' + total + ' 条';
      },
      onShowSizeChange: (pageNum, pageSize)=> {
        this.refresh("pager", {"pageNum": pageNum, "pageSize": pageSize});
      },
      onChange: (pageNum) => {
        this.refresh("pager", {"pageNum": pageNum});
      }
    };

    return (
      <div>
        <div className="ant-layout-content">
          <div className="text-center">
            <Form inline className="pad-bottom search-box" onSubmit={this.handleSubmit.bind(this)}>
              <FormItem>
                {getFieldDecorator('phrase', {
                  initialValue: this.state.query.phrase,
                })(
                  <Input size="large" placeholder="输入您要找的关键词" style={{width: 400}}/>
                )}
              </FormItem>
              <FormItem label="申请日期">
                {getFieldDecorator('phrase ', {})(
                  <RangePicker style={{width: 220}}/>
                )}
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit" size="large">搜索</Button>
                <Button className="gap-left" size="large">清空</Button>
              </FormItem>
            </Form>
          </div>
          <Tabs type="card" onChange={this.assetTypeTab.bind(this)}>
            <TabPane tab="未审核资源" key="1"/>
            <TabPane tab="已拒绝的资源" key="4"/>
          </Tabs>
          <div style={{marginBottom: 14}}>
            <Select size="large" style={{width: 160}} placeholder="请选择上传类型">
              <Option value="s1">所有资源</Option>
              <Option value="s2">内部上传</Option>
              <Option value="s3">用户上传</Option>
            </Select>
            <Select size="large" style={{width: 160, marginLeft: 10}} placeholder="请选择上传时间">
              <Option value="s4">所有时间</Option>
              <Option value="s5">最近一天</Option>
              <Option value="s6">最近三天</Option>
              <Option value="s7">最近一周</Option>
              <Option value="s8">最近半月</Option>
              <Option value="s9">最近一月</Option>
            </Select>
          </div>
          <Row gutter={24}>
            {data && data.map(item =>
              <Col {...thumbItemLayout}>
                <div className="thumb-list-item">
                  <div className="thumb-list-item-img" onClick={this.goToDetails.bind(this, item.assetType, item.id)}>
                    {(() => {
                      switch (item.assetType) {
                        case 1:
                          return <p><img src={item.ossId2} className="hidden"/><img src={item.ossId2} alt="item.name"/>
                          </p>;
                        case 2:
                          return <p><img src={item.ossid3} className="hidden"/><img src={item.ossid3} alt="item.name"/>
                          </p>;
                        case 3:
                          return <Video controls muted>
                            <source src={item.ossidUrl} type="video/mp4"/>
                          </Video>;
                        case 4:
                          return <p><img src={item.cover.ossId1} className="hidden"/><img src={item.cover.ossId1}
                                                                                          alt="item.name"/></p>;
                      }
                    })()}
                  </div>
                  <div className="thumb-list-item-text">{(() => {
                    switch (item.assetType) {
                      case 1:
                        return item.title;
                      case 2:
                        return item.displayName;
                      case 3:
                        return item.displayName;
                      case 4:
                        return item.title;
                    }
                  })()}
                    <div className="thumb-list-item-btns ant-btn-group ant-btn-group-sm">
                      <span className="ant-btn ant-btn-primary ant-btn-icon-only"
                            onClick={this.handleReview.bind(this, 5, item.id, item.assetType)}><Icon
                        type="check"/></span>
                      <span className="ant-btn ant-btn-icon-only"
                            onClick={this.handleReview.bind(this, 4, item.id, item.assetType)}><Icon
                        type="cross"/></span>
                    </div>
                  </div>

                  <div className="thumb-list-item-badges">
                    {item.conType ? <Tag color="red">RM</Tag> : ''}
                    <Tag>{(() => {
                      switch (item.assetType) {
                        case 1:
                          return "图片";
                        case 2:
                          return "音频";
                        case 3:
                          return "视频";
                        case 4:
                          return "组照";
                      }
                    })()}
                    </Tag>
                  </div>
                </div>
              </Col>
            )}
          </Row>
          <div className="pager pad-v text-right">
            <Pagination {...pager}/>
          </div>
        </div>
      </div>
    )
  }
}

ReviewIndex.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {resources} = state;
  return {
    resources
  };
}

export default connect(mapStateToProps)(CreateForm()(ReviewIndex));
