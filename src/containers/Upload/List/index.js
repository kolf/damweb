import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Row, Col, Menu, Dropdown, Button, Icon, Select, Card, Tag, Pagination } from 'antd';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

import ClassifyMenu from '../../../components/ClassifyMenu';

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
  }

  goToDetails(e) {
    browserHistory.push('/imageGroup/details')
  }

  goToAudioDetails(e) {
    browserHistory.push('/audio/details')
  }
  goToVideoDetails(e) {
    browserHistory.push('/video/details')
  }

  render() {
    const { getFieldProps } = this.props.form;

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
            <Col xs={{ span: 6}} lg={{ span: 4 }} className="thumb-list-item">
              <Card bodyStyle={{ padding: 6 }}>
                <div className="custom-image" style={{backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png)'}}></div>
                <div className="custom-card">
                  <h3>图片标题，超出隐藏...</h3>
                  <p><Tag>图片</Tag><Tag color="red">RM</Tag>
                    <ButtonGroup size="small" className="pull-right">
                    <Button type="ghost" icon="eye-o" onClick={this.goToDetails}/>
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
                    <Button type="ghost" icon="eye-o" onClick={this.goToDetails}/>
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
                    <Button type="ghost" icon="eye-o" onClick={this.goToDetails}/>
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
                    <Button type="ghost" icon="eye-o" onClick={this.goToDetails}/>
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
                    <Button type="ghost" icon="eye-o" onClick={this.goToDetails}/>
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
                    <Button type="ghost" icon="eye-o" onClick={this.goToDetails}/>
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
                    <Button type="ghost" icon="eye-o" onClick={this.goToVideoDetails}/>
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
                    <Button type="ghost" icon="eye-o" onClick={this.goToAudioDetails}/>
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
                    <Button type="ghost" icon="eye-o" onClick={this.goToDetails}/>
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
                    <Button type="ghost" icon="eye-o" onClick={this.goToDetails}/>
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
                    <Button type="ghost" icon="eye-o" onClick={this.goToDetails}/>
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
                    <Button type="ghost" icon="eye-o" onClick={this.goToDetails}/>
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
                    <Button type="ghost" icon="eye-o" onClick={this.goToDetails}/>
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
                    <Button type="ghost" icon="eye-o" onClick={this.goToDetails}/>
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
                    <Button type="ghost" icon="eye-o" onClick={this.goToVideoDetails}/>
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
                    <Button type="ghost" icon="eye-o" onClick={this.goToAudioDetails}/>
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
