import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import CustomTable from './../../components/CustomTable';

import { fetchUsers } from './../../actions/users';
import { Form, Input, Row, Col, Button } from 'antd';
const FormItem = Form.Item;
const ButtonGroup = Button.Group;

import './UsersPage.scss';
// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
  const { users } = state;
  return {
    users
  };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
  // bindActionCreators(ActionCreators, dispatch)
  return {
    fetchUsers: (params) => dispatch(fetchUsers(params))
  };
}

export class UsersPage extends React.Component {
  static propTypes = {
    fetchUsers: React.PropTypes.func,
    users: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.state = {
      selectedRowKeys: []
    };
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  handleTableChange(pagination, filters = {}, sorter = {}) {
    const pageParams = { page: pagination.current, per_page: pagination.pageSize };
    const filtersField = {};
    if(Object.keys(filters).length !== 0) {
      // enum filters
      [{
        key: "roles", filterParams: "roles_in"
      }].map(item => {
        if(filters[item.key]){
          filtersField[`q[${item.filterParams}]`] = filters[item.key];
        }
      });

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
    this.props.fetchUsers(params);
  }

  render() {
    const { users: { data, meta, isFetching } } = this.props;
    const columns = [
      {
        title: "用户帐号",
        dataIndex: "account",
        key: "account",
        sorter: true
      },
      {
        title: "用户姓名",
        dataIndex: "name",
        key: "name",
        sorter: true
      },
      {
        title: "手机号",
        dataIndex: "phone",
        key: "phone",
        sorter: true
      },
      {
        title: "公司名称",
        dataIndex: "company",
        key: "company",
        sorter: true
      },
      {
        title: "申请时间",
        dataIndex: "created_at",
        key: "created_at",
        sorter: true
      },
      {
        title: "定制产品",
        dataIndex: "products",
        key: "products",
        sorter: true
      },
      {
        title: '操作',
        key: 'operation',
        render: () => (
          <ButtonGroup>
            <Button type="primary">启用</Button>
            <Button type="ghost">停用</Button>
          </ButtonGroup>
        )
      }
    ];

    const pagination = {
      showSizeChanger: true,
      total: meta.total,
      pageSize: meta.perPage,
      pageSizeOptions: ['5','10','20','40']
    };

    return (
      <div>
        <Form inline className="ant-advanced-search-form">
          <FormItem label="用户帐号">
            <Input placeholder="请输入帐号" size="default" />
          </FormItem>
          <FormItem label="用户姓名">
            <Input placeholder="请输入姓名" size="default" />
          </FormItem>
          <FormItem label="手机号">
            <Input placeholder="请输入手机号" size="default" />
          </FormItem>
          <Button type="primary" htmlType="submit">搜索</Button>
          <Button>清除</Button>
        </Form>
        <Row>
          <Col span={8}>
            <div style={{ marginBottom: 16 }}>
              <Button type="primary"><Link to={'/user/new'}>添加用户</Link></Button>
            </div>
          </Col>
        </Row>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersPage);
