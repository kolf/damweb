import React, {Component, PropTypes} from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Tag,
  Tabs
} from "antd";
import {connect} from "react-redux";
import {Link} from "react-router";
import "./style.scss";
import {getImage} from "../../../actions/image";
import {queryCategory} from "../../../actions/category";
import {TAG} from "../../../config/tags";

const CreateForm = Form.create;
const FormItem = Form.Item;
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

class ImageDetails extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {dispatch, routeParams} = this.props;
    dispatch(getImage({
      id: routeParams.id
    }));
    dispatch(queryCategory())
  }

  render() {

    const {image: {data}} = this.props;
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
                  <div className="edit-view-img" style={{backgroundImage: `url(${data.ossid1Url})`}}>
                  </div>
                </div>
              </Col>
              <Col lg={{span: 8}}>
                <div className="ant-row ant-form-item ant-col-offset-6">
                  <Button htmlType="submit" size="large" type="primary"><Link
                    to={`/image/update/${this.props.routeParams.id}`}>编辑图片</Link></Button>
                  <Button size="large" className="gap-left"><a href={data.ossidUrl}>下载图片</a></Button>
                </div>
                <Tabs type="card" animated={false}>
                  <TabPane tab="基本信息" key="tab_1">
                    <FormItem {...formItemLayout} label="图片标题">
                      <p className="ant-form-text">{data.title}</p>
                    </FormItem>

                    <FormItem label="图片说明" {...formItemLayout}>
                      <p className="ant-form-text">{data.caption}</p>
                    </FormItem>

                    <FormItem {...formItemLayout} label="资源分类">
                      {findCategory(categoryData, data.category)}
                    </FormItem>

                    {data.vcgCategory && <FormItem {...formItemLayout} label="VCG分类">
                      {TAG.audio.audio_type.find(item =>
                        item.key == data.vcgCategory
                      ).name}
                    </FormItem>}

                    <FormItem {...formItemLayout} label="标签">
                      {data.tags && (()=> {
                        const TagsData = data.tags.split(',') || [];
                        return TAG.tags.filter(tag => (TagsData.indexOf(tag.key) !== -1)).map(item =>
                          <Tag>{item.name}</Tag>)
                      })()
                      }
                    </FormItem>

                    <FormItem {...formItemLayout} label="关健字">
                      <p className="ant-form-text">{data.keywords}</p>
                    </FormItem>

                    <FormItem {...formItemLayout} label="作者">
                      <p className="ant-form-text">{data.creditLine}</p>
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
              <h4>图片信息</h4>
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
  const {image, categorys} = state;
  return {
    image,
    categorys
  };
}

export default connect(mapStateToProps)(CreateForm()(ImageDetails));
