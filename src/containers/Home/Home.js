import React, { Component } from 'react';

import { connect } from 'react-redux';
import './Home.scss';

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>首页</div>;
  }
}

HomePage.propTypes = {
};

function mapStateToProps() {
  return {
  };
}

export default connect(mapStateToProps)(HomePage);