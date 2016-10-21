import React, {Component, PropTypes} from 'react';
import {
  Form,
  Select,
  Input,
  DatePicker,
  Switch,
  Radio,
  Cascader,
  Button,
  Row,
  Col,
  Upload,
  Icon,
  Tag,
  Checkbox,
  Tabs
} from 'antd';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router';
import './style.scss';
import {getVideo} from '../../../actions/getVideo';
import {queryCategory} from '../../../actions/category';
import {TAG} from '../../../config/tags';
import Video from 'react-html5video';

const CreateForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const TabPane = Tabs.TabPane;

let categoryName = '';
const findCategory = (data, id) => {
  data.forEach((item) => {
    if (item.code == id) {
      categoryName = item.name
    } else if (item.childNode) {
      findCategory(item.childNode, id)
    }
  });

  return categoryName;
};

class VideoDetails extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {dispatch, routeParams} = this.props;
    dispatch(getVideo({
      id: routeParams.id
    }));
    dispatch(queryCategory())
  }

  render() {
    // const {getFieldDecorator} = this.props.form;
    const {video: {data}} = this.props;
    const categoryData = this.props.categorys.data || [];

    const renderOwnerType = (type) => {
      switch (type) {
        case 0:
          return '无';
        case 1:
          return '自有';
        case 2:
          return '第三方';
      }
    };

    const renderAuthType = (type) => {
      switch (type) {
        case 1:
          return 'RM';
        case 2:
          return 'RF';
        case 3:
          return 'RR';
      }
    };

    const renderAuthRights = (copyrightObj) => {
      let result = [];
      if (copyrightObj.objRights) {
        result.push('物权')
      }
      if (copyrightObj.portraitRights) {
        result.push('肖像权')
      }
      return result.length ? result.join(', ') : '无'
    };

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
                  <Video controls loop muted poster="../../../assets/images/music.png"
                         style={{width: '100%', height: '100%'}}>
                    <source src={data.ossidUrl ? data.ossidUrl : ''} type="video/mp4"/>
                  </Video>
                </div>
              </Col>
              <Col lg={{span: 8}}>
                <div className="ant-row ant-form-item ant-col-offset-6">
                  <Button htmlType="submit" size="large" type="primary"><Link
                    to={`/video/update/${this.props.routeParams.id}`}>编辑视频</Link></Button>
                  <Button size="large" className="gap-left"><a href={data.ossidUrl}>下载视频</a></Button>
                </div>
                <Tabs type="card" animated={false}>
                  <TabPane tab="基本信息" key="tab_1">
                    <FormItem {...formItemLayout} label="视频标题">
                      <p className="ant-form-text">{data.displayName}</p>
                    </FormItem>

                    <FormItem label="视频说明" {...formItemLayout}>
                      <p className="ant-form-text">{data.remark}</p>
                    </FormItem>

                    <FormItem {...formItemLayout} label="资源分类">
                      {findCategory(categoryData, data.category)}
                    </FormItem>

                    <FormItem {...formItemLayout} label="VCG分类">
                      {data.vcgCategory && TAG.audio.audio_type.find(item =>
                        item.key = data.vcgCategory
                      ).name}
                    </FormItem>

                    <FormItem {...formItemLayout} label="标签">
                      {data.tags && (()=> {
                        const TagsData = data.tags.split(',') || [];
                        return TAG.tags.filter(tag => (TagsData.indexOf(tag.key) !== -1)).map(item => <Tag>{item.name}</Tag>)
                      })()
                      }
                    </FormItem>

                    <FormItem {...formItemLayout} label="关健字">
                      <p className="ant-form-text">{data.keywords}</p>
                    </FormItem>

                    <FormItem {...formItemLayout} label="作者">
                      <p className="ant-form-text">{data.author}</p>
                    </FormItem>

                    <FormItem {...formItemLayout} label="内容类别">
                      <p className="ant-form-text">
                        {data.conType && TAG.audio.con_type.find(item =>
                          item.key == data.conType
                        ).name}
                      </p>
                    </FormItem>

                    <FormItem {...formItemLayout} label="上传时间">
                      <p className="ant-form-text">{data.uploadTime}</p>
                    </FormItem>

                  </TabPane>
                  <TabPane tab="版权信息" key="2">
                    <FormItem label="版权所属" {...formItemLayout} >
                      {data.copyrightObj && renderOwnerType(data.copyrightObj.ownerType)}
                    </FormItem>

                    <FormItem label="版权授权" {...formItemLayout} >
                      {data.copyrightObj && renderAuthType(data.copyrightObj.authType)}
                    </FormItem>

                    <FormItem label="授权类型" {...formItemLayout}>
                      {data.copyrightObj && renderAuthRights(data.copyrightObj)}
                    </FormItem>

                    <FormItem {...formItemLayout} label="授权文件">
                      <p className="ant-form-text"><a
                        href={data.copyrightObj ? data.copyrightObj.attachUrl : ''}>{data.copyrightObj && data.copyrightObj.attachFile || '无'}</a>
                      </p>
                    </FormItem>

                    <FormItem {...formItemLayout} label="版权时效">
                      <p className="ant-form-text">{data.copyrightObj && data.copyrightObj.expireDate}</p>
                    </FormItem>

                  </TabPane>
                </Tabs>
              </Col>
            </Row>
            <div className="edit-view-exif">
              <h4>视频信息</h4>
              <Row gutter={24}>
                <Col xs={{span: 6}}>
                  <ul className="list-v">
                    <li>时长: {data.length}</li>
                    <li>大小: {data.size}</li>
                  </ul>
                </Col>
                <Col xs={{span: 6}}>
                  <ul className="list-v">
                    <li>比特率: {data.bps}</li>
                  </ul>
                </Col>
                <Col xs={{span: 6}}>
                  <ul className="list-v">
                    <li>每秒帧数: {data.fps}</li>
                  </ul>
                </Col>
                <Col xs={{span: 6}}>
                  <ul className="list-v">
                    <li>像素比例: {data.pixPropotion}</li>
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

VideoDetails.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {video, categorys} = state;
  return {
    video,
    categorys
  };
}

export default connect(mapStateToProps)(CreateForm()(VideoDetails));
