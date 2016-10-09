import React, { Component, PropTypes } from 'react';
import { Radio, Form, Button } from 'antd';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import './style.scss';

import CategoryMenu from '../../../components/CategoryMenu';

const CreateForm = Form.create;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;

class UploadIndex extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleSubmit(e){
    e.preventDefault();
    let type = this.props.form.getFieldsValue().type;
    browserHistory.push(`/${type}/upload/`)
  };

  render() {
    const { getFieldProps } = this.props.form;

    console.log(this);
    
    return (
      <div>
        <CategoryMenu />
        <div className="ant-layout-content">
          <div className="text-center">
            <Form inline onSubmit={this.handleSubmit}>
              <FormItem label="请先选择上传内容类型">
                <RadioGroup {...getFieldProps('type', { initialValue: 'image' })}>
                  <Radio value={'image'}>图片</Radio>
                  {window.res == 29 && <Radio value={'imageGroup'}>组照</Radio>}
                  {window.res == 27 && <Radio value={'audio'}>音频</Radio>}
                  {window.res == 28 && <Radio value={'video'}>视频</Radio>}
                </RadioGroup>
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

function mapStateToProps(state) {
  const {user} = state;
  return {
    user
  };
}

export default connect(mapStateToProps)(CreateForm()(UploadIndex));
