import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form, Select, Input, DatePicker, Switch, Radio, Cascader, Button, Row, Col, Upload, Icon, Tag} from 'antd';

const CreateForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

import './style.scss';

const areaData = [{
  value: 'shanghai',
  label: '中国',
  children: [{
    value: 'shanghaishi',
    label: '上海市',
    children: [{
      value: 'pudongxinqu',
      label: '浦东新区',
    }]
  }],
}];

const tags =[
  { key: 1, name: '娱乐' },
  { key: 2, name: '明星动态' },
  { key: 3, name: '春夏' }
];

class UploadImage extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  normFile(e) {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  onSelect(e){
    console.log(this)
  }

  render() {
    const { getFieldProps } = this.props.form;

    const addressProps = getFieldProps('address', {
      rules: [
        { required: true, min: 2, message: '拍摄地至少为 2 个字符' },
        { validator: this.userExists },
      ]
    });

    const avatarProps = getFieldProps('avatar', {
      rules: [
        { required: true, min: 2, message: '拍摄地至少为 2 个字符' },
        { validator: this.userExists },
      ]
    });

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    };

    const uploadListProps = {
      action: '/upload.do',
      listType: 'picture-card',
      multiple: true,
      defaultFileList: [{
        uid: -1,
        name: '图片名字一',
        status: 'done',
        url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        thumbUrl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      }, {
        uid: -2,
        name: '图片名字二',
        status: 'done',
        url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        thumbUrl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      }],
      onPreview: (file) => {
        this.setState({
          priviewImage: file.url,
          priviewVisible: true,
        });
      }
    };

    return (
      <div className="ant-layout-content">
      <div className="upload-container">
        <div className="upload-main">
          <div className="upload-thumbs" onClick={this.onSelect.bind(this)}>
            <Upload className="upload-list-btn" {...uploadListProps}>
              <Icon type="plus" />
              <div className="ant-upload-text">点击上传</div>
            </Upload>
          </div>
        </div>
        <div className="upload-sidebar">
          <Form horizontal onSubmit={this.handleSubmit} >
            <Row>
              <Col className="gutter-row upload-thumb" span={6}>
                <span></span>
              </Col>
              <Col className="gutter-row" span={18}>
                <div className="gutter-box"><Input placeholder="请输入标题" type="textarea" {...addressProps}/></div>
              </Col>
            </Row>

            <FormItem
              label="说明"
              {...formItemLayout}
            >
              <Input type="textarea" {...addressProps}/>
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="分类"
              required
            >
              <Select {...getFieldProps('select', {initialValue: 'jack'})}
              >
                <Option value="jack">jack</Option>
                <Option value="lucy">lucy</Option>
                <Option value="disabled" disabled>disabled</Option>
                <Option value="yiminghe">yiminghe</Option>
              </Select>
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="标签"
              required
              hasFeedback
            >
              <Select tags placeholder="请添加标签">
                <Option key="P1">风景</Option>
              </Select>
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="作者"
              required
              hasFeedback
            >
              <Input {...avatarProps}/>
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="拍摄城市"
              required
              hasFeedback
            >
              <Cascader options={areaData} {...getFieldProps('area')} />
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="拍摄地"
              required
              hasFeedback
            >
              <Input {...addressProps}/>
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="版权所属"
            >
              <RadioGroup size="default" {...getFieldProps('rg')}>
                <RadioButton value="a">无</RadioButton>
                <RadioButton value="b">自有</RadioButton>
                <RadioButton value="c">第三方</RadioButton>
              </RadioGroup>
            </FormItem>

            <FormItem
              label="版权类型"
              {...formItemLayout}
            >
              <RadioGroup size="default" {...getFieldProps('rg')}>
                <RadioButton value="d">RM</RadioButton>
                <RadioButton value="f">RF</RadioButton>
              </RadioGroup>
            </FormItem>

            <FormItem
              label="版权时效"
              {...formItemLayout}
            >
              <Col span="11">
                <FormItem>
                  <DatePicker placeholder="起始日期" {...getFieldProps('startDate')} />
                </FormItem>
              </Col>
              <Col span="2">
                <p className="ant-form-split">-</p>
              </Col>
              <Col span="11">
                <FormItem>
                  <DatePicker placeholder="结束日期" {...getFieldProps('endDate')} />
                </FormItem>
              </Col>
            </FormItem>

            <FormItem
              label="版权授权"
              {...formItemLayout}
            >
              <RadioGroup size="default" {...getFieldProps('rg')}>
                <RadioButton value="g">肖像权</RadioButton>
                <RadioButton value="h">物权</RadioButton>
              </RadioGroup>
            </FormItem>

            <FormItem
              label="授权文件"
              {...formItemLayout}
            >
              <Upload name="logo" action="/upload.do" listType="picture" onChange={this.handleUpload}
                      {...getFieldProps('upload', {
                        valuePropName: 'fileList',
                        normalize: this.normFile,
                      })}
              >
                <Button type="ghost" size="large">
                  <Icon type="upload" /> 点击上传
                </Button>
              </Upload>
            </FormItem>

            <FormItem>
              <Button className="btn-block" type="primary" htmlType="submit">资源入库</Button>
            </FormItem>
          </Form>
        </div>
      </div>
        </div>
    );
  }
}

UploadImage.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps() {
  return {
  };
}

export default connect(mapStateToProps)(CreateForm()(UploadImage));
