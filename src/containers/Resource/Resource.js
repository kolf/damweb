import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Row, Col, Menu, Dropdown, Button, Icon, Select, Card, Tag, Pagination } from 'antd';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

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

  goToEdit(e) {
    // console.log('click', e);
    browserHistory.push('/edit/imageGroup')
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

    const list =[{
      url: 'http://placehold.it/200x160',
      name: '假装是图片',
      tags: '关健字',
      class: '新闻图片',
      copyright: 'index.pdf',
      author: '视觉中国',
      create_date: '2016-9-21'
    },{
      url: 'http://placehold.it/200x160',
      name: '假装是图片',
      tags: '关健字',
      class: '新闻图片',
      copyright: 'index.pdf',
      author: '视觉中国',
      create_date: '2016-9-21'
    },{
      url: 'http://placehold.it/200x160',
      name: '假装是图片',
      tags: '关健字',
      class: '新闻图片',
      copyright: 'index.pdf',
      author: '视觉中国',
      create_date: '2016-9-21'
    },{
      url: 'http://placehold.it/200x160',
      name: '假装是图片',
      tags: '关健字',
      class: '新闻图片',
      copyright: 'index.pdf',
      author: '视觉中国',
      create_date: '2016-9-21'
    },{
      url: 'http://placehold.it/200x160',
      name: '假装是图片',
      tags: '关健字',
      class: '新闻图片',
      copyright: 'index.pdf',
      author: '视觉中国',
      create_date: '2016-9-21'
    }];

    const isFetching = false;
    const columns = [{
      title: "",
      key: "url",
      width: 220,
      render: (list) => <img src={list.url} alt=""/>
    },{
      title: "名称",
      dataIndex: "name",
      key: "name",
      sorter: true
    },{
      title: "关健字",
      dataIndex: "tags",
      key: "tags",
      sorter: true
    },{
      title: "分类",
      dataIndex: "class",
      key: "class",
      sorter: true
    },{
      title: "版权信息",
      dataIndex: "copyright",
      key: "copyright",
      sorter: true
    },{
      title: "上传人",
      dataIndex: "author",
      key: "author",
      sorter: true
    },{
      title: "上传日期",
      dataIndex: "create_date",
      key: "create_date",
      sorter: true
    },{
      title: '操作',
      key: 'operation',
      render: () => (
        <div>
          <Button type="primary">编辑</Button>
          <Button className="gap-left" type="ghost">下载</Button>
        </div>
      )
    }];

    const rowSelection = {
      onChange(selectedRowKeys, selectedRows) {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      onSelect(record, selected, selectedRows) {
        console.log(record, selected, selectedRows);
      },
      onSelectAll(selected, selectedRows, changeRows) {
        console.log(selected, selectedRows, changeRows);
      },
    };

    const pagination = {
      showSizeChanger: true,
      total: 10,
      pageSize: 10,
      pageSizeOptions: ['5','10','20','40']
    };

    function handleButtonClick(e) {
      console.log('click left button', e.Target);
    }

    function handleMenuClick(e) {
      console.log('click', e);
    }

    const menu = (
      <Menu onClick={handleMenuClick}>
        <Menu.Item key="1"><Link to={'/upload/imageGroup'}>上传组图</Link></Menu.Item>
        <Menu.Item key="2"><Link to={'/upload/image'}>上传图片</Link></Menu.Item>
        <Menu.Item key="3"><Link to={'/upload/video'}>上传视频</Link></Menu.Item>
      </Menu>
    );

    return (
      <div>
        <Row className="pad-bottom">
          <Col span={12}>
            <Button type="primary" size="large" className="gap-right"><Link to={'/upload/index'}>上传资源</Link></Button>
            <Button type="ghost" size="large"><Link to={'/upload/imageGroup'}>合并组照</Link></Button>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xs={{ span: 6}} lg={{ span: 4 }} className="thumb-list-item">
            <Card bodyStyle={{ padding: 6 }}>
              <div className="custom-image" style={{backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png)'}}></div>
              <div className="custom-card">
                <h3>图片标题，超出隐藏...</h3>
                <p><Tag>图片</Tag><Tag color="red">RM</Tag>
                  <ButtonGroup size="small" className="pull-right">
                  <Button type="ghost" icon="edit" onClick={this.goToEdit}/>
                  <Button type="ghost" icon="download"/>
                </ButtonGroup>
                </p>
              </div>
            </Card>
          </Col>
          <Col xs={{ span: 6}} lg={{ span: 4 }} className="thumb-list-item">
            <Card bodyStyle={{ padding: 6 }}>
              <div className="custom-image" style={{backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png)'}}></div>
              <div className="custom-card">
                <h3>图片标题，超出隐藏...</h3>
                <p><Tag>图片</Tag><Tag color="red">RM</Tag>
                  <ButtonGroup size="small" className="pull-right">
                  <Button type="ghost" icon="edit" onClick={this.goToEdit}/>
                  <Button type="ghost" icon="download"/>
                </ButtonGroup>
                </p>
              </div>
            </Card>
          </Col>
          <Col xs={{ span: 6}} lg={{ span: 4 }} className="thumb-list-item">
            <Card bodyStyle={{ padding: 6 }}>
              <div className="custom-image" style={{backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png)'}}></div>
              <div className="custom-card">
                <h3>图片标题，超出隐藏...</h3>
                <p><Tag>图片</Tag><Tag color="red">RM</Tag>
                  <ButtonGroup size="small" className="pull-right">
                  <Button type="ghost" icon="edit" onClick={this.goToEdit}/>
                  <Button type="ghost" icon="download"/>
                </ButtonGroup>
                </p>
              </div>
            </Card>
          </Col>
          <Col xs={{ span: 6}} lg={{ span: 4 }} className="thumb-list-item active">
            <Card bodyStyle={{ padding: 6 }}>
              <div className="custom-image" style={{backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png)'}}></div>
              <div className="custom-card">
                <h3>图片标题，超出隐藏...</h3>
                <p><Tag>图片</Tag><Tag color="red">RM</Tag>
                  <ButtonGroup size="small" className="pull-right">
                  <Button type="ghost" icon="edit" onClick={this.goToEdit}/>
                  <Button type="ghost" icon="download"/>
                </ButtonGroup>
                </p>
              </div>
            </Card>
          </Col>
          <Col xs={{ span: 6}} lg={{ span: 4 }} className="thumb-list-item">
            <Card bodyStyle={{ padding: 6 }}>
              <div className="custom-image" style={{backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png)'}}></div>
              <div className="custom-card">
                <h3>图片标题，超出隐藏...</h3>
                <p><Tag>图片</Tag><Tag color="red">RM</Tag>
                  <ButtonGroup size="small" className="pull-right">
                  <Button type="ghost" icon="edit" onClick={this.goToEdit}/>
                  <Button type="ghost" icon="download"/>
                </ButtonGroup>
                </p>
              </div>
            </Card>
          </Col>
          <Col xs={{ span: 6}} lg={{ span: 4 }} className="thumb-list-item">
            <Card bodyStyle={{ padding: 6 }}>
              <div className="custom-image" style={{backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png)'}}></div>
              <div className="custom-card">
                <h3>图片标题，超出隐藏...</h3>
                <p><Tag>图片</Tag><Tag color="red">RM</Tag>
                  <ButtonGroup size="small" className="pull-right">
                  <Button type="ghost" icon="edit" onClick={this.goToEdit}/>
                  <Button type="ghost" icon="download"/>
                </ButtonGroup>
                </p>
              </div>
            </Card>
          </Col>
          <Col xs={{ span: 6}} lg={{ span: 4 }} className="thumb-list-item">
            <Card bodyStyle={{ padding: 6 }}>
              <div className="custom-image" style={{backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png)'}}></div>
              <div className="custom-card">
                <h3>图片标题，超出隐藏...</h3>
                <p><Tag>视频</Tag><Tag color="red">RM</Tag>
                  <ButtonGroup size="small" className="pull-right">
                  <Button type="ghost" icon="edit" onClick={this.goToEdit}/>
                  <Button type="ghost" icon="download"/>
                </ButtonGroup>
                </p>
              </div>
            </Card>
          </Col>
          <Col xs={{ span: 6}} lg={{ span: 4 }} className="thumb-list-item">
            <Card bodyStyle={{ padding: 6 }}>
              <div className="custom-image" style={{backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png)'}}></div>
              <div className="custom-card">
                <h3>图片标题，超出隐藏...</h3>
                <p><Tag>音频</Tag>
                  <ButtonGroup size="small" className="pull-right">
                  <Button type="ghost" icon="edit" onClick={this.goToEdit}/>
                  <Button type="ghost" icon="download"/>
                </ButtonGroup>
                </p>
              </div>
            </Card>
          </Col>
          <Col xs={{ span: 6}} lg={{ span: 4 }} className="thumb-list-item">
            <Card bodyStyle={{ padding: 6 }}>
              <div className="custom-image" style={{backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png)'}}></div>
              <div className="custom-card">
                <h3>图片标题，超出隐藏...</h3>
                <p><Tag>图片</Tag><Tag color="red">RM</Tag>
                  <ButtonGroup size="small" className="pull-right">
                  <Button type="ghost" icon="edit" onClick={this.goToEdit}/>
                  <Button type="ghost" icon="download"/>
                </ButtonGroup>
                </p>
              </div>
            </Card>
          </Col>
          <Col xs={{ span: 6}} lg={{ span: 4 }} className="thumb-list-item">
            <Card bodyStyle={{ padding: 6 }}>
              <div className="custom-image" style={{backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png)'}}></div>
              <div className="custom-card">
                <h3>Lorem ipsum dolor</h3>
                <p><Tag>图片</Tag><Tag color="red">RM</Tag>
                  <ButtonGroup size="small" className="pull-right">
                  <Button type="ghost" icon="edit" onClick={this.goToEdit}/>
                  <Button type="ghost" icon="download"/>
                </ButtonGroup>
                </p>
              </div>
            </Card>
          </Col>
          <Col xs={{ span: 6}} lg={{ span: 4 }} className="thumb-list-item">
            <Card bodyStyle={{ padding: 6 }}>
              <div className="custom-image" style={{backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png)'}}></div>
              <div className="custom-card">
                <h3>图片标题，超出隐藏...</h3>
                <p><Tag>图片</Tag><Tag color="red">RM</Tag>
                  <ButtonGroup size="small" className="pull-right">
                  <Button type="ghost" icon="edit" onClick={this.goToEdit}/>
                  <Button type="ghost" icon="download"/>
                </ButtonGroup>
                </p>
              </div>
            </Card>
          </Col>
          <Col xs={{ span: 6}} lg={{ span: 4 }} className="thumb-list-item">
            <Card bodyStyle={{ padding: 6 }}>
              <div className="custom-image" style={{backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png)'}}></div>
              <div className="custom-card">
                <h3>图片标题，超出隐藏...</h3>
                <p><Tag>图片</Tag><Tag color="red">RM</Tag>
                  <ButtonGroup size="small" className="pull-right">
                  <Button type="ghost" icon="edit" onClick={this.goToEdit}/>
                  <Button type="ghost" icon="download"/>
                </ButtonGroup>
                </p>
              </div>
            </Card>
          </Col>
          <Col xs={{ span: 6}} lg={{ span: 4 }} className="thumb-list-item">
            <Card bodyStyle={{ padding: 6 }}>
              <div className="custom-image" style={{backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png)'}}></div>
              <div className="custom-card">
                <h3>图片标题，超出隐藏...</h3>
                <p><Tag>图片</Tag><Tag color="red">RM</Tag>
                  <ButtonGroup size="small" className="pull-right">
                  <Button type="ghost" icon="edit" onClick={this.goToEdit}/>
                  <Button type="ghost" icon="download"/>
                </ButtonGroup>
                </p>
              </div>
            </Card>
          </Col>
          <Col xs={{ span: 6}} lg={{ span: 4 }} className="thumb-list-item">
            <Card bodyStyle={{ padding: 6 }}>
              <div className="custom-image" style={{backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png)'}}></div>
              <div className="custom-card">
                <h3>图片标题，超出隐藏...</h3>
                <p><Tag>图片</Tag><Tag color="red">RM</Tag>
                  <ButtonGroup size="small" className="pull-right">
                  <Button type="ghost" icon="edit" onClick={this.goToEdit}/>
                  <Button type="ghost" icon="download"/>
                </ButtonGroup>
                </p>
              </div>
            </Card>
          </Col>
          <Col xs={{ span: 6}} lg={{ span: 4 }} className="thumb-list-item">
            <Card bodyStyle={{ padding: 6 }}>
              <div className="custom-image" style={{backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png)'}}></div>
              <div className="custom-card">
                <h3>图片标题，超出隐藏...</h3>
                <p><Tag>视频</Tag><Tag color="red">RM</Tag>
                  <ButtonGroup size="small" className="pull-right">
                  <Button type="ghost" icon="edit" onClick={this.goToEdit}/>
                  <Button type="ghost" icon="download"/>
                </ButtonGroup>
                </p>
              </div>
            </Card>
          </Col>
          <Col xs={{ span: 6}} lg={{ span: 4 }} className="thumb-list-item">
            <Card bodyStyle={{ padding: 6 }}>
              <div className="custom-image" style={{backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png)'}}></div>
              <div className="custom-card">
                <h3>图片标题，超出隐藏...</h3>
                <p><Tag>音频</Tag>
                  <ButtonGroup size="small" className="pull-right">
                  <Button type="ghost" icon="edit" onClick={this.goToEdit}/>
                  <Button type="ghost" icon="download"/>
                </ButtonGroup>
                </p>
              </div>
            </Card>
          </Col>
        </Row>
        <div className="pager pad-v text-right">
          <Pagination showQuickJumper defaultCurrent={2} total={500} />
        </div>
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
