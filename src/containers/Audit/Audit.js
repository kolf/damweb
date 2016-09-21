import React, { Component } from 'react';

import { connect } from 'react-redux';
import './Audit.scss';

class Audit extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>审核页面</div>;
  }
}

Audit.propTypes = {
};

function mapStateToProps() {
  return {
  };
}

export default connect(mapStateToProps)(Audit);
