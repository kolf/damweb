import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Row, Col, Menu, Dropdown, Button, Icon, Select, Card, Tag, Pagination, Tooltip } from 'antd';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

import ClassifyMenu from '../../../components/ClassifyMenu';
import {queryResource} from '../../../actions/queryResource';

const CreateForm = Form.create;
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const Option = Select.Option;
const InputGroup = Input.Group;

import './style.scss';

class UploadList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(queryResource())
  }

  goToDetails(e) {
    browserHistory.push('/imageGroup/details')
  }

  render() {
    const { getFieldProps } = this.props.form;
    const { resources:{data, meta:{pageSize, pageNum, total}} } = this.props;
    // const { resources: {data, meta:{ pageSize, pageNum, total}}} = this.state;

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
                <div className="thumb-list-item">
                  <div className="thumb-list-item-img">
                    <p>
                      <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" className="hidden"/>
                      <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt=""/>
                    </p>
                  </div>
                  <div className="thumb-list-item-text">
                    {item.displayName}
                  </div>
                  <div className="thumb-list-item-btns">
                    <Link className="ant-btn ant-btn-primary ant-btn-icon-only" to={'/image/details'}><Icon type="eye-o" /></Link>
                    <Link className="ant-btn ant-btn-icon-only" to={'/image/details'}><Icon type="download" /></Link>
                  </div>
                  <div className="thumb-list-item-badges">
                    <Tag color="red">RM</Tag>
                    <Tag>{item.assetType}</Tag>
                  </div>
                </div>
              </Col>
            )}
          </Row>
          <div className="pager pad-v text-right">
            <Pagination showQuickJumper pageSize={pageSize} defaultCurrent={pageNum} total={total} />
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
