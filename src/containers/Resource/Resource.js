import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Row, Col, Button, Select } from 'antd';
import { Link } from 'react-router';

import CustomTable from './../../components/CustomTable';

const CreateForm = Form.create;
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const Option = Select.Option;
const InputGroup = Input.Group;

import './Resource.scss';

class Resource extends Component {
  constructor(props) {
    super(props);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.state = {
      selectedRowKeys: [],
      res: {
        list: [],
        meta: {

        },
        isFetching: false
      }
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

  render() {
    // const { res: { meta, isFetching } } = this.props;

    const addonBefore = (
      <Select defaultValue="全部" className="search-box">
        <Option value="图片">图片</Option>
        <Option value="组图">组图</Option>
        <Option value="视频">视频</Option>
        <Option value="音频">音频</Option>
      </Select>
    );

    const columns = [{
      title: "ID",
      dataIndex: "id",
      key: "id"
    },{
      title: "邮箱",
      dataIndex: "email",
      key: "email"
    },{
      title: "姓名",
      dataIndex: "name",
      key: "name",
      sorter: true
    },{
      title: "角色",
      dataIndex: "roles",
      key: "roles",
      sorter: true
    },{
      title: "创建时间",
      dataIndex: "created_at",
      key: "created_at",
      sorter: true,
    },{
      title: '操作',
      key: 'operation',
      render: () => (
        <ButtonGroup>
          <Button type="primary">操作一</Button>
          <Button type="ghost">操作二</Button>
        </ButtonGroup>
      )
    }
    ];

    const pagination = {
      showSizeChanger: true,
      total: 10,
      pageSize: 10,
      pageSizeOptions: ['5','10','20','40']
    };

    const list =[];

    const isFetching = false;

    return (
      <div>
        <Form horizontal>
          <Row>
            <Col span={14} offset={5}>
              <div className="search-box">
                <InputGroup>
                  <Input className="ant-search-input" addonBefore={addonBefore} />
                  <div className="ant-input-group-wrap">
                    <Button type="primary" className="ant-search-btn">搜索</Button>
                  </div>
                </InputGroup>
              </div>
            </Col>
          </Row>
          <Row className="pad-v">
            <Col span={12}>
              <ButtonGroup>
                <Button icon="bars" type="ghost" size="large"/>
                <Button icon="appstore-o" type="ghost" size="large"/>
              </ButtonGroup>
            </Col>
            <Col span={12} className="text-right">
              <ButtonGroup>
                <Button type="primary" size="large">上传资源</Button>
                <Button type="ghost" size="large">新建组照</Button>
                <Button type="ghost" size="large">合并组照</Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Form>
        <CustomTable
          columns={columns}
          dataSource={list}
          pagination={pagination}
          loading={isFetching}
          onChange={this.handleTableChange}
          bordered
        />
      </div>
    )
  }
}

Resource.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { res } = state;
  return {
    res
  };
}

export default connect(mapStateToProps)(CreateForm()(Resource));
