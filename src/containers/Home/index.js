import React, { Component } from 'react';

import { connect } from 'react-redux';
import './style.scss';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div><div className="ant-layout-content">首页</div></div>;
  }
}

Home.propTypes = {
};

function mapStateToProps() {
  return {
  };
}

export default connect(mapStateToProps)(Home);
