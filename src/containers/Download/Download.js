import React, { Component } from 'react';

import { connect } from 'react-redux';
import './Download.scss';

class Download extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>资源下载</div>;
  }
}

Download.propTypes = {
};

function mapStateToProps() {
  return {
  };
}

export default connect(mapStateToProps)(Download);
