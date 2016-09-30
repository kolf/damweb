import React, {Component, PropTypes} from 'react';
import {
  Form,
  Select,
  Radio,
  Button,
  Row,
  Col,
  Checkbox,
  Tabs
} from 'antd';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router';
import './style.scss';

import {getImage} from '../../../actions/getImage';
import {TAG} from '../../../config/tags';

const CreateForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const TabPane = Tabs.TabPane;
class ImageDetails extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {dispatch, routeParams} = this.props;
    dispatch(getImage({
      id: routeParams.id
    }))
  }

  render() {
    const {getFieldProps} = this.props.form;
    const {image: {data}} = this.props;

    if (data.tags) {

    }

    const tagsProps = getFieldProps('tags', {
      initialValue: data.tags.split(',')
    });

    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 18}
    };

    return (
      <div>
        <div className="ant-layout-content">
          <Col xs={{offset: 0, span: 24}} lg={{offset: 3, span: 18}}>
            <Row gutter={24}>
              <Col lg={{span: 16}}>
                <div className="edit-view">
                  <div className="edit-view-img" style={{backgroundImage: `url(${data.ossId2})`}}>
                  </div>
                </div>
              </Col>
              <Col lg={{span: 8}}>
                <div className="ant-row ant-form-item ant-col-offset-6">
                  <Button htmlType="submit" size="large" type="primary"><Link
                    to={`/image/update/${this.props.routeParams.id}`}>编辑图片</Link></Button>
                  <Button size="large" className="gap-left">下载图片</Button>
                </div>
                <Tabs type="card">
                  <TabPane tab="基本信息" key="tab_1">
                    <FormItem {...formItemLayout} label="图片标题">
                      <p className="ant-form-text">{data.title}</p>
                    </FormItem>

                    <FormItem label="说明" {...formItemLayout}>
                      <p className="ant-form-text">{data.caption}</p>
                    </FormItem>

                    <FormItem {...formItemLayout} label="图片分类">
                      <p className="ant-form-text">
                        {data.assetFamily && TAG.audio.audio_type.find(item =>
                          item.key = data.assetFamily
                        ).name}
                      </p>
                    </FormItem>

                    <FormItem {...formItemLayout} label="标签">
                      <Select disabled tags placeholder="请添加标签" style={{width: '100%'}} {...tagsProps} >
                        {TAG.tags.map(item =>
                          <Option key={item.key}>{item.name}</Option>
                        )}
                      </Select>
                    </FormItem>

                    <FormItem {...formItemLayout} label="上传时间">
                      <p className="ant-form-text">{data.createTime}</p>
                    </FormItem>

                    <FormItem {...formItemLayout} label="作者">
                      <p className="ant-form-text">{data.author}</p>
                    </FormItem>

                    <FormItem {...formItemLayout} label="内容类别">
                      <p className="ant-form-text">
                        {data.conType && TAG.audio.con_type.find(item =>
                          item.key = data.conType
                        ).name}
                      </p>
                    </FormItem>

                    <FormItem {...formItemLayout} label="拍摄地">
                      <p className="ant-form-text">天安门广场</p>
                    </FormItem>

                    <FormItem {...formItemLayout} label="色彩">
                      <RadioGroup disabled>
                        <Radio value={'colors'}>彩色</Radio>
                        <Radio value={'gray'}>黑白</Radio>
                      </RadioGroup>
                    </FormItem>
                  </TabPane>
                  <TabPane tab="版权信息" key="Tab_2">
                    <FormItem label="版权所属" {...formItemLayout} >
                      <RadioGroup defaultValue="a" disabled size="default">
                        <RadioButton value="a">无</RadioButton>
                        <RadioButton value="b">自有</RadioButton>
                        <RadioButton value="c">第三方</RadioButton>
                      </RadioGroup>
                    </FormItem>

                    <FormItem label="版权授权" {...formItemLayout}>
                      <RadioGroup size="default">
                        <RadioButton value="rm">RM</RadioButton>
                        <RadioButton value="rf">RF</RadioButton>
                        <RadioButton value="rr">RR</RadioButton>
                      </RadioGroup>
                    </FormItem>

                    <FormItem label="授权类型" {...formItemLayout}>
                      <CheckboxGroup options={TAG.rightsType} size="default"/>
                    </FormItem>

                    <FormItem {...formItemLayout} label="上传时间">
                      <p className="ant-form-text"><a href="">肖像权授权文件.pdf</a></p>
                    </FormItem>

                    <FormItem {...formItemLayout} label="版权时效">
                      <p className="ant-form-text">2016-02-26 14:56:51</p>
                    </FormItem>
                    <FormItem {...formItemLayout} label="授权文件">
                      <p className="ant-form-text"><a href="">肖像权授权文件.pdf</a></p>
                    </FormItem>
                    <FormItem {...formItemLayout} label="水印位置">
                      <div className="btn-abs" style={{marginTop: 3}}>
                        <Button className="lt">左上</Button>
                        <Button className="tr">右上</Button>
                        <Button className="c">中间</Button>
                        <Button className="lb">左下</Button>
                        <Button className="rb">右下</Button>
                      </div>
                    </FormItem>
                  </TabPane>
                </Tabs>
                <Col xs={{offset: 6}}>
                  <Checkbox>是否在展示平台显示资源</Checkbox>
                </Col>
              </Col>
            </Row>
            <div className="edit-view-exif">
              <h4>EXIF信息</h4>
              <Row gutter={24}>
                <Col xs={{span: 6}}>
                  <ul className="list-v">
                    <li>拍摄时间: 索尼</li>
                    <li>制造商: 索尼</li>
                    <li>测光模式: 索尼</li>
                    <li>白平衡: 索尼</li>
                  </ul>
                </Col>
                <Col xs={{span: 6}}>
                  <ul className="list-v">
                    <li>图片格式: 索尼</li>
                    <li>曝光时间: 索尼</li>
                    <li>焦距: 索尼</li>
                    <li>曝光程序: 索尼</li>
                  </ul>
                </Col>
                <Col xs={{span: 6}}>
                  <ul className="list-v">
                    <li>原始宽度: 索尼</li>
                    <li>相机型号: 索尼</li>
                    <li>闪光灯: 索尼</li>
                    <li>曝光补偿: 索尼</li>
                  </ul>
                </Col>
                <Col xs={{span: 6}}>
                  <ul className="list-v">
                    <li>ISO: 索尼</li>
                    <li>原始高度: 索尼</li>
                    <li>光圈: 索尼</li>
                    <li>曝光模式: 索尼</li>
                  </ul>
                </Col>
              </Row>
            </div>
          </Col>
        </div>
      </div>
    );
  }
}

ImageDetails.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {image} = state;
  return {
    image
  };
}

export default connect(mapStateToProps)(CreateForm()(ImageDetails));
