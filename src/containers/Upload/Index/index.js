import React, {Component, PropTypes} from 'react';
import {Radio, Form, Button} from 'antd';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import './style.scss';

import CategoryMenu from '../../../components/CategoryMenu';
import localStorage from '../../../utils/localStorage';
const CreateForm = Form.create;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;

class UploadIndex extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleSubmit(e) {
    e.preventDefault();
    let type = this.props.form.getFieldsValue().type;
    browserHistory.push(`/${type}/upload/`)
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const realms = localStorage.get('user').realms || [];

    const renderRadios = () => {
      let arr = [];
      realms.forEach((item) => {
        if (item.id === 28) {
          arr.push(<Radio value={'video'}>视频</Radio>)
        } else if (item.id === 27) {
          arr.push(<Radio value={'audio'}>音频</Radio>)
        } else if (item.id === 26) {
          arr.push(<Radio value={'image'}>图片</Radio>)
        } else if (item.id === 29) {
          arr.push(<Radio value={'imageGroup'}>组照</Radio>)
        }
      });
      return arr;
    };

    return (
      <div>
        <CategoryMenu />
        <div className="ant-layout-content">
          <div className="text-center">
            <Form inline onSubmit={this.handleSubmit}>
              <FormItem label="请先选择上传内容类型">
                {getFieldDecorator('type', {
                  initialValue: 'video'
                })(
                  <RadioGroup>
                    {renderRadios()}
                    <Radio value={'video'}>视频</Radio>
                    <Radio value={'audio'}>音频</Radio>
                    <Radio value={'image'}>图片</Radio>
                    <Radio value={'imageGroup'}>组照</Radio>
                  </RadioGroup>
                )}
              </FormItem>
              <Button type="primary" size="large" htmlType="submit">确定</Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

UploadIndex.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(CreateForm()(UploadIndex));
