import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import CustomTable from './../../components/CustomTable';

import { queryProducts } from '../../actions/products';
import { Form, Input, Row, Col, Button, InputNumber } from 'antd';
const FormItem = Form.Item;
const ButtonGroup = Button.Group;

import './Products.scss';

function mapStateToProps(state) {
  const { products } = state;
  return {
    products
  };
}

function mapDispatchToProps(dispatch) {
  return {
    queryPdoducts: (params) => dispatch(queryProducts(params))
  };
}

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.handleTableChange = this.handleTableChange.bind(this);
  }

  componentDidMount() {
    this.props.queryPdoducts();
  }

  handleTableChange(pagination, filters = {}, sorter = {}) {
    const pageParams = { pageNum: pagination.current, pageSize: pagination.pageSize };
    const filtersField = {};
    if(Object.keys(filters).length !== 0) {
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
    this.props.queryPdoducts(params);
  }


  render() {
    const { products: { data, meta, isFetching } } = this.props;
    const columns = [
      {
        title: "产品名称",
        dataIndex: "name",
        key: "name",
        sorter: true
      },
      {
        title: "产品限定人数(人)",
        dataIndex: "people",
        key: "people",
        sorter: true
      },
      {
        title: "产品使用周期(月)",
        dataIndex: "period",
        key: "period",
        sorter: true
      },
      {
        title: "产品存储空间(G)",
        dataIndex: "space",
        key: "space",
        sorter: true
      },
      {
        title: "产品价格(元)",
        dataIndex: "price",
        key: "price",
        sorter: true
      },
      {
        title: "产品介绍",
        dataIndex: "intro",
        key: "intro",
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
      pageSize: meta.pageSize,
      pageSizeOptions: ['5','10','20','40']
    };

    return (
      <div>
        <Form inline className="ant-advanced-search-form">
          <FormItem label="产品名称">
            <Input placeholder="请输入产品名称" size="default" />
          </FormItem>
          <FormItem label="限定人数(人)">
            <InputNumber min={1} max={10}/>
          </FormItem>
          <FormItem label="使用周期(月)">
            <InputNumber min={1} max={10} defaultValue={12}/>
          </FormItem>
          <FormItem label="存储空间(G)">
            <InputNumber min={1} max={10}/>
          </FormItem>
          <Button type="primary" htmlType="submit">搜索</Button>
          <Button>清除</Button>
        </Form>
        <Row>
          <Col span={8}>
            <div style={{ marginBottom: 16 }}>
              <Button type="primary"><Link to={'/product/create'}>添加产品</Link></Button>
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
)(ProductList);
