import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Row, Col, Button } from 'antd';
import { Link } from 'react-router';

import CustomTable from '../../../components/CustomTable';
import { queryUsers } from '../../../actions/users';

const CreateForm = Form.create;
const FormItem = Form.Item;
const ButtonGroup = Button.Group;

import './style.scss';

class Users extends Component {
  constructor(props) {
    super(props);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.state = {
      selectedRowKeys: []
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(queryUsers())
  }

  handleTableChange(pagination, filters = {}, sorter = {}) {
    const { dispatch } = this.props;
    const pageParams = { pageNum: pagination.current, pageSize: pagination.pageSize };
    const filtersField = {};
    if(Object.keys(filters).length !== 0) {

      // date range filter
      ['created_at'].map(item => {
        if(filters[item]){
          filtersField[`q[${item}_gteq]`] = filters[item][0];
          filtersField[`q[${item}_lteq]`] = filters[item][1];
        }
      });

      // string filter
      ['name'].map(item => {
        if(filters[item]){
          filtersField[`q[${item}_cont]`] = filters[item];
        }
      });
    }
    const sortParams = {};
    if (Object.keys(sorter).length !== 0) {
      const sortMethod = sorter.order === "descend" ? "desc" : "asc";
      sortParams['sorts'] = `${sorter.columnKey} ${sortMethod}`;
    }

    const params = Object.assign({}, pageParams, filtersField, sortParams);

    dispatch(queryUsers(params))
  }

  render() {
    const { users: { data, meta, isFetching } } = this.props;
    const roleFilter = [{
      text: '管理员',
      value: 'admin'
    },{
      text: "普通用户",
      value: "normal"
    }];
    const columns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id"
      },
      {
        title: "邮箱",
        dataIndex: "email",
        key: "email"
      },
      {
        title: "姓名",
        dataIndex: "name",
        key: "name",
        sorter: true,
        filterDropdown: <StringFilterDropdown columnKey={"name"}/>
      },
      {
        title: "角色",
        dataIndex: "roles",
        key: "roles",
        sorter: true,
        filters: roleFilter
      },
      {
        title: "创建时间",
        dataIndex: "created_at",
        key: "created_at",
        sorter: true,
        filterDropdown: <DateTimeFilterDropdown columnKey={"created_at"}/>
      },
      {
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
      total: meta.total,
      pageSize: meta.pageSize,
      pageSizeOptions: ['5','10','20','40']
    };

    const formItemLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 }
    };

    return (
      <div>
        <Form horizontal className="ant-advanced-search-form">
          <Row gutter={16}>
            <Col sm={8}>
              <FormItem label="用户帐号" {...formItemLayout} >
                <Input placeholder="请输入产品名称" size="default" />
              </FormItem>
            </Col>
            <Col sm={8}>
              <FormItem label="用户姓名" {...formItemLayout}>
                <Input placeholder="请输入搜索名称" size="default" />
              </FormItem>
            </Col>
            <Col sm={8}>
              <FormItem label="手机号" {...formItemLayout}>
                <Input placeholder="请输入搜索名称" size="default" />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12} offset={12} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">搜索</Button>
              <Button>清除条件</Button>
            </Col>
          </Row>
        </Form>
        <div className="pad-v">
          <Button type="primary"><Link to={'/user/create'}>添加用户</Link></Button>
        </div>
        <CustomTable
          columns={columns}
          dataSource={data}
          pagination={pagination}
          loading={isFetching}
          onChange={this.handleTableChange}
          bordered
        />
      </div>
    );
  }
}

Users.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { users } = state;
  return {
    users
  };
}

export default connect(mapStateToProps)(CreateForm()(Users));
