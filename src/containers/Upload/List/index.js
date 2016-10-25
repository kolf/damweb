import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Form, Input, Row, Col, Menu, Dropdown, Button, Icon, Select, Card, Tag, Pagination, Tooltip, DatePicker} from 'antd';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';

import CategoryMenu from '../../../components/CategoryMenu';
import {queryResource} from '../../../actions/queryResource';
import defaultVideoThumb from '../../../assets/images/defaultVideo.gif';
// import Video from 'react-html5video';

const CreateForm = Form.create;
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const Option = Select.Option;
const InputGroup = Input.Group;
const RangePicker = DatePicker.RangePicker;

import './style.scss';

class UploadList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: {
        pageNum: '1',
        pageSize: '24',
        resType: '',
        startDate: '',
        endDate: '',
        phrase: '',
        auditStatus: 1,
      }
    };
  }

  componentDidMount() {
    this.queryList();
  }

  queryList() {
    const {dispatch} = this.props;
    const query = Object.assign({}, this.state.query);
    // query = JSON.stringify(query);
    dispatch(queryResource(query));
  }

  refresh(type, params) {
    let query = this.state.query;
    if (type === 'pager') {
      Object.assign(query, params);
    } else if (type === 'auditStatus') {
      query.auditStatus = params.auditStatus;
      Object.assign(query, {'pageNum': 1});
    }
    this.setState({query});
    this.queryList();
  }

  goToDetails(assetType, id) {
    browserHistory.push(`/${this.getAssetTypeName(assetType)}/details/${id}`);
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

  handleSubmit(e) {
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

  render() {
    const {getFieldDecorator} = this.props.form;
    const {resources:{data, meta:{total}}} = this.props;

    const thumbItemLayout = {
      xs: {span: 6},
      lg: {span: 4}
    };

    const pager = {
      'defaultCurrent': 1,
      "current": this.state.query.pageNum,
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
      onChange: (pageNum)=> {
        this.refresh("pager", {"pageNum": pageNum});
      }
    };

    const renderAuthType = (type) => {
      switch (type) {
        case 1:
          return <Tag color="red">RM</Tag>;
        case 2:
          return <Tag color="red">RF</Tag>;
        case 3:
          return <Tag color="red">RR</Tag>;
      }
    };

    const renderAssetType = (type) => {
      switch (type) {
        case 1:
          return <Tag>图片</Tag>;
        case 2:
          return <Tag>音频</Tag>;
        case 3:
          return <Tag>视频</Tag>;
        case 4:
          return <Tag>组照</Tag>;
      }
    };

    return (
      <div>
        <CategoryMenu />
        <div className="ant-layout-content">
          <div className="text-center">
            <Form inline className="pad-bottom search-box" onSubmit={this.handleSubmit.bind(this)}>
              <FormItem>
                {getFieldDecorator('phrase', {
                  initialValue: this.state.query.phrase,
                })(
                  <Input size="large" placeholder="输入您要找的关键词" style={{width: 300}}/>
                )}
              </FormItem>
              <FormItem label="申请日期">
                {getFieldDecorator('timeBucket ', {
                  onChange: (val) => {
                    if (val.length) {
                      this.state.query.startDate = JSON.stringify(val[0]).substr(1, 10);
                      this.state.query.endDate = JSON.stringify(val[1]).substr(1, 10);
                    }else{
                      delete this.state.query.startDate;
                      delete this.state.query.endDate;
                      this.queryList();
                    }
                  }
                })(
                  <RangePicker style={{width: 200}}/>
                )}
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit" size="large"><Icon type="search"/> 搜索</Button>
              </FormItem>
              <FormItem>
                {getFieldDecorator('resType', {
                  initialValue: this.state.query.resType,
                  onChange: (value) => {
                    this.state.query.resType = value;
                    this.queryList();
                  }
                })(
                  <Select style={{width: 70}} size="large">
                    <Option value="">全部</Option>
                    <Option value="1">图片</Option>
                    <Option value="2">音频</Option>
                    <Option value="3">视频</Option>
                    <Option value="4">组图</Option>
                  </Select>
                )}
              </FormItem>
            </Form>
          </div>
          <div className="pad-bottom">
            <Button type="primary" size="large" className="gap-right"><Link to={'/upload/index'}><Icon type="upload"/>
              上传资源</Link></Button>
            <Button type="ghost" size="large"><Link to={'/imageGroup/upload'}><Icon type="hdd"/> 合并组照</Link></Button>
          </div>
	  {!data.length && <div className="text-center">
            暂无数据...
          </div>}
          <Row gutter={24}>
            {data && data.map(item =>
              <Col {...thumbItemLayout}>
                <div className="thumb-list-item">
                  <div className="thumb-list-item-img" onClick={this.goToDetails.bind(this, item.assetType, item.id)}>
                    {(() => {
                      switch (item.assetType) {
                        case 1:
                          return <p><img src={item.ossid2Url} className="hidden"/><img src={item.ossid2Url}
                                                                                       alt="item.name"/>
                          </p>;
                        case 2:
                          return <p><img src={item.ossid3} className="hidden"/><img src={item.ossid3} alt="item.name"/>
                          </p>;
                        case 3:
                          return <p><img src={defaultVideoThumb} className="hidden"/><img src={defaultVideoThumb} alt="item.name"/>
                          </p>;
                        case 4:
                          return <p><img src={item.ossId2} className="hidden"/><img src={item.ossId2} alt="item.name"/>
                          </p>;
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
                      <span className="ant-btn ant-btn-primary ant-btn-icon-only"><Icon type="eye-o"/></span>
                      <span className="ant-btn ant-btn-icon-only"><Icon type="download"/></span>
                    </div>
                  </div>

                  <div className="thumb-list-item-badges">
                    {item.copyrightObj && renderAuthType(item.copyrightObj.authType)}
                    {item.assetType && renderAssetType(item.assetType)}
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

UploadList.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {resources} = state;
  return {
    resources
  };
}

export default connect(mapStateToProps)(CreateForm()(UploadList));
