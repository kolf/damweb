import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Row, Col, Menu, Dropdown, Button, Icon, Select, Card, Tag, Pagination, Tooltip } from 'antd';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

import ClassifyMenu from '../../../components/ClassifyMenu';
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
    this.state={
      pageNum: 1,
      pageSize: 18
    }
  }

  componentDidMount() {
    this.queryList({
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize
    });
  }

  goToDetails(e) {
    browserHistory.push('/imageGroup/details')
  }

  queryList (params) {
    const { dispatch } = this.props;
    dispatch(queryResource(params));
  }

  refresh(pager, {pageNum, pageSize}){
    this.setState({pageNum, pageSize});
    this.queryList({pageNum, pageSize});
  }

  render() {
    const _this =this;
    const { getFieldProps } = this.props.form;
    const { resources:{data, meta:{total}} } = this.props;

    const thumbItemLayout = {
      xs: { span: 6 },
      lg: { span: 4 }
    };

    const pager ={
      "page": this.state.pageNum,
      "pageSize": '18',
      "total": total,
      "showSizeChanger": true,
      "showQuickJumper": true,
      "pageSizeOptions": ['18', '36'],
      "showTotal": () => {
        return '共 '+total+' 条';
      },
      onShowSizeChange(pageNum, pageSize) {
        _this.refresh("pager",{"pageNum":pageNum,"pageSize":pageSize});
      },
      onChange(pageNum) {
        _this.refresh("pager",{"pageNum":pageNum});
      }
    };

    return (
      <div>
        <ClassifyMenu />
        <div className="ant-layout-content">
          <div className="text-center">
            <Form inline className="pad-bottom search-box" onSubmit={this.handleSubmit}>
              <FormItem>
                <Input size="large" {...getFieldProps('phrase')} placeholder="输入您要找的关键词" style={{width: 400}}/>
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit" size="large"><Icon type="search" /> 搜索</Button>
              </FormItem>
              <FormItem>
                <Select style={{width:70}} size="large" defaultValue="all" {...getFieldProps('phrase', {initialValue: ''})}>
                  <Option value="">全部</Option>
                  <Option value="1">图片</Option>
                  <Option value="2">音频</Option>
                  <Option value="3">视频</Option>
                  <Option value="4">组图</Option>
                </Select>
              </FormItem>
              <FormItem>
                <Button size="large">清空</Button>
              </FormItem>
            </Form>
          </div>
          <div className="pad-bottom">
            <Button type="primary" size="large" className="gap-right"><Link to={'/upload/index'}><Icon type="upload" /> 上传资源</Link></Button>
            <Button type="ghost" size="large"><Link to={'/imageGroup/upload'}><Icon type="hdd" /> 合并组照</Link></Button>
          </div>
          <Row gutter={24}>
            {data.map(item =>
              <Col {...thumbItemLayout}>
                <Link to={'/'+(()=>{
                  switch (item.assetType) {
                    case 1: return `image/details/${item.id}`;
                    case 2: return `audio/details/${item.id}`;
                    case 3: return `video/details/${item.id}`;
                  }
                })()}>
                <div className="thumb-list-item">
                  <div className="thumb-list-item-img">
                    {(() => {
                      switch (item.assetType) {
                        case 1: return <p><img src={item.ossId2} className="hidden"/><img src={item.ossId2} alt="item.name"/></p>;
                        case 2: return <p><img src={item.ossid3} className="hidden"/><img src={item.ossid3} alt="item.name"/></p>;
                        case 3: return <Video controls muted><source src="http://kmg.oss-cn-beijing.aliyuncs.com/dam/v/c52f5e37-a2f9-4805-887d-52c6cb0d7830.mp4?Expires=1475506208&OSSAccessKeyId=LTAId4pMnCWmqJnP&Signature=qz394GbQkwr1Lv4gl81uiVdGeSk%3D" type="video/mp4" /></Video>;
                      }
                    })()}
                  </div>
                  <div className="thumb-list-item-text">{item.displayName}<div className="thumb-list-item-btns ant-btn-group ant-btn-group-sm">
                    <Link className="ant-btn ant-btn-primary ant-btn-icon-only" to={'/image/details'}><Icon type="eye-o" /></Link>
                    <a className="ant-btn ant-btn-icon-only" target="_block" href={item.ossId}><Icon type="download" /></a>
                  </div></div>

                  <div className="thumb-list-item-badges">
                    {item.conType ? <Tag color="red">RM</Tag> : ''}
                    <Tag>{(() => {
                      switch (item.assetType) {
                        case 1: return "图片";
                        case 2: return "音频";
                        case 3: return "视频";
                      }
                    })()}
                    </Tag>
                  </div>
                </div>
                </Link>
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
  const { resources } = state;
  return {
    resources
  };
}

export default connect(mapStateToProps)(CreateForm()(UploadList));
