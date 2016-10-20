import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Form, Input, Row, Col, Menu, Dropdown, Button, Icon, Select, Card, Tag, Pagination, Tooltip} from 'antd';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';

import CategoryMenu from '../../../components/CategoryMenu';
import {queryResource} from '../../../actions/queryResource';
import Video from 'react-html5video';

const CreateForm = Form.create;
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const Option = Select.Option;
const InputGroup = Input.Group;

import './style.scss';

class UploadList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: {
        auditStatus: 5,
        pageNum: 1,
        pageSize: '24',
      }
    };
  }

  componentDidMount() {
    this.queryList();
  }

  queryList(params) {
    const {dispatch} = this.props;
    dispatch(queryResource(this.state.query));
  }

  refresh(type, params) {
    let query = this.state.query;
    if (type === 'pager') {
      Object.assign(query, this.state.query, params);
    } else if (type === 'auditStatus') {
      console.log(type);
      Object.assign(query, this.state.query, params, {'pageNum': 1});
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

  render() {
    const _this = this;
    const {getFieldDecorator} = this.props.form;
    const {resources:{data, meta:{total}}} = this.props;

    const thumbItemLayout = {
      xs: {span: 6},
      lg: {span: 4}
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
      onShowSizeChange(pageNum, pageSize) {
        _this.refresh("pager", {"pageNum": pageNum, "pageSize": pageSize});
      },
      onChange(pageNum) {
        _this.refresh("pager", {"pageNum": pageNum});
      }
    };

    return (
      <div>
        <CategoryMenu />
        <div className="ant-layout-content">
          <div className="text-center">
            <Form inline className="pad-bottom search-box" onSubmit={this.handleSubmit}>
              <FormItem>
                {getFieldDecorator('phrase ', {})(
                  <Input size="large" placeholder="输入您要找的关键词" style={{width: 400}}/>
                )}
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit" size="large"><Icon type="search"/> 搜索</Button>
              </FormItem>
              <FormItem>
                {getFieldDecorator('auditStatus ', {initialValue: ''})(
                  <Select style={{width: 70}} size="large">
                    <Option value="">全部</Option>
                    <Option value="1">图片</Option>
                    <Option value="2">音频</Option>
                    <Option value="3">视频</Option>
                    <Option value="4">组图</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem>
                <Button size="large">清空</Button>
              </FormItem>
            </Form>
          </div>
          <div className="pad-bottom">
            <Button type="primary" size="large" className="gap-right"><Link to={'/upload/index'}><Icon type="upload"/>
              上传资源</Link></Button>
            <Button type="ghost" size="large"><Link to={'/imageGroup/upload'}><Icon type="hdd"/> 合并组照</Link></Button>
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
                            <source src={item.ossIdUrl2} type="video/flv"/>
                          </Video>;
                        case 4:
                          return <p><img src={item.ossId2} className="hidden"/><img src={item.ossId2} alt="item.name"/>
                          </p>;
                      }
                    })()}
                  </div>
                  <div className="thumb-list-item-text">{(() => {
                    switch (item.assetType) {
                      case 1:
                        return item.title
                      case 2:
                        return item.displayName
                      case 3:
                        return item.displayName
                      case 4:
                        return item.title
                    }
                  })()}
                    <div className="thumb-list-item-btns ant-btn-group ant-btn-group-sm">
                      <span className="ant-btn ant-btn-primary ant-btn-icon-only"><Icon type="eye-o"/></span>
                      <span className="ant-btn ant-btn-icon-only"><Icon type="download"/></span>
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
