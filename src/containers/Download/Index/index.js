import React, { Component } from 'react';

import { connect } from 'react-redux';
import './style.scss';

class DownloadIndex extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>资源下载</div>;
  }
}

DownloadIndex.propTypes = {
};

function mapStateToProps() {
  return {
  };
}

export default connect(mapStateToProps)(DownloadIndex);
