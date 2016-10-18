import React, {Component, PropTypes} from 'react';
import {
  Form,
  Select,
  Input,
  Radio,
  Button,
  Row,
  Col,
  message,
  Checkbox,
  Tabs
} from 'antd';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router';
import './style.scss';
import {updateImage} from '../../../actions/updateImage';
import {getImage} from '../../../actions/getImage';
import {TAG} from '../../../config/tags';


const CreateForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const TabPane = Tabs.TabPane;

class ImageUpdate extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const {dispatch, routeParams} = this.props;
    dispatch(getImage({
      id: routeParams.id
    }))
  }

  handleSubmit(e) {
    e.preventDefault();
    const {dispatch, routeParams} = this.props;
    this.props.form.validateFields((errors) => {
      if (errors) {
        return false;
      }
      const creds = (this.props.form.getFieldsValue());
      Object.assign(creds, {
        id: routeParams.id,
        // tags: creds.tags.join(',')
      });
      dispatch(updateImage(creds, (msg) => {
        browserHistory.push(`/image/details/${routeParams.id}`);
      }));
    });
  }

  render() {
    const {getFieldProps} = this.props.form;
    const {image: {data}} = this.props;

    const displayNameProps = getFieldProps('title', {
      rules: [
        {required: true, message: '请填写标题'}
      ],
      initialValue: data.title
    });

    const remarkProps = getFieldProps('caption', {
      rules: [
        {required: true, message: '请填写说明'}
      ],
      initialValue: data.caption
    });

    const audioTypeProps = getFieldProps('assetFamily', {
      rules: [
        {required: true, message: '请选择分类'}
      ],
      initialValue: data.assetFamily
    });

    const tagsProps = getFieldProps('tags', {
      rules: [
        {required: true, message: '请选择标签', type: 'array'}
      ],
      initialValue: data.tags && data.tags.split(',')
    });

    const authorProps = getFieldProps('author', {
      rules: [
        {required: true, message: '请填写作者'}
      ],
      initialValue: data.author
    });

    const setDisplayProps = getFieldProps('resStatus', {});
    const conTypeProps = getFieldProps('conType', {
      initialValue: data.conType
    });
    const descripProps = getFieldProps('descrip', {
      initialValue: data.descrip
    });
    const vocalProps = getFieldProps('vocal', {
      initialValue: data.vocal
    });

    const licenseTypeProps = getFieldProps('licenseType', {
      initialValue: data.licenseType
    });

    const copyrightProps = getFieldProps('copyright', {
      initialValue: data.copyright
    });

    const rightsTypeProps = getFieldProps('rightsType', {
      initialValue: data.rightsType
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
                  <div className="edit-view-img" style={{backgroundImage: `url(${data.ossId2})`}}></div>
                </div>
              </Col>
              <Col lg={{span: 8}}>
                <Form horizontal onSubmit={this.handleSubmit}>
                  <div className="ant-row ant-col-offset-6 pad-bottom">
                    <Button htmlType="submit" size="large" type="primary">保存编辑</Button>
                    <Button size="large" className="gap-left">下载图片</Button>
                  </div>
                  <Tabs type="card">
                    <TabPane tab="基本信息" key="Tab_1">
                      <FormItem {...formItemLayout} label="图片标题">
                        <Input placeholder="请输入标题" type="textarea" {...displayNameProps}/>
                      </FormItem>

                      <FormItem {...formItemLayout} label="图片说明">
                        <Input type="textarea" {...remarkProps}/>
                      </FormItem>

                      <FormItem {...formItemLayout} label="图片分类">
                        <Select placeholder="请选择" style={{width: '100%'}} {...audioTypeProps}>
                          {TAG.audio.audio_type.map(item =>
                            <Option key={item.key}>{item.name}</Option>
                          )}
                        </Select>
                      </FormItem>

                      <FormItem {...formItemLayout} label="标签">
                        <Select tags placeholder="请添加标签" style={{width: '100%'}} {...tagsProps} >
                          {TAG.tags.map(item =>
                            <Option key={item.key}>{item.name}</Option>
                          )}
                        </Select>
                      </FormItem>

                      <FormItem {...formItemLayout} label="上传时间">
                        <p className="ant-form-text">2016-02-26 14:56:51</p>
                      </FormItem>

                      <FormItem {...formItemLayout} label="作者">
                        <Input {...authorProps}/>
                      </FormItem>
                      <FormItem {...formItemLayout} label="拍摄城市">
                        <p>dd</p>
                      </FormItem>
                      <FormItem {...formItemLayout} label="内容类别">
                        <p className="ant-form-text">
                          {data.conType && TAG.audio.con_type.find(item =>
                            item.key = data.conType
                          ).name}
                        </p>
                      </FormItem>
                      <FormItem {...formItemLayout} label="拍摄地">
                        <Input/>
                      </FormItem>
                      <FormItem {...formItemLayout} label="色彩">
                        <RadioGroup>
                          <Radio value={'colors'}>彩色</Radio>
                          <Radio value={'gray'}>黑白</Radio>
                        </RadioGroup>
                      </FormItem>
                    </TabPane>
                    <TabPane tab="版权信息" key="Tab_2">
                      <FormItem label="版权所属" {...formItemLayout}>
                        <RadioGroup size="default" {...copyrightProps}>
                          <RadioButton value="a">无</RadioButton>
                          <RadioButton value="b">自有</RadioButton>
                          <RadioButton value="c">第三方</RadioButton>
                        </RadioGroup>
                      </FormItem>

                      <FormItem label="版权授权" {...formItemLayout}>
                        <RadioGroup size="default" {...licenseTypeProps}>
                          <RadioButton value="rm">RM</RadioButton>
                          <RadioButton value="rf">RF</RadioButton>
                          <RadioButton value="rr">RR</RadioButton>
                        </RadioGroup>
                      </FormItem>

                      <FormItem label="授权类型" {...formItemLayout}>
                        <CheckboxGroup {...rightsTypeProps} options={TAG.rightsType} size="default"/>
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
                </Form>
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

ImageUpdate.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {image} = state;
  return {
    image
  };
}

export default connect(mapStateToProps)(CreateForm()(ImageUpdate));
