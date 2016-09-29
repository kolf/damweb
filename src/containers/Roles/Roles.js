/**
 * Created by lirui on 2016/9/29.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Row, Col, Button } from 'antd';
import { Link } from 'react-router';

import CustomTable from './../../components/CustomTable';
import { listOrgRoles } from './../../actions/roles';

const CreateForm = Form.create;
const FormItem = Form.Item;
const ButtonGroup = Button.Group;

class Roles extends Component {


  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(listOrgRoles());
  }

  render() {
    console.log(this.props);
    const { roles: { data, meta, isFetching } } = this.props;

    const columns = [{
      title: "角色名称",
      dataIndex: "roleName",
      key: "roleName",
      sorter: true
    },{
      title: "角色代码",
      dataIndex: "roleCode",
      key: "roleCode",
      sorter: true
    },{
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      sorter: true
    },{
      title: "角色说明",
      dataIndex: "remark",
      key: "remark",
      sorter: true
    }];

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
      <Row>
      <Col span={8}>
      <div style={{ marginBottom: 16 }}>
            <Button type="primary"><Link to={'/addRole'}>添加角色</Link></Button>
      </div>
      </Col>
      </Row>


        <CustomTable
          columns={columns}
          dataSource={data}
          pagination={pagination}
          loading={isFetching}
          bordered
          />

        </div>

    );
  }


}



Roles.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { roles } = state;
  return {
    roles
  };
}

export default connect(mapStateToProps)(CreateForm()(Roles));
