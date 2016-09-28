import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Row, Col, Menu, Dropdown, Button, Icon, Select, Card, Tag, Pagination, Tooltip } from 'antd';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

import ClassifyMenu from '../../../components/ClassifyMenu';
import {queryUsers} from '../../../actions/users';

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

    };
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(queryUsers())
  }

  goToDetails(e) {
    browserHistory.push('/imageGroup/details')
  }



  render() {
    const { getFieldProps } = this.props.form;

    const thumbItemLayout = {
      xs: { span: 6 },
      lg: { span: 4 }
    };

    return (
      <div>
        <ClassifyMenu />
        <div className="ant-layout-content">
          <div className="text-center">
            <Form inline className="pad-bottom search-box" onSubmit={this.handleSubmit}>
              <FormItem>
                <Input size="large" {...getFieldProps('keyWords')} placeholder="输入您要找的关键词" style={{width: 400}}/>
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit" size="large"><Icon type="search" /> 搜索</Button>
              </FormItem>
              <FormItem>
                <Select style={{width:70}} size="large" defaultValue="all" {...getFieldProps('type', {initialValue: 'all'})}>
                  <Option value="all">全部</Option>
                  <Option value="video">视频</Option>
                  <Option value="audio">音频</Option>
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
                  <Link className="ant-btn ant-btn-primary ant-btn-icon-only" to={'/image/details'}><Icon type="eye-o" /></Link>
                  <Link className="ant-btn ant-btn-icon-only" to={'/image/details'}><Icon type="download" /></Link>
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
                  <Tooltip placement="topLeft" title="查看"><Link className="ant-btn ant-btn-primary ant-btn-icon-only" to={'/imageGroup/details'}><Icon type="eye-o" /></Link></Tooltip>
                  <Tooltip placement="topLeft" title="下载"><Link className="ant-btn ant-btn-icon-only" to={'/image/details'}><Icon type="download" /></Link></Tooltip>
                </div>
                <div className="thumb-list-item-badges">
                  <Tag color="red">RM</Tag><Tag>组图</Tag>
                </div>
              </div>
            </Col>
            <Col {...thumbItemLayout}>
              <div className="thumb-list-item active">
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
                  <Link className="ant-btn ant-btn-primary ant-btn-icon-only" to={'/video/details'}><Icon type="eye-o" /></Link>
                  <Link className="ant-btn ant-btn-icon-only" to={'/image/details'}><Icon type="download" /></Link>
                </div>
                <div className="thumb-list-item-badges">
                  <Tag color="red">RF</Tag><Tag>视频</Tag>
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
                  <Link className="ant-btn ant-btn-primary ant-btn-icon-only" to={'/audio/details'}><Icon type="eye-o" /></Link>
                  <Link className="ant-btn ant-btn-icon-only" to={'/image/details'}><Icon type="download" /></Link>
                </div>
                <div className="thumb-list-item-badges">
                  <Tag color="red">RM</Tag><Tag>音频</Tag>
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

UploadList.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { res } = state;
  return {
    res
  };
}

export default connect(mapStateToProps)(CreateForm()(UploadList));
