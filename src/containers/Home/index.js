import React, { Component } from 'react';

import { connect } from 'react-redux';
import './style.scss';

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div><div className="ant-layout-content">首页</div></div>;
  }
}

HomePage.propTypes = {
};

function mapStateToProps() {
  return {
  };
}

export default connect(mapStateToProps)(HomePage);
