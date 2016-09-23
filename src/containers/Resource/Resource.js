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
    const { getFieldProps } = this.props.form;

    const selectBefore = (
      <Select defaultValue="全部" className="search-box">
        <Option value="图片">图片</Option>
        <Option value="组图">组图</Option>
        <Option value="视频">视频</Option>
        <Option value="音频">音频</Option>
      </Select>
    );

    return (
      <div>
        <div className="text-center">
          <Form inline className="pad-bottom" onSubmit={this.handleSubmit}>
            <FormItem>
              <Input size="large" {...getFieldProps('keyWords')} placeholder="输入您要找的关键词" style={{width: 400}}/>
            </FormItem>
            <FormItem>
              <Select style={{width:60}} size="large" defaultValue="all">
                <Option value="all">全部</Option>
                <Option value="video">视频</Option>
                <Option value="audio">音频</Option>
              </Select>
            </FormItem>
            <Button type="primary" htmlType="submit" size="large">搜索</Button><Button className="gap-left" size="large">清空</Button>
          </Form>
        </div>
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
