import React, { Component } from 'react';

import { connect } from 'react-redux';
import './Watermark.scss';

class Watermark extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>水印管理</div>;
  }
}

Watermark.propTypes = {
};

function mapStateToProps() {
  return {
  };
}

export default connect(mapStateToProps)(Watermark);
