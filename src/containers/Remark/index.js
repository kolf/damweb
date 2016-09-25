import React, { Component } from 'react';

import { connect } from 'react-redux';
import './style.scss';

class Watermark extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div><div className="ant-layout-content">水印管理</div></div>;
  }
}

Watermark.propTypes = {
};

function mapStateToProps() {
  return {
  };
}

export default connect(mapStateToProps)(Watermark);
