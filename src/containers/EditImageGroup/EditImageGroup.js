import React, { Component, PropTypes } from 'react';
import { Form, Select, Input, DatePicker, Switch, Radio, Cascader, Button, Row, Col, Upload, Icon, Tag, Checkbox} from 'antd';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import './EditImageGroup.scss';

const CreateForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

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

class EditImageGroup extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      color: 'colors'
    }

    console.log(this.state)
  }

  handleSubmit(e){
    e.preventDefault();
  }

  onChange(e){
    this.setState({
      color: e.target.value,
    });
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

    return (
      <div>
        <Col xs={{offset: 0, span:24}} lg={{offset:3, span:18}}>
          <Row gutter={24}>
            <Col lg={{span: 16}}>
              <div className="edit-view">
                <div className="edit-view-img" style={{backgroundImage:'url(https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png)'}}>
                </div>
              </div>
            </Col>
            <Col lg={{span: 8}}>
              <div className="ant-row ant-form-item ant-col-offset-6">
                <Button size="large" type="primary">保存编辑</Button>
                <Button size="large" className="gap-left">下载图片</Button>
              </div>
              <FormItem
                {...formItemLayout}
                label="图片标题"
                required
                hasFeedback
              >
                <Input {...avatarProps}/>
              </FormItem>

              <FormItem
                label="说明"
                {...formItemLayout}
              >
                <Input type="textarea" {...addressProps}/>
              </FormItem>

              <FormItem
                {...formItemLayout}
                label="图片分类"
                required
              >
                <Select style={{ width: '100%' }} {...getFieldProps('select')}
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
                {tags.map(tag =>
                  <Tag key={tag.key} closable={tag.key !== 1} afterClose={() => this.handleClose(tag.key)}>
                    {tag.name}
                  </Tag>
                )}
              </FormItem>

              <FormItem
                {...formItemLayout}
                label="上传时间"
              >
                <p className="ant-form-text">2016-02-26 14:56:51</p>
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
                label="色彩"
                required
                hasFeedback
              >
                <RadioGroup disabled onChange={this.onChange} value={this.state.color}>
                  <Radio value={'colors'}>彩色</Radio>
                  <Radio value={'gray'}>黑白</Radio>
                </RadioGroup>
              </FormItem>
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
              <Col xs={{span: 6}}><ul className="list-v">
                <li>原始宽度: 索尼</li>
                <li>相机型号: 索尼</li>
                <li>闪光灯: 索尼</li>
                <li>曝光补偿: 索尼</li>
              </ul></Col>
              <Col xs={{span: 6}}><ul className="list-v">
                <li>ISO: 索尼</li>
                <li>原始高度: 索尼</li>
                <li>光圈: 索尼</li>
                <li>曝光模式: 索尼</li>
              </ul></Col>
            </Row>
          </div>
        </Col>
      </div>
    );
  }
}

EditImageGroup.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps() {
  return {
  };
}

export default connect(mapStateToProps)(CreateForm()(EditImageGroup));
