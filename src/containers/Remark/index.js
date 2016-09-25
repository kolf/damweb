import React, { Component } from 'react';
import { API_CONFIG } from './../../config/api';
import { connect } from 'react-redux';
<<<<<<< HEAD:src/containers/Remark/index.js
import './style.scss';
=======
import cs from 'classnames';
import { Form,Button, Row, Col, Upload, Icon, Tag,message} from 'antd';
import './Watermark.scss';
>>>>>>> 3b4ee9eb7231cd6f0669c354fe7bcb0383c6525a:src/containers/Watermark/Watermark.js

class Watermark extends Component {
  constructor(props) {
    super(props);
    this.state= {
      poinsClass: 'markPosition rb'
    }
  }

  handleClick(args,poins,e){
    e.preventDefault();
    this.setState({
      'poinsClass': poins + ' markPosition'
    });

    //console.log(this.state);
    var url=API_CONFIG.baseUri+API_CONFIG.updateWaterPosition+"?org_id=14&position="+args;
    var fetchOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }

    };

    fetch(url, fetchOptions)
  }

  render() {
<<<<<<< HEAD:src/containers/Remark/index.js
    return <div><div className="ant-layout-content">水印管理</div></div>;
=======
    const uploadWarterMarkImg = {
      name: 'file',
      action: API_CONFIG.baseUri+API_CONFIG.uploadWaterprint,
      //listType: 'picture',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} 上传成功。`);
          document.getElementById("logimg").src="https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png";
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 上传失败。`);
        }
      },
    };
    return <div className="client-info-container">水印管理<br/>
      <table className="tablealign" cellPadding={1} cellSpacing={2} border="1">
        <tr><td>
          <Form onSubmit={this.handleSubmit}>
            <table>
              <tr>
                <td>
                  <Upload {...uploadWarterMarkImg}>
                    <Button type="primary" size="large">上传水印模板</Button>
                  </Upload></td>
                <td>
                  &nbsp;
                </td>
                <td><Button type="dashed" size="large" className="btnMargin">删除水印模板</Button></td>
              </tr>
            </table>
          </Form>
        </td></tr>
        <tr>
          <td>
            <div className="pic-box">
              <img src="./../assets/images/sence.jpg" width={600} height={600}/>
              <div className={this.state.poinsClass}>
                <img id="logimg" src="./../assets/images/sence.jpg"/>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <table cellPadding={6} cellSpacing={6} className="tablealign">
              <tr>
                <td><Button  size="large" onClick={this.handleClick.bind(this, "1", 'lt')}>左上</Button></td>
                <td><Button  size="large" onClick={this.handleClick.bind(this, "2", 'ct')}>中上</Button></td>
                <td><Button  size="large" onClick={this.handleClick.bind(this, "3", 'rt')}>右上</Button></td>
              </tr>
              <tr>
                <td><Button  size="large" onClick={this.handleClick.bind(this,"4",'lc')}>左中</Button></td>
                <td><Button  size="large" onClick={this.handleClick.bind(this,"5",'cc')}>中间</Button></td>
                <td><Button  size="large" onClick={this.handleClick.bind(this,"6",'rc')}>右中</Button></td>
              </tr>
              <tr>
                <td><Button  size="large" onClick={this.handleClick.bind(this,"7",'lb')}>左下</Button></td>
                <td><Button  size="large" onClick={this.handleClick.bind(this,"8",'cb')}>中下</Button></td>
                <td><Button  size="large" onClick={this.handleClick.bind(this,"9",'rb')}>右下</Button></td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>;
>>>>>>> 3b4ee9eb7231cd6f0669c354fe7bcb0383c6525a:src/containers/Watermark/Watermark.js
  }
}

Watermark.propTypes = {
};

function mapStateToProps() {
  return {
  };
}

export default connect(mapStateToProps)(Watermark);
