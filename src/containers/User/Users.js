import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Row, Col, Button } from 'antd';
import { Link } from 'react-router';

import CustomTable from './../../components/CustomTable';
import { queryUsers } from './../../actions/users';

const CreateForm = Form.create;
const FormItem = Form.Item;
const ButtonGroup = Button.Group;

import './Users.scss';

class Users extends Component {
  constructor(props) {
    super(props);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      query: {
        pageSize: 10,
        pageNum: 1
      }
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const { dispatch } = this.props;
    const creds = (this.props.form.getFieldsValue());
      dispatch(queryUsers(creds));

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
    console.log(this.props);
    const { users: { data, meta, isFetching } } = this.props;

    const columns = [{
        title: "用户帐号",
        dataIndex: "damId",
        key: "damId",
        sorter: true
      },{
        title: "用户姓名",
        dataIndex: "userName",
        key: "userName",
        sorter: true
      },{
        title: "手机号",
        dataIndex: "phone",
        key: "phone",
        sorter: true
      },{
        title: "公司名称",
        dataIndex: "company",
        key: "company",
        sorter: true
      },{
        title: "申请时间",
        dataIndex: "created_at",
        key: "created_at",
        sorter: true
      },{
        title: "定制产品",
        dataIndex: "products",
        key: "products",
        sorter: true
      },{
        title: '操作',
        key: 'operation',
        render: (item) => (
          <ButtonGroup>
            <Button htmlType="submit"><Link to={`/authUser/${item.damId}`}>分配角色</Link></Button>
          </ButtonGroup>
        )
      }
    ];

    const pagination = {
      showSizeChanger: true,
      total: meta.total,
      pageSize: this.state.query.pageSize,
      page: this.state.query.pageNum,
      pageSizeOptions: ['10', '20', '40', '100'],
    };

    const formItemLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 }
    };

    return (
      <div>
        <div className="ant-layout-content">
        <Form horizontal className="ant-advanced-search-form" onSubmit={this.handleSubmit}>
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
        <Row>
          <Col span={8}>
            <div style={{ marginBottom: 16 }}>
              <Button type="primary"><Link to={'/addUser'}>添加用户</Link></Button>
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
          size="small"
        />
          </div>
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
